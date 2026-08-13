import streamlit as st
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from groq import Groq
from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

INDEX_PATH = "data/faiss_index.bin"
CHUNKS_PATH = "data/chunks.pkl"

st.set_page_config(page_title="My Study Assistant", page_icon="📚", layout="wide")

# ---------- Load everything once ----------
@st.cache_resource
def load_resources():
    embed_model = SentenceTransformer('all-MiniLM-L6-v2')
    index = faiss.read_index(INDEX_PATH)
    with open(CHUNKS_PATH, "rb") as f:
        chunks = pickle.load(f)
    groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    return embed_model, index, chunks, groq_client, tavily_client

embed_model, index, chunks, groq_client, tavily_client = load_resources()

# ---------- Core helper functions ----------
def retrieve_chunks(query, top_k=4):
    query_embedding = embed_model.encode([query]).astype('float32')
    distances, indices = index.search(query_embedding, top_k)
    return [chunks[i] for i in indices[0]]

def get_all_sources():
    return sorted(set(c['source'] for c in chunks))

def get_chunks_by_source(source_name, max_chunks=6):
    return [c for c in chunks if c['source'] == source_name][:max_chunks]

def ask_llm(prompt, temperature=0.3):
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
    )
    return response.choices[0].message.content

def web_search(query, max_results=3):
    """Search the web using Tavily and return results."""
    try:
        response = tavily_client.search(query=query, max_results=max_results)
        return response.get("results", [])
    except Exception:
        return []

def generate_web_answer(query, search_results):
    """Ask the LLM to summarize web results into an answer."""
    if not search_results:
        return "Couldn't fetch web results right now."

    context = "\n\n".join([f"{r['title']}: {r['content']}" for r in search_results])
    prompt = f"""Based on these web search results, give a clear, concise answer to the question. Mention it's from general web sources, not the student's notes.

Search results:
{context}

Question: {query}

Answer:"""
    return ask_llm(prompt)

def generate_notes_answer(query, retrieved_chunks):
    context = "\n\n".join([f"[From {c['source']}]\n{c['text']}" for c in retrieved_chunks])
    prompt = f"""You are a helpful study assistant. Answer using ONLY the context below from the student's own notes. If it doesn't fully answer the question, say so honestly rather than making things up.

Context:
{context}

Question: {query}

Answer:"""
    return ask_llm(prompt)

# ---------- UI ----------
st.title("📚 My Study Assistant")
st.caption(f"Trained on {index.ntotal} chunks from your notes")

tab1, tab2, tab3, tab4 = st.tabs(["💬 Chat", "🎤 Viva Mode", "📝 Practice Questions", "🗂️ Flashcards"])

# ===== TAB 1: CHAT (Notes vs Web) =====
with tab1:
    if "messages" not in st.session_state:
        st.session_state.messages = []

    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    query = st.chat_input("Ask a question from your notes...")

    if query:
        st.session_state.messages.append({"role": "user", "content": query})
        with st.chat_message("user"):
            st.markdown(query)

        with st.chat_message("assistant"):
            with st.spinner("Searching your notes and the web..."):
                retrieved = retrieve_chunks(query)
                notes_answer = generate_notes_answer(query, retrieved)

                web_results = web_search(query)
                web_answer = generate_web_answer(query, web_results)

                col1, col2 = st.columns(2)
                with col1:
                    st.markdown("### 📘 From your notes")
                    st.markdown(notes_answer)
                    with st.expander("Sources"):
                        for c in retrieved:
                            st.write(f"- {c['source']}")
                with col2:
                    st.markdown("### 🌐 From the web")
                    st.markdown(web_answer)
                    with st.expander("Sources"):
                        for r in web_results:
                            st.write(f"- [{r.get('title', 'link')}]({r.get('url', '#')})")

                answer = f"**From notes:**\n{notes_answer}\n\n**From web:**\n{web_answer}"

        st.session_state.messages.append({"role": "assistant", "content": answer})

