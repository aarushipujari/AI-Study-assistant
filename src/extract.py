import os
from pathlib import Path
from pypdf import PdfReader

DATA_DIR = Path("data")
CHUNK_SIZE = 400      # words per chunk
CHUNK_OVERLAP = 50    # words of overlap between chunks

def extract_text_from_pdf(pdf_path):
    """Extract all text from a PDF file, page by page."""
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text

def chunk_text(text, source_name, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split text into overlapping chunks of ~chunk_size words."""
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk_words = words[start:end]
        chunk_text = " ".join(chunk_words)
        chunks.append({
            "text": chunk_text,
            "source": source_name
        })
        start += chunk_size - overlap  # move forward, but overlap a bit
    return chunks

def process_all_pdfs():
    """Process every PDF in the data folder and return all chunks."""
    all_chunks = []
    pdf_files = list(DATA_DIR.glob("*.pdf"))

    if not pdf_files:
        print("No PDF files found in data/ folder!")
        return []

    for pdf_path in pdf_files:
        print(f"Processing: {pdf_path.name}")
        text = extract_text_from_pdf(pdf_path)
        chunks = chunk_text(text, source_name=pdf_path.name)
        all_chunks.extend(chunks)
        print(f"  -> {len(chunks)} chunks created")

    return all_chunks

if __name__ == "__main__":
    chunks = process_all_pdfs()
    print(f"\nTotal chunks created: {len(chunks)}")
    
    if chunks:
        print("\n--- Sample chunk (first one) ---")
        print(f"Source: {chunks[0]['source']}")
        print(f"Text preview: {chunks[0]['text'][:300]}...")