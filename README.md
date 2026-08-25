# ⚡ AI Study Assistant Pro v2.0

An advanced, interactive RAG-powered academic study platform built to elevate university exam preparation, conceptual mastery, and oral viva readiness. Ingest course PDFs, lecture slides, and notes to unlock grounded multi-stream AI chat, oral viva examination simulation, interactive 3D flashcards, MCQ/subjective practice arenas, and 1-click cheat sheet synthesis.

---

## 🌟 Key Features & Study Modules

### 1. 💬 Dual-Stream Grounded AI Chat
- **Lecture Grounding vs. Live Web Research**: Side-by-side comparison of strict lecture note citations (with cosine match confidence scores) and live textbook/web grounding.
- **4 Answer Framing Modes**:
  - 🎓 *Exam Standard* — Structured 5/10 mark answers with headings, points, and diagram descriptions.
  - 💡 *Feynman Technique* — Intuitive analogies, plain English, and step-by-step mechanisms.
  - ⚡ *High-Yield Bullet Points* — Fast, rapid-revision key points with zero fluff.
  - 📐 *Formulas & Derivations* — Mathematical derivations, equations, and SI units.
- **Quick Prompt Chips & Dynamic Follow-Ups**: 1-click prompt triggers and AI-generated follow-up concepts.
- **Export**: One-click export of chat sessions into Markdown study guides.

### 2. 🎤 Viva Voce Oral Examiner Simulator
- **Examiner Personas**:
  - 👨‍🏫 *Dr. Harrison (Strict External Examiner)*
  - 👩‍🏫 *Prof. Elena (Supportive Professor)*
  - 🏢 *Chief Engineer (Practical & Application Focus)*
- **Multi-Criteria Rubric Scoring**:
  - 🎯 Conceptual Accuracy (0-10)
  - 🔍 Technical Terminology (0-10)
  - 🗣️ Clarity & Structure (0-10)
  - 🌟 Overall Grade Badge (`A+`, `A`, `B`, `C`)
- **Adaptive Follow-Up Probing**: Examiner dynamically challenges missing points with follow-up oral questions.

### 3. 🗂️ 3D Interactive Flashcard Deck
- Active recall engine with card-flip animation (Front: Question/Concept ↔ Back: Solution/Definition).
- Self-Mastery Tracking (🟢 *Mastered* | 🟡 *Review Needed* | 🔀 *Shuffle Deck*).
- Deck Progress Bar and direct export to Anki-compatible CSV.

### 4. 📝 Practice & Mock Quiz Arena
- **Interactive MCQ Exam**: Generates 4-option MCQs with instant feedback, explanations, and score tracking.
- **Subjective Model Exam Paper**: Generates 2-mark, 5-mark, and 10-mark questions with complete marking schemes.
- **Live Numerical Problem Solver**: Pulls real-world calculation problems with worked step-by-step solutions.

### 5. ⚡ Smart Revision & Cheat Sheet Suite
- 1-click synthesis of:
  - 📑 *Ultimate 1-Page Subject Cheat Sheet*
  - 📐 *Complete Formula & SI Unit Index*
  - ⚖️ *Concept Comparison & Difference Tables*
  - ⚡ *10-Minute Rapid Revision Brief*
  - ⚠️ *Top 10 Exam Traps & Misconceptions*

### 6. ⏱️ Focus Pomodoro Study Timer & Dashboard
- Integrated focus session timer logging study time directly into the session metrics dashboard.
- Live progress metrics tracking questions solved, viva performance, and flashcard mastery.

---

## 🛠️ Architecture & Tech Stack

- **Frontend / UI**: [Streamlit](https://streamlit.io/) with custom Cyber-Glass design system, CSS animations, and theme switcher (Cyber Dark & Nordic Light).
- **Embeddings**: `sentence-transformers` (`all-MiniLM-L6-v2`) with cosine similarity retrieval.
- **Vector Index**: FAISS / NumPy vectorized search with metadata tags.
- **LLM Engine**: [Groq](https://groq.com/) API (Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B).
- **Web Grounding**: [Tavily](https://tavily.com/) Search API for live academic search.
- **Document Processing**: `pypdf` with smart word-boundary chunking and subject tagging.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/study-assistant.git
cd study-assistant
```

### 2. Set up virtual environment
```bash
python -m venv venv
venv\Scripts\activate   # On Windows
source venv/bin/activate # On macOS/Linux
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure API Keys
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

### 5. Launch the Application
```bash
streamlit run src/app.py
```