# ===== TAB 2: VIVA MODE =====
with tab2:
    st.subheader("Viva Mode — get quizzed and graded")
    source_choice = st.selectbox("Pick a unit/file to be quizzed on:", get_all_sources(), key="viva_source")

    if "viva_question" not in st.session_state:
        st.session_state.viva_question = None
        st.session_state.viva_context = None

    if st.button("Give me a question"):
        relevant_chunks = get_chunks_by_source(source_choice, max_chunks=5)
        context = "\n\n".join([c['text'] for c in relevant_chunks])
        prompt = f"""Based on the notes below, generate ONE clear viva-style question a professor might ask a student. Just the question, nothing else.

Notes:
{context}"""
        st.session_state.viva_question = ask_llm(prompt, temperature=0.7)
        st.session_state.viva_context = context

    if st.session_state.viva_question:
        st.info(f"**Question:** {st.session_state.viva_question}")
        student_answer = st.text_area("Your answer:", key="viva_answer")

        if st.button("Check my answer"):
            grade_prompt = f"""You are an examiner. Based on the notes below, evaluate the student's answer to the question. Give:
1. A short verdict (Correct / Partially Correct / Incorrect)
2. What was good
3. What's missing or wrong
Keep it short and constructive, like a professor giving quick feedback.

Notes:
{st.session_state.viva_context}

Question: {st.session_state.viva_question}
Student's answer: {student_answer}"""
            feedback = ask_llm(grade_prompt)
            st.markdown("### Feedback")
            st.markdown(feedback)

# ===== TAB 3: PRACTICE QUESTIONS =====
with tab3:
    st.subheader("Auto-generate practice questions")
    source_choice2 = st.selectbox("Pick a unit/file:", get_all_sources(), key="practice_source")
    num_questions = st.slider("How many questions?", 3, 10, 5)
    include_web = st.checkbox("Also fetch extra numerical/practice problems from the web", value=False)

    if st.button("Generate practice questions"):
        relevant_chunks = get_chunks_by_source(source_choice2, max_chunks=8)
        context = "\n\n".join([c['text'] for c in relevant_chunks])

        # Questions from notes
        prompt = f"""Based on the notes below, generate {num_questions} exam-style practice questions covering different topics from the material. Number them. Mix short-answer, conceptual, and numerical questions (with values/calculations) wherever the topic allows it, like what would appear in a real exam paper.

Notes:
{context}"""
        with st.spinner("Generating questions from your notes..."):
            questions = ask_llm(prompt, temperature=0.6)

        st.markdown("### 📘 From your notes")
        st.markdown(questions)

        # Extra numericals from the web
        if include_web:
            with st.spinner("Fetching extra numerical problems from the web..."):
                # Figure out the topic name from the source file for a better search query
                topic_prompt = f"In 3-6 words, what specific topic do these notes cover? Just the topic name, nothing else.\n\n{context[:800]}"
                topic = ask_llm(topic_prompt, temperature=0.3)

                web_results = web_search(f"{topic} numerical problems with solutions", max_results=5)

                if web_results:
                    web_context = "\n\n".join([f"{r['title']}: {r['content']}" for r in web_results])
                    web_prompt = f"""Based on these web search results about "{topic}", extract or create 3-5 numerical/practice problems (with actual values, not just definitions). Number them. If solutions/answers are available in the source, include them briefly at the end of each question in brackets.

Web content:
{web_context}"""
                    web_questions = ask_llm(web_prompt, temperature=0.5)

                    st.markdown("### 🌐 Extra numericals from the web")
                    st.markdown(web_questions)
                    with st.expander("Sources"):
                        for r in web_results:
                            st.write(f"- [{r.get('title', 'link')}]({r.get('url', '#')})")
                else:
                    st.warning("Couldn't fetch web results right now — showing notes-based questions only.")

# ===== TAB 4: FLASHCARDS =====
with tab4:
    st.subheader("Flashcards")
    source_choice3 = st.selectbox("Pick a unit/file:", get_all_sources(), key="flashcard_source")
    num_cards = st.slider("How many flashcards?", 5, 15, 8)

    if st.button("Generate flashcards"):
        relevant_chunks = get_chunks_by_source(source_choice3, max_chunks=8)
        context = "\n\n".join([c['text'] for c in relevant_chunks])
        prompt = f"""Based on the notes below, create {num_cards} flashcards. Format EXACTLY like this for each one, nothing else:

Q: [term or short question]
A: [concise definition or answer]

Notes:
{context}"""
        with st.spinner("Generating flashcards..."):
            flashcard_text = ask_llm(prompt, temperature=0.5)
        st.session_state.flashcards_raw = flashcard_text

    if "flashcards_raw" in st.session_state:
        cards = st.session_state.flashcards_raw.split("Q:")
        for card in cards[1:]:
            parts = card.split("A:")
            if len(parts) == 2:
                q, a = parts[0].strip(), parts[1].strip()
                with st.expander(f"❓ {q}"):
                    st.write(f"**Answer:** {a}")