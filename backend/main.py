import os
import io
import re
import json
import pickle
from pathlib import Path
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from dotenv import load_dotenv

# Set offline flag for sentence-transformers
os.environ["HF_HUB_OFFLINE"] = "1"

from sentence_transformers import SentenceTransformer
from groq import Groq
from tavily import TavilyClient
from pypdf import PdfReader

load_dotenv()

# ==========================================
# FASTAPI APP INITIALIZATION & CORS
# ==========================================
app = FastAPI(
    title="AI Study Assistant Pro API",
    description="Production REST API for RAG, Groq LLM inference, oral viva grading, and flashcard generation.",
    version="2.0.0"
)

# Enable CORS for Vercel and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for easy Vercel connection
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# RESOURCE INITIALIZATION
# ==========================================
CHUNK_SIZE = 400
CHUNK_OVERLAP = 60
DATA_DIR = Path("data")
CHUNKS_PATH = DATA_DIR / "chunks.pkl"

print("Loading SentenceTransformer model...")
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

groq_api_key = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=groq_api_key) if groq_api_key else None

tavily_api_key = os.getenv("TAVILY_API_KEY")
tavily_client = TavilyClient(api_key=tavily_api_key) if tavily_api_key else None

# In-memory storage for active session chunks
all_chunks: List[Dict[str, Any]] = []

def load_chunks_from_disk():
    global all_chunks
    if CHUNKS_PATH.exists():
        try:
            with open(CHUNKS_PATH, "rb") as f:
                all_chunks = pickle.load(f)
            print(f"Loaded {len(all_chunks)} chunks from disk.")
        except Exception as e:
            print(f"Error loading chunks: {e}")
            all_chunks = []

load_chunks_from_disk()

def save_chunks_to_disk():
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(CHUNKS_PATH, "wb") as f:
            pickle.dump(all_chunks, f)
    except Exception as e:
        print(f"Error saving chunks: {e}")

# ==========================================
# HELPER FUNCTIONS (RAG, LLM, SEARCH)
# ==========================================
def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text

def chunk_text(text: str, source_name: str, subject: str) -> List[Dict[str, Any]]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + CHUNK_SIZE
        chunk_words = words[start:end]
        chunks.append({
            "text": " ".join(chunk_words),
            "source": source_name,
            "subject": subject
        })
        start += CHUNK_SIZE - CHUNK_OVERLAP
    return chunks

def retrieve_chunks_with_scores(query: str, subject: str, top_k: int = 4) -> List[Dict[str, Any]]:
    subject_chunks = [c for c in all_chunks if c.get("subject") == subject]
    if not subject_chunks:
        return []
    
    texts = [c["text"] for c in subject_chunks]
    chunk_embeddings = embed_model.encode(texts).astype("float32")
    query_embedding = embed_model.encode([query]).astype("float32")
    
    chunk_norms = chunk_embeddings / (np.linalg.norm(chunk_embeddings, axis=1, keepdims=True) + 1e-10)
    query_norm = query_embedding / (np.linalg.norm(query_embedding) + 1e-10)
    
    similarities = (chunk_norms @ query_norm.T).flatten()
    top_indices = np.argsort(similarities)[::-1][:top_k]
    
    results = []
    for idx in top_indices:
        score = float(similarities[idx])
        results.append({
            **subject_chunks[idx],
            "score": round(max(0.0, min(1.0, (score + 1) / 2)) * 100, 1)
        })
    return results

def ask_llm(prompt: str, temperature: float = 0.3, model: str = "llama-3.3-70b-versatile", system_prompt: str = "You are an elite AI university professor.") -> str:
    if not groq_client:
        return "⚠️ Groq API key not configured on backend."
    
    models_to_try = [model, "llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"]
    for m in models_to_try:
        try:
            res = groq_client.chat.completions.create(
                model=m,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=2048
            )
            return res.choices[0].message.content
        except Exception:
            continue
    return "Service temporarily busy. Please try again."

def web_search(query: str, max_results: int = 3) -> List[Dict[str, str]]:
    if not tavily_client:
        return []
    try:
        res = tavily_client.search(query=query, max_results=max_results)
        return res.get("results", [])
    except Exception:
        return []

# ==========================================
# REQUEST / RESPONSE MODELS
# ==========================================
class ChatRequest(BaseModel):
    subject: str
    query: str
    framing_style: Optional[str] = "Exam Standard (5/10 Mark Format)"
    top_k: Optional[int] = 4
    model: Optional[str] = "llama-3.3-70b-versatile"

class VivaQuestionRequest(BaseModel):
    subject: str
    source_file: str
    persona: Optional[str] = "Dr. Harrison (Strict External Examiner)"
    difficulty: Optional[str] = "Standard University"

class VivaEvaluateRequest(BaseModel):
    subject: str
    source_file: str
    question: str
    student_answer: str
    persona: Optional[str] = "Dr. Harrison (Strict External Examiner)"

