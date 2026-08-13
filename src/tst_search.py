import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

INDEX_PATH = "data/faiss_index.bin"
CHUNKS_PATH = "data/chunks.pkl"

def load_vector_store():
    index = faiss.read_index(INDEX_PATH)
    with open(CHUNKS_PATH, "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

def search(query, model, index, chunks, top_k=3):
    query_embedding = model.encode([query]).astype('float32')
    distances, indices = index.search(query_embedding, top_k)
    
    results = []
    for idx in indices[0]:
        results.append(chunks[idx])
    return results

if __name__ == "__main__":
    print("Loading model and vector store...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    index, chunks = load_vector_store()
    print(f"Loaded {index.ntotal} chunks.\n")

    while True:
        query = input("Ask a question (or type 'quit'): ")
        if query.lower() == "quit":
            break

        results = search(query, model, index, chunks)
        print(f"\nTop {len(results)} matching chunks:\n")
        for i, r in enumerate(results, 1):
            print(f"--- Match {i} (from {r['source']}) ---")
            print(r['text'][:250] + "...")
            print()