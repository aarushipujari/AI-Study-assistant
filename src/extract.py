from pathlib import Path
from pypdf import PdfReader

DATA_DIR = Path("data")
CHUNK_SIZE = 400
CHUNK_OVERLAP = 50

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    return full_text

def chunk_text(text, source_name, subject, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk_words = words[start:end]
        chunk_str = " ".join(chunk_words)
        chunks.append({
            "text": chunk_str,
            "source": source_name,
            "subject": subject
        })
        start += chunk_size - overlap
    return chunks

def process_all_pdfs():
    """
    Walks data/ subfolders. Each subfolder name = subject.
    PDFs directly inside data/ (no subfolder) get subject 'General'.
    """
    all_chunks = []

    if not DATA_DIR.exists():
        print("data/ folder not found!")
        return []

    # PDFs inside subject subfolders
    for subfolder in DATA_DIR.iterdir():
        if subfolder.is_dir():
            subject = subfolder.name
            # Use a set to avoid duplicates — Windows filesystems are case-insensitive,
            # so *.pdf and *.PDF would otherwise match the same file twice.
            pdf_files = sorted(set(subfolder.glob("*.pdf")) | set(subfolder.glob("*.PDF")))
            for pdf_path in pdf_files:
                print(f"Processing: {pdf_path.name} (subject: {subject})")
                text = extract_text_from_pdf(pdf_path)
                chunks = chunk_text(text, source_name=pdf_path.name, subject=subject)
                all_chunks.extend(chunks)
                print(f"  -> {len(chunks)} chunks created")

    # PDFs directly in data/ (no subfolder) — fallback subject
    root_pdfs = sorted(set(DATA_DIR.glob("*.pdf")) | set(DATA_DIR.glob("*.PDF")))
    for pdf_path in root_pdfs:
        print(f"Processing: {pdf_path.name} (subject: General)")
        text = extract_text_from_pdf(pdf_path)
        chunks = chunk_text(text, source_name=pdf_path.name, subject="General")
        all_chunks.extend(chunks)
        print(f"  -> {len(chunks)} chunks created")

    return all_chunks

if __name__ == "__main__":
    chunks = process_all_pdfs()
    print(f"\nTotal chunks created: {len(chunks)}")
    if chunks:
        print(f"Subjects found: {sorted(set(c['subject'] for c in chunks))}")