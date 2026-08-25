import pickle
from pathlib import Path
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from extract import process_all_pdfs

INDEX_PATH = Path("data/faiss_index.bin")
CHUNKS_PATH = Path("data/chunks.pkl")

def build_vector_store():
    print("Step 1: Extracting and chunking PDFs...")
    chunks = process_all_pdfs()

    if not chunks:
        print("No chunks found — check your data/ folder structure.")
        return

    print(f"Got {len(chunks)} chunks across subjects: {sorted(set(c['subject'] for c in chunks))}")
    print("Loading embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')

    print("Step 2: Creating embeddings...")
    texts = [chunk["text"] for chunk in chunks]
    embeddings = model.encode(texts, show_progress_bar=True)
    embeddings = np.array(embeddings).astype('float32')

    print("Step 3: Building FAISS index...")
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)

    print("Step 4: Saving index and chunk data to disk...")
    faiss.write_index(index, str(INDEX_PATH))
    with open(CHUNKS_PATH, "wb") as f:
        pickle.dump(chunks, f)

    print(f"\nDone! Indexed {index.ntotal} chunks.")

if __name__ == "__main__":
    build_vector_store()