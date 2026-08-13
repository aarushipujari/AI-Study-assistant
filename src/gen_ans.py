import os
from pathlib import Path
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from groq import Groq
from dotenv import load_dotenv

load_dotenv()  # reads your .env file

INDEX_PATH = "data/faiss_index.bin"
CHUNKS_PATH = "data/chunks.pkl"

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

def load_vector_store():
    index = faiss.read_index(INDEX_PATH)
    with open(CHUNKS_PATH, "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def retrieve_chunks(query, index, chunks, top_k=4):
    query_embedding = embed_model.encode([query]).astype('float32')
    distances, indices = index.search(query_embedding, top_k)
    return [chunks[i] for i in indices[0]]

def generate_answer(query, retrieved_chunks):
    context = "\n\n".join([f"[From {c['source']}]\n{c['text']}" for c in retrieved_chunks])

    prompt = f"""You are a helpful study assistant. Answer the student's question using ONLY the context below from their own notes. If the context doesn't fully answer it, say so honestly rather than making things up. Keep the answer clear and exam-friendly.

Context from notes:
{context}

Question: {query}

Answer:"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    index, chunks = load_vector_store()
    print(f"Loaded {index.ntotal} chunks. Ready!\n")

    while True:
        query = input("Ask a question (or 'quit'): ")
        if query.lower() == "quit":
            break

        retrieved = retrieve_chunks(query, index, chunks)
        answer = generate_answer(query, retrieved)

        print("\n--- Answer ---")
        print(answer)
        print("\n--- Sources used ---")
        for c in retrieved:
            print(f"- {c['source']}")
        print()