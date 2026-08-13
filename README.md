# AI Study Assistant

A RAG-based study tool I built to help with exam and viva prep. You upload your class notes (PDFs) and it lets you ask questions, generate practice questions, get quizzed, and make flashcards — all based on your actual notes instead of generic internet answers.

I built this because I was spending a lot of time before exams manually going through notes to make my own question banks and flashcards, so I decided to automate it.

## What it does

- **Chat with your notes** — ask a question, get an answer based on your uploaded PDFs, with the source shown. It also shows a web-based answer side by side for comparison.
- **Viva mode** — generates a question from a chosen unit, you type your answer, and it gives feedback like an examiner would (what's right, what's missing).
- **Practice questions** — generates a set of exam-style questions from any unit. Can also pull in extra numerical problems from the web if needed.
- **Flashcards** — auto-generates flashcards from a unit for quick revision.

## How it works

It's a RAG (Retrieval-Augmented Generation) pipeline:

1. PDFs are split into chunks of text
2. Each chunk is converted into an embedding (a vector representing its meaning) using sentence-transformers
3. These are stored in a FAISS index so I can search by meaning, not just keywords
4. When I ask a question, it finds the most relevant chunks from my notes and passes them to an LLM (via Groq) to generate an answer
5. For the web comparison feature, it also searches the web using Tavily and summarizes that separately

## Tech stack

- Python
- Streamlit (UI)
- sentence-transformers (embeddings)
- FAISS (vector search)
- Groq API (LLM — Llama 3.3)
- Tavily API (web search)
- pypdf (reading PDFs)

## Running it locally

1. Clone this repo and go into the folder
```
git clone https://github.com/yourusername/study-assistant.git
cd study-assistant
```

2. Set up a virtual environment
```
python -m venv venv
venv\Scripts\activate
```

3. Install requirements
```
pip install -r requirements.txt
```

4. Add a `.env` file with your API keys
```
GROQ_API_KEY=your_key
TAVILY_API_KEY=your_key
```

5. Put your PDF notes in the `data/` folder, then build the vector store
```
python src/build_vector_store.py
```

6. Run the app
```
streamlit run src/app.py
```

## Project structure

```
study-assistant/
├── data/                      # PDFs + generated vector store (not pushed to git)
├── src/
│   ├── extract_and_chunk.py   # reads PDFs, splits into chunks
│   ├── build_vector_store.py  # creates embeddings + FAISS index
│   ├── generate_answer.py     # terminal version, used this for testing
│   └── app.py                 # main Streamlit app
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

## Things I'd improve if I kept working on this

- Filter search by subject instead of searching across all notes at once
- Handle short/vague questions better (right now something like "what is a bit" can pull unrelated chunks since it's too generic)
- Try a better embedding model for technical terms — the current one sometimes misses domain-specific jargon
- Deploy it properly instead of running locally