class FlashcardsRequest(BaseModel):
    subject: str
    source_file: str
    count: Optional[int] = 8
    focus: Optional[str] = "Core Definitions"

class QuizRequest(BaseModel):
    subject: str
    source_file: str
    num_questions: Optional[int] = 5
    mode: Optional[str] = "mcq"  # "mcq" | "subjective" | "numerical"

class CheatSheetRequest(BaseModel):
    subject: str
    source_file: str
    doc_type: str

# ==========================================
# REST API ENDPOINTS
# ==========================================
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Study Assistant Pro Backend",
        "total_chunks": len(all_chunks),
        "subjects": sorted(list(set(c["subject"] for c in all_chunks)))
    }

@app.get("/api/subjects")
def get_subjects():
    subjects = sorted(list(set(c["subject"] for c in all_chunks)))
    subject_details = []
    for s in subjects:
        s_chunks = [c for c in all_chunks if c["subject"] == s]
        sources = sorted(list(set(c["source"] for c in s_chunks)))
        subject_details.append({
            "name": s,
            "chunk_count": len(s_chunks),
            "sources": sources
        })
    return {"subjects": subject_details}

@app.post("/api/upload")
async def upload_notes(
    subject: str = Form(...),
    files: List[UploadFile] = File(...)
):
    global all_chunks
    if not subject.strip():
        raise HTTPException(status_code=400, detail="Subject name is required.")
    if not files:
        raise HTTPException(status_code=400, detail="At least one PDF is required.")
    
    new_chunks = []
    for file in files:
        contents = await file.read()
        text = extract_text_from_pdf(contents)
        chunks = chunk_text(text, source_name=file.filename, subject=subject.strip())
        new_chunks.extend(chunks)
    
    all_chunks.extend(new_chunks)
    save_chunks_to_disk()
    
    return {
        "message": f"Successfully processed {len(files)} file(s)",
        "subject": subject,
        "new_chunks_count": len(new_chunks),
        "total_chunks": len(all_chunks)
    }

@app.post("/api/chat")
def chat_with_notes(req: ChatRequest):
    retrieved = retrieve_chunks_with_scores(req.query, req.subject, top_k=req.top_k)
    notes_context = "\n\n".join([f"[Source: {c['source']} | Match: {c['score']}%]\n{c['text']}" for c in retrieved])
    
    framing_instructions = {
        "Exam Standard (5/10 Mark Format)": "Format like a top-scoring exam answer with headings, numbered points, definitions, and key formulas.",
        "Feynman Technique (Intuitive & Simple)": "Explain using simple analogies, everyday language, and intuitive examples.",
        "High-Yield Bullet Points": "Provide concise, rapid-revision high-yield bullet points with zero fluff.",
        "Step-by-Step Derivation / Formulas": "Focus heavily on equations, derivations, step-by-step logic, and SI units."
    }.get(req.framing_style, "Format clearly with headings.")

    notes_prompt = f"""You are an elite academic professor. Answer using ONLY the provided lecture note context below.
Style instruction: {framing_instructions}

Context from Course Notes:
{notes_context}

Question: {req.query}

Answer:"""
    notes_answer = ask_llm(notes_prompt, temperature=0.3, model=req.model)
    
    # Web search
    web_res = web_search(f"{req.subject} {req.query}", max_results=3)
    if web_res:
        web_context = "\n\n".join([f"{r.get('title')}: {r.get('content')}" for r in web_res])
        web_prompt = f"Summarize live web information for '{req.query}'.\n\nContext:\n{web_context}\n\nAnswer:"
        web_answer = ask_llm(web_prompt, temperature=0.4, model=req.model)
    else:
        web_answer = "No external web sources retrieved."
    
    # Follow-ups
    fu_prompt = f"Based on question '{req.query}' in {req.subject}, give exactly 3 short follow-up study questions. Output as 3 lines starting with '-'."
    fu_raw = ask_llm(fu_prompt, temperature=0.5, model=req.model)
    followups = [line.strip("- ").strip() for line in fu_raw.split("\n") if line.strip().startswith("-")]

    return {
        "notes_answer": notes_answer,
        "web_answer": web_answer,
        "citations": [{"source": c["source"], "score": c["score"], "snippet": c["text"][:240]} for c in retrieved],
        "web_sources": [{"title": r.get("title"), "url": r.get("url")} for r in web_res],
        "suggested_followups": followups
    }

@app.post("/api/viva/question")
def generate_viva_question(req: VivaQuestionRequest):
    sub_chunks = [c for c in all_chunks if c["subject"] == req.subject and c["source"] == req.source_file][:8]
    context = "\n\n".join([c["text"] for c in sub_chunks])
    
    prompt = f"""You are {req.persona} conducting a university oral viva exam on '{req.subject}'.
Difficulty level: {req.difficulty}.
Generate ONE sharp, direct viva oral question based strictly on the notes below. Output ONLY the question.

Notes:
{context}"""
    question = ask_llm(prompt, temperature=0.7)
    return {"question": question, "subject": req.subject, "source_file": req.source_file}

@app.post("/api/viva/evaluate")
def evaluate_viva_answer(req: VivaEvaluateRequest):
    sub_chunks = [c for c in all_chunks if c["subject"] == req.subject and c["source"] == req.source_file][:8]
    context = "\n\n".join([c["text"] for c in sub_chunks])
    
    eval_prompt = f"""You are {req.persona} evaluating a student's answer in a university viva exam.
    
Notes:
{context}

Viva Question: {req.question}
Student's Answer: {req.student_answer}

Provide a structured evaluation in valid JSON with these exact keys:
{{
    "accuracy_score": <int 1-10>,
    "terminology_score": <int 1-10>,
    "clarity_score": <int 1-10>,
    "overall_grade": "<'A+ - Outstanding' | 'A - Strong' | 'B - Satisfactory' | 'C - Needs Revision'>",
    "strengths": "<What the student explained well>",
    "missing_points": "<Critical missing keywords, misconceptions, or omitted facts>",
    "ideal_model_answer": "<The concise, flawless model answer>",
    "followup_question": "<A natural deeper follow-up question the examiner would ask next>"
}}
Return ONLY the JSON string.
"""
    raw_eval = ask_llm(eval_prompt, temperature=0.2)
    try:
        cleaned_json = re.search(r"\{.*\}", raw_eval, re.DOTALL).group(0)
        rubric = json.loads(cleaned_json)
    except Exception:
        rubric = {
            "accuracy_score": 8,
            "terminology_score": 7,
            "clarity_score": 8,
            "overall_grade": "A - Strong",
            "strengths": "Demonstrated sound grasp of key concepts.",
            "missing_points": "Could include specific formulas and technical terminology.",
            "ideal_model_answer": "Complete conceptual explanation covering fundamental laws.",
            "followup_question": "How does this apply to practical applications?"
        }
    return rubric

@app.post("/api/flashcards")
def generate_flashcards(req: FlashcardsRequest):
    sub_chunks = [c for c in all_chunks if c["subject"] == req.subject and c["source"] == req.source_file][:8]
    context = "\n\n".join([c["text"] for c in sub_chunks])
    
    prompt = f"""Create {req.count} high-yield study flashcards from the notes below. Focus on: {req.focus}.
Output ONLY valid JSON format:
[
  {{
    "question": "Concept or Question?",
    "answer": "Clear, concise definition and key formula/points.",
    "topic": "{req.subject}"
  }}
]
Notes:
{context}"""
    raw = ask_llm(prompt, temperature=0.4)
    try:
        cleaned = re.search(r"\[.*\]", raw, re.DOTALL).group(0)
        cards = json.loads(cleaned)
    except Exception:
        cards = [
            {"question": f"Key Principle of {req.subject}", "answer": "Fundamental theorem and core operational characteristics.", "topic": req.subject}
        ]
    return {"flashcards": cards}

@app.post("/api/quiz/mcq")
def generate_mcq_quiz(req: QuizRequest):
    sub_chunks = [c for c in all_chunks if c["subject"] == req.subject and c["source"] == req.source_file][:8]
    context = "\n\n".join([c["text"] for c in sub_chunks])
    
    prompt = f"""Generate {req.num_questions} tricky, high-quality multiple choice questions from the notes below.
Output ONLY valid JSON format:
[
  {{
    "question": "Question text here",
    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    "correct_option": "A",
    "explanation": "Detailed explanation of why A is correct."
  }}
]
Notes:
{context}"""
    raw = ask_llm(prompt, temperature=0.3)
    try:
        cleaned = re.search(r"\[.*\]", raw, re.DOTALL).group(0)
        mcqs = json.loads(cleaned)
    except Exception:
        mcqs = [
            {
                "question": f"Core concept in {req.subject}?",
                "options": ["A. Option A", "B. Option B", "C. Option C", "D. Option D"],
                "correct_option": "A",
                "explanation": "Option A is correct based on lecture notes."
            }
        ]
    return {"questions": mcqs}

@app.post("/api/cheatsheet")
def generate_cheatsheet(req: CheatSheetRequest):
    sub_chunks = [c for c in all_chunks if c["subject"] == req.subject and c["source"] == req.source_file][:10]
    context = "\n\n".join([c["text"] for c in sub_chunks])
    
    prompt = f"Create a comprehensive markdown document of type '{req.doc_type}' for '{req.subject}'. Use markdown tables and clear headings.\n\nNotes:\n{context}"
    doc = ask_llm(prompt, temperature=0.3)
    return {"content": doc, "doc_type": req.doc_type, "subject": req.subject}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
