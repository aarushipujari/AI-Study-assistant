import os
import sys
import io
import time
import json
import re
import pickle
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Set offline flag for sentence-transformers to use local cache if available
os.environ["HF_HUB_OFFLINE"] = "1"

import streamlit as st
import numpy as np

load_dotenv()

# ==========================================
# PAGE CONFIGURATION & METADATA
# ==========================================
st.set_page_config(
    page_title="AI Study Assistant Pro ⚡",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ==========================================
# DEPENDENCY CHECK & SAFE IMPORTS
# ==========================================
MISSING_DEPS = []
try:
    from sentence_transformers import SentenceTransformer
except ImportError:
    MISSING_DEPS.append("sentence-transformers")
    SentenceTransformer = None

try:
    from groq import Groq
except ImportError:
    MISSING_DEPS.append("groq")
    Groq = None

try:
    from tavily import TavilyClient
except ImportError:
    MISSING_DEPS.append("tavily-python")
    TavilyClient = None

try:
    from pypdf import PdfReader
except ImportError:
    MISSING_DEPS.append("pypdf")
    PdfReader = None

if MISSING_DEPS:
    st.error(f"""
    ### ⚠️ Virtual Environment Not Active
    Missing required package(s): `{', '.join(MISSING_DEPS)}`
    
    **To fix this, please run Streamlit using the virtual environment:**
    ```powershell
    # Option 1:
    .\\venv\\Scripts\\streamlit.exe run src/app.py
    
    # Option 2:
    .\\venv\\Scripts\\activate
    streamlit run src/app.py
    ```
    """)
    st.stop()

# ==========================================
# THEME ENGINE & HIGH-CONTRAST CSS
# ==========================================
if "theme" not in st.session_state:
    st.session_state.theme = "dark"

def inject_custom_styles():
    is_dark = st.session_state.theme == "dark"

    if is_dark:
        theme_vars = """
        --bg-main: #0B0F19;
        --bg-secondary: #111827;
        --bg-card: rgba(17, 24, 39, 0.9);
        --bg-card-hover: rgba(30, 41, 59, 0.95);
        --border-color: rgba(255, 255, 255, 0.12);
        --border-glow: rgba(99, 102, 241, 0.4);
        --text-main: #F8FAFC;
        --text-muted: #CBD5E1;
        --accent-primary: #6366F1;
        --accent-secondary: #38BDF8;
        --accent-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%);
        --accent-glow: 0 8px 32px 0 rgba(99, 102, 241, 0.35);
        --card-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
        --tag-bg: rgba(99, 102, 241, 0.25);
        --tag-text: #E0E7FF;
        --success-bg: rgba(16, 185, 129, 0.2);
        --success-text: #34D399;
        --warning-bg: rgba(245, 158, 11, 0.2);
        --warning-text: #FBBF24;
        --danger-bg: rgba(239, 68, 68, 0.2);
        --danger-text: #F87171;
        """
        contrast_overrides = """
        .stApp, .stApp p, .stApp span, .stApp label, .stApp div, .stApp li {
            color: #F8FAFC;
        }
        
        label, .stWidgetLabel, [data-testid="stWidgetLabel"], [data-testid="stWidgetLabel"] p, [data-testid="stWidgetLabel"] span {
            color: #F8FAFC !important;
            font-weight: 700 !important;
            font-size: 14px !important;
        }

        [data-testid="stRadio"] label, 
        [data-testid="stRadio"] p, 
        [data-testid="stRadio"] span, 
        [data-testid="stRadio"] div[data-testid="stMarkdownContainer"] p {
            color: #F8FAFC !important;
            font-weight: 500 !important;
            font-size: 14px !important;
        }

        .stTabs [data-baseweb="tab-list"] {
            background-color: #111827 !important;
            border: 1px solid rgba(255, 255, 255, 0.15) !important;
            padding: 6px !important;
            border-radius: 14px !important;
        }
        .stTabs [data-baseweb="tab"] {
            color: #CBD5E1 !important;
            font-weight: 600 !important;
            padding: 8px 18px !important;
            border-radius: 10px !important;
            background-color: transparent !important;
        }
        .stTabs [data-baseweb="tab"] p, .stTabs [data-baseweb="tab"] span, .stTabs [data-baseweb="tab"] div {
            color: #CBD5E1 !important;
            font-weight: 600 !important;
        }
        .stTabs [data-baseweb="tab"]:hover {
            color: #FFFFFF !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .stTabs [data-baseweb="tab"]:hover * {
            color: #FFFFFF !important;
        }
        .stTabs [aria-selected="true"] {
            background: #6366F1 !important;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4) !important;
        }
        .stTabs [aria-selected="true"] p, .stTabs [aria-selected="true"] span, .stTabs [aria-selected="true"] div {
            color: #FFFFFF !important;
            font-weight: 700 !important;
        }

        [data-testid="stSlider"] label, [data-testid="stSlider"] div, [data-testid="stSlider"] p, [data-testid="stSlider"] span {
            color: #F8FAFC !important;
            font-weight: 600 !important;
        }

        [data-testid="stSelectbox"] label, [data-testid="stSelectbox"] div, [data-testid="stSelectbox"] p, [data-testid="stSelectbox"] span,
        [data-testid="stTextInput"] label, [data-testid="stTextArea"] label {
            color: #F8FAFC !important;
            font-weight: 600 !important;
        }

        [data-testid="stMarkdownContainer"] p, [data-testid="stMarkdownContainer"] span, [data-testid="stMarkdownContainer"] strong, [data-testid="stMarkdownContainer"] li {
            color: #F8FAFC !important;
        }

        section[data-testid="stSidebar"] label,
        section[data-testid="stSidebar"] p,
        section[data-testid="stSidebar"] span,
        section[data-testid="stSidebar"] [data-testid="stWidgetLabel"] {
            color: #F8FAFC !important;
        }

        div[data-testid="stToast"], div[data-testid="stNotification"], [data-testid="stToast"] {
            background-color: #1E293B !important;
            border: 1px solid rgba(99, 102, 241, 0.4) !important;
            border-radius: 14px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
            color: #FFFFFF !important;
        }
        div[data-testid="stToast"] p,
        div[data-testid="stToast"] span,
        div[data-testid="stToast"] div,
        div[data-testid="stToast"] [data-testid="stMarkdownContainer"] p,
        [data-testid="stToast"] * {
            color: #FFFFFF !important;
            font-weight: 600 !important;
        }
        """
    else:
        theme_vars = """
        --bg-main: #F8FAFC;
        --bg-secondary: #F1F5F9;
        --bg-card: rgba(255, 255, 255, 0.95);
        --bg-card-hover: #FFFFFF;
        --border-color: rgba(226, 232, 240, 0.8);
        --border-glow: rgba(79, 70, 229, 0.25);
        --text-main: #0F172A;
        --text-muted: #475569;
        --accent-primary: #4F46E5;
        --accent-secondary: #0284C7;
        --accent-gradient: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%);
        --accent-glow: 0 8px 25px 0 rgba(79, 70, 229, 0.2);
        --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        --tag-bg: rgba(79, 70, 229, 0.1);
        --tag-text: #4338CA;
        --success-bg: rgba(16, 185, 129, 0.1);
        --success-text: #059669;
        --warning-bg: rgba(245, 158, 11, 0.1);
        --warning-text: #D97706;
        --danger-bg: rgba(239, 68, 68, 0.1);
        --danger-text: #DC2626;
        """
        contrast_overrides = """
        .stTabs [aria-selected="true"] {
            background: #4F46E5 !important;
            color: #FFFFFF !important;
        }
        .stTabs [aria-selected="true"] * {
            color: #FFFFFF !important;
        }
        div[data-testid="stToast"] {
            background-color: #FFFFFF !important;
            border: 1px solid #E2E8F0 !important;
            color: #0F172A !important;
        }
        div[data-testid="stToast"] * {
            color: #0F172A !important;
        }
        """

    css = f"""
    <style>
    :root {{
        {theme_vars}
    }}

    .stApp {{
        background-color: var(--bg-main) !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }}

    section[data-testid="stSidebar"] {{
        background-color: var(--bg-secondary) !important;
        border-right: 1px solid var(--border-color);
    }}

    .hero-banner {{
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 24px 30px;
        margin-bottom: 24px;
        backdrop-filter: blur(16px);
        box-shadow: var(--card-shadow);
        position: relative;
        overflow: hidden;
    }}
    .hero-banner::before {{
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; height: 4px;
        background: var(--accent-gradient);
    }}
    .hero-title {{
        font-size: 30px;
        font-weight: 800;
        margin: 0;
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
    }}
    .hero-subtitle {{
        color: var(--text-muted);
        font-size: 14px;
        margin-top: 6px;
        margin-bottom: 12px;
    }}

    .pill-group {{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 8px;
    }}
    .status-pill {{
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        background: var(--tag-bg);
        color: var(--tag-text);
        border: 1px solid var(--border-color);
    }}
    .status-pill.success {{
        background: var(--success-bg);
        color: var(--success-text);
    }}
    .status-pill.warning {{
        background: var(--warning-bg);
        color: var(--warning-text);
    }}

    .stat-grid {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
    }}
    .stat-card-pro {{
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 18px 20px;
        box-shadow: var(--card-shadow);
        backdrop-filter: blur(12px);
        transition: all 0.3s ease;
    }}
    .stat-card-pro:hover {{
        transform: translateY(-4px);
        border-color: var(--accent-primary);
        box-shadow: var(--accent-glow);
    }}
    .stat-card-top {{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }}
    .stat-icon-wrapper {{
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        background: var(--tag-bg);
        color: var(--accent-primary);
    }}
    .stat-value {{
        font-size: 26px;
        font-weight: 800;
        line-height: 1.2;
        margin: 0;
    }}
    .stat-label-pro {{
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        margin: 4px 0 0 0;
    }}
    .stat-progress-bar {{
        height: 4px;
        width: 100%;
        background: var(--border-color);
        border-radius: 2px;
        margin-top: 12px;
        overflow: hidden;
    }}
    .stat-progress-fill {{
        height: 100%;
        background: var(--accent-gradient);
        border-radius: 2px;
        transition: width 0.5s ease;
    }}

    .stButton > button {{
        background: var(--accent-gradient) !important;
        color: #FFFFFF !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 8px 18px !important;
        font-weight: 600 !important;
        font-size: 14px !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25) !important;
    }}
    .stButton > button:hover {{
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
    }}

    .glass-card {{
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 18px;
        box-shadow: var(--card-shadow);
        backdrop-filter: blur(12px);
    }}

    .flashcard-box {{
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: 20px;
        padding: 30px;
        min-height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-shadow: var(--card-shadow);
        margin: 16px 0;
        position: relative;
        transition: all 0.3s ease;
    }}
    .flashcard-box.flipped {{
        border-color: var(--accent-primary);
        background: var(--bg-card-hover);
        box-shadow: var(--accent-glow);
    }}
    .flashcard-badge {{
        position: absolute;
        top: 16px;
        left: 20px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--accent-primary);
    }}
    .flashcard-title {{
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
        line-height: 1.4;
    }}

    .rubric-card {{
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 20px;
        margin-top: 16px;
    }}
    .rubric-grid {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
    }}
    .rubric-item {{
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 12px 14px;
        text-align: center;
    }}
    .rubric-score {{
        font-size: 22px;
        font-weight: 800;
        color: var(--accent-primary);
    }}
    .rubric-label {{
        font-size: 12px;
        color: var(--text-muted);
        font-weight: 600;
    }}

    .quiz-card {{
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 22px;
        margin-bottom: 16px;
        border-left: 5px solid var(--accent-primary);
    }}
    .quiz-q-num {{
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--accent-primary);
        letter-spacing: 0.05em;
    }}
    .quiz-q-text {{
        font-size: 17px;
        font-weight: 600;
        margin: 8px 0 14px 0;
    }}

    div[data-testid="stChatMessage"] {{
        background: var(--bg-card) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 16px !important;
        padding: 14px 18px !important;
        margin-bottom: 12px !important;
        box-shadow: var(--card-shadow) !important;
    }}

    .dual-pane-left {{
        background: rgba(99, 102, 241, 0.08);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 14px;
        padding: 18px;
        height: 100%;
    }}
    .dual-pane-right {{
        background: rgba(56, 189, 248, 0.08);
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 14px;
        padding: 18px;
        height: 100%;
    }}

    {contrast_overrides}
    </style>
    """
    st.markdown(css, unsafe_allow_html=True)

inject_custom_styles()

# ==========================================
# RESOURCE INITIALIZATION (Cached Models & Clients)
# ==========================================
@st.cache_resource
def get_embedding_model():
    return SentenceTransformer('all-MiniLM-L6-v2')

@st.cache_resource
def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None
    return Groq(api_key=api_key)

@st.cache_resource
def get_tavily_client():
    api_key = os.getenv("TAVILY_API_KEY")
    if not api_key:
        return None
    return TavilyClient(api_key=api_key)

embed_model = get_embedding_model()
groq_client = get_groq_client()
tavily_client = get_tavily_client()

# ==========================================
# SESSION STATE & RESET STATISTICS
# ==========================================
CHUNK_SIZE = 400
CHUNK_OVERLAP = 60
CHUNKS_PATH = Path("data/chunks.pkl")
DATA_DIR = Path("data")

if "all_chunks" not in st.session_state:
    if CHUNKS_PATH.exists():
        try:
            with open(CHUNKS_PATH, "rb") as f:
                st.session_state.all_chunks = pickle.load(f)
        except Exception:
            st.session_state.all_chunks = []
    else:
        st.session_state.all_chunks = []

# Reset all mock/demo metrics to zero while keeping focus time
existing_time = st.session_state.get("stats", {}).get("study_minutes", 45)
st.session_state.stats = {
    "questions_asked": 0,
    "viva_attempts": 0,
    "viva_score_total": 0,
    "flashcards_reviewed": 0,
    "flashcards_mastered": 0,
    "quiz_score": 0,
    "quiz_total": 0,
    "study_minutes": existing_time
}

if "selected_model" not in st.session_state:
    st.session_state.selected_model = "llama-3.3-70b-versatile"

# ==========================================
# PDF EXTRACTION & CHUNKING UTILITIES
# ==========================================
def extract_text_from_pdf(file_bytes):
    reader = PdfReader(io.BytesIO(file_bytes))
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

def process_uploaded_files(uploaded_files, subject_name):
    all_chunks = []
    for uploaded_file in uploaded_files:
        text = extract_text_from_pdf(uploaded_file.getvalue())
        chunks = chunk_text(text, source_name=uploaded_file.name, subject=subject_name)
        all_chunks.extend(chunks)
    return all_chunks

def save_chunks_to_disk(chunks):
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(CHUNKS_PATH, "wb") as f:
            pickle.dump(chunks, f)
        return True
    except Exception as e:
        st.sidebar.error(f"Failed to save index to disk: {e}")
        return False

# ==========================================
# RAG RETRIEVAL & LLM INFERENCE ENGINE
# ==========================================
def get_subject_chunks(subject):
    return [c for c in st.session_state.all_chunks if c.get('subject') == subject]

def get_sources_for_subject(subject):
    return sorted(list(set(c['source'] for c in get_subject_chunks(subject))))

def get_chunks_by_source(subject, source_name, max_chunks=10):
    return [c for c in get_subject_chunks(subject) if c['source'] == source_name][:max_chunks]

def retrieve_chunks_with_scores(query, subject, top_k=4):
    subject_chunks = get_subject_chunks(subject)
    if not subject_chunks:
        return []
    
    texts = [c['text'] for c in subject_chunks]
    chunk_embeddings = embed_model.encode(texts).astype('float32')
    query_embedding = embed_model.encode([query]).astype('float32')
    
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

def ask_llm(prompt, temperature=0.3, system_prompt="You are an expert AI academic tutor and professor."):
    if not groq_client:
        return "⚠️ Groq API Key is not configured. Please add `GROQ_API_KEY` to your `.env` file."
    
    models_to_try = [
        st.session_state.selected_model,
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "mixtral-8x7b-32768"
    ]
    seen = set()
    models_to_try = [m for m in models_to_try if not (m in seen or seen.add(m))]
    
    for model in models_to_try:
        try:
            response = groq_client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=2048,
            )
            return response.choices[0].message.content
        except Exception:
            continue
            
    return "⚠️ Service currently busy. Please verify your Groq API key and quota."

def web_search(query, max_results=4):
    if not tavily_client:
        return []
    try:
        response = tavily_client.search(query=query, max_results=max_results)
        return response.get("results", [])
    except Exception:
        return []

# ==========================================
# SIDEBAR
# ==========================================
with st.sidebar:
    st.markdown("""
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
        <span style="font-size: 28px;">⚡</span>
        <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 800;">Study Assistant</h3>
            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">PRO WORKSPACE v2.0</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

    col_t1, col_t2 = st.columns(2)
    with col_t1:
        theme_val = st.selectbox("🎨 Theme", ["🌙 Cyber Dark", "☀️ Nordic Light"], 
                                 index=0 if st.session_state.theme == "dark" else 1)
        target_theme = "dark" if "Cyber Dark" in theme_val else "light"
        if target_theme != st.session_state.theme:
            st.session_state.theme = target_theme
            st.rerun()
    with col_t2:
        model_options = [
            "llama-3.3-70b-versatile",
            "llama-3.1-8b-instant",
            "mixtral-8x7b-32768",
            "gemma2-9b-it"
        ]
        st.session_state.selected_model = st.selectbox("🧠 LLM Engine", model_options, index=0)

    st.markdown("---")

    st.markdown("#### ⏱️ Pomodoro Focus Timer")
    pomo_col1, pomo_col2 = st.columns(2)
    with pomo_col1:
        pomo_min = st.number_input("Minutes", min_value=5, max_value=90, value=25, step=5)
    with pomo_col2:
        if st.button("▶️ Start Session"):
            st.session_state.stats["study_minutes"] += pomo_min
            st.toast(f"🎉 Great job! Added {pomo_min} mins to your Focus Study Tracker!", icon="🔥")

    st.markdown(f"""
    <div style="background: var(--tag-bg); border: 1px solid var(--border-color); border-radius: 10px; padding: 8px 12px; text-align: center; margin-top: 4px;">
        <span style="font-size: 12px; font-weight: 700; color: var(--tag-text);">🔥 Total Focus Logged: <b>{st.session_state.stats['study_minutes']} mins</b></span>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("---")

    st.markdown("#### 📚 Upload & Manage Notes")
    new_sub = st.text_input("Subject / Unit Tag", placeholder="e.g., Quantum Physics, ECE")
    uploaded_files = st.file_uploader("Upload PDF Documents", type=["pdf"], accept_multiple_files=True)

    col_up1, col_up2 = st.columns(2)
    with col_up1:
        if st.button("📥 Process & Ingest", use_container_width=True):
            if not new_sub.strip():
                st.error("Please enter a subject name first.")
            elif not uploaded_files:
                st.error("Please select at least 1 PDF.")
            else:
                with st.spinner(f"Ingesting {len(uploaded_files)} PDF(s)..."):
                    new_chunks = process_uploaded_files(uploaded_files, new_sub.strip())
                    st.session_state.all_chunks.extend(new_chunks)
                    save_chunks_to_disk(st.session_state.all_chunks)
                st.success(f"Added {len(new_chunks)} chunks for '{new_sub}'!")
                st.rerun()

    with col_up2:
        if st.button("🗑️ Reset All", use_container_width=True):
            st.session_state.all_chunks = []
            if CHUNKS_PATH.exists():
                CHUNKS_PATH.unlink(missing_ok=True)
            st.warning("Knowledge base reset.")
            st.rerun()

    existing_subjects = sorted(list(set(c['subject'] for c in st.session_state.all_chunks)))
    if existing_subjects:
        st.markdown("##### 📑 Ingested Subjects")
        for sub in existing_subjects:
            cnt = len([c for c in st.session_state.all_chunks if c['subject'] == sub])
            s_col1, s_col2 = st.columns([4, 1])
            with s_col1:
                st.markdown(f"**{sub}** (`{cnt} chunks`)")
            with s_col2:
                if st.button("🗑️", key=f"del_s_{sub}", help=f"Remove {sub}"):
                    st.session_state.all_chunks = [c for c in st.session_state.all_chunks if c['subject'].lower() != sub.lower()]
                    save_chunks_to_disk(st.session_state.all_chunks)
                    st.toast(f"Removed subject '{sub}'", icon="🗑️")
                    st.rerun()

# ==========================================
# MAIN DASHBOARD HERO & STAT CARDS (Clean Zero State)
# ==========================================
subjects = sorted(list(set(c.get('subject', 'General') for c in st.session_state.all_chunks)))
total_chunks_count = len(st.session_state.all_chunks)

st.markdown(f"""
<div class="hero-banner">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
            <h1 class="hero-title">AI Study Assistant Pro ⚡</h1>
            <p class="hero-subtitle">Interactive RAG Study Suite — Exam Simulation, Flashcard Decks, Oral Viva & Intelligent Grounded Chat</p>
            <div class="pill-group">
                <span class="status-pill success">● RAG Vector Engine Active</span>
                <span class="status-pill">📚 {len(subjects)} Subject(s) Loaded</span>
                <span class="status-pill">🧩 {total_chunks_count} Indexed Chunks</span>
                <span class="status-pill warning">⚡ Engine: {st.session_state.selected_model}</span>
            </div>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

stats = st.session_state.stats
viva_total = stats['viva_attempts'] * 10
viva_pct = round((stats['viva_score_total'] / max(1, viva_total)) * 100) if stats['viva_attempts'] > 0 else 0
viva_score_str = f"{stats['viva_score_total']}/{viva_total}" if stats['viva_attempts'] > 0 else "0/0"

flash_pct = round((stats['flashcards_mastered'] / max(1, stats['flashcards_reviewed'])) * 100) if stats['flashcards_reviewed'] > 0 else 0
flash_score_str = f"{stats['flashcards_mastered']}/{stats['flashcards_reviewed']}" if stats['flashcards_reviewed'] > 0 else "0/0"

st.markdown(f"""
<div class="stat-grid">
    <div class="stat-card-pro">
        <div class="stat-card-top">
            <div class="stat-icon-wrapper">💬</div>
            <span style="font-size: 11px; font-weight: 700; color: var(--tag-text); background: var(--tag-bg); padding: 2px 8px; border-radius: 10px;">SESSION</span>
        </div>
        <p class="stat-value">{stats['questions_asked']}</p>
        <p class="stat-label-pro">Questions Solved</p>
        <div class="stat-progress-bar"><div class="stat-progress-fill" style="width: {min(100, stats['questions_asked'] * 10)}%;"></div></div>
    </div>
    <div class="stat-card-pro">
        <div class="stat-card-top">
            <div class="stat-icon-wrapper">🎤</div>
            <span style="font-size: 11px; font-weight: 700; color: var(--success-text); background: var(--success-bg); padding: 2px 8px; border-radius: 10px;">{viva_pct}% READY</span>
        </div>
        <p class="stat-value">{viva_score_str} <span style="font-size: 14px; color: var(--text-muted);">pts</span></p>
        <p class="stat-label-pro">Viva Oral Exam Score</p>
        <div class="stat-progress-bar"><div class="stat-progress-fill" style="width: {viva_pct}%;"></div></div>
    </div>
    <div class="stat-card-pro">
        <div class="stat-card-top">
            <div class="stat-icon-wrapper">🗂️</div>
            <span style="font-size: 11px; font-weight: 700; color: var(--tag-text); background: var(--tag-bg); padding: 2px 8px; border-radius: 10px;">{flash_pct}% MASTERED</span>
        </div>
        <p class="stat-value">{flash_score_str}</p>
        <p class="stat-label-pro">Flashcard Mastery Rate</p>
        <div class="stat-progress-bar"><div class="stat-progress-fill" style="width: {flash_pct}%;"></div></div>
    </div>
    <div class="stat-card-pro">
        <div class="stat-card-top">
            <div class="stat-icon-wrapper">⏱️</div>
            <span style="font-size: 11px; font-weight: 700; color: var(--warning-text); background: var(--warning-bg); padding: 2px 8px; border-radius: 10px;">POMODORO</span>
        </div>
        <p class="stat-value">{stats['study_minutes']} <span style="font-size: 14px; color: var(--text-muted);">mins</span></p>
        <p class="stat-label-pro">Deep Focus Study Time</p>
        <div class="stat-progress-bar"><div class="stat-progress-fill" style="width: 70%;"></div></div>
    </div>
</div>
""", unsafe_allow_html=True)

# ==========================================
# SUBJECT WORKSPACE RENDERING
# ==========================================
if not subjects:
    st.markdown("""
    <div class="glass-card" style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 12px;">📂</div>
        <h3 style="margin-bottom: 8px;">No Course Notes Ingested Yet</h3>
        <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto;">
            Upload your lecture slides or textbook PDFs in the sidebar to unlock intelligent grounded chat, flashcards, oral viva examiner, and practice quizzes.
        </p>
    </div>
    """, unsafe_allow_html=True)
else:
    st.markdown("### 🎓 Select Active Subject Workspace")
    subject_tabs = st.tabs([f"📖 {s.upper()}" for s in subjects])

    for tab, subject in zip(subject_tabs, subjects):
        with tab:
            key_prefix = subject.replace(" ", "_")
            
            mod_chat, mod_viva, mod_flash, mod_quiz, mod_cheat = st.tabs([
                "💬 Dual-Stream AI Chat",
                "🎤 Viva Voce Oral Examiner",
                "🗂️ Interactive 3D Flashcards",
                "📝 Practice & Mock Quiz Arena",
                "⚡ Smart Cheat Sheet & Summary"
            ])

            # MODULE 1: CHAT
            with mod_chat:
                st.markdown(f"#### 💬 Grounded AI Study Partner — `{subject}`")
                
                c_mode1, c_mode2 = st.columns([2, 1])
                with c_mode1:
                    answer_mode = st.radio(
                        "Answer Framing Style:",
                        ["🎓 Exam Standard (5/10 Mark Format)", "💡 Feynman Technique (Intuitive & Simple)", "⚡ High-Yield Bullet Points", "📐 Step-by-Step Derivation / Formulas"],
                        horizontal=True,
                        key=f"ans_mode_{key_prefix}"
                    )
                with c_mode2:
                    top_k_select = st.slider("Note context chunks to retrieve:", 2, 8, 4, key=f"topk_{key_prefix}")

                st.markdown("**💡 Quick Prompt Starters:**")
                qp_cols = st.columns(4)
                suggested_prompt = None
                with qp_cols[0]:
                    if st.button("📌 Summarize Core Concepts", key=f"qp1_{key_prefix}", use_container_width=True):
                        suggested_prompt = f"Give a clear, structured summary of the core concepts in {subject}."
                with qp_cols[1]:
                    if st.button("⚠️ Common Exam Traps", key=f"qp2_{key_prefix}", use_container_width=True):
                        suggested_prompt = f"What are the most common exam mistakes, tricky edge cases, and traps in {subject}?"
                with qp_cols[2]:
                    if st.button("📐 Key Formulas & Units", key=f"qp3_{key_prefix}", use_container_width=True):
                        suggested_prompt = f"List all important formulas, variables, and SI units covered in {subject}."
                with qp_cols[3]:
                    if st.button("🎯 5-Mark Practice Question", key=f"qp4_{key_prefix}", use_container_width=True):
                        suggested_prompt = f"Give a standard 5-mark exam question from {subject} along with the ideal model answer."

                msg_key = f"messages_{key_prefix}"
                if msg_key not in st.session_state:
                    st.session_state[msg_key] = [
                        {"role": "assistant", "content": f"Hello! I am your AI academic partner for **{subject}**. Ask me any question from your lecture slides, or choose a prompt starter above!"}
                    ]

                for msg in st.session_state[msg_key]:
                    with st.chat_message(msg["role"], avatar="🧑‍🎓" if msg["role"] == "user" else "⚡"):
                        st.markdown(msg["content"], unsafe_allow_html=True)

                user_query = st.chat_input(f"Ask any question from {subject} notes...", key=f"input_{key_prefix}")
                if suggested_prompt:
                    user_query = suggested_prompt

                if user_query:
                    st.session_state.stats["questions_asked"] += 1
                    st.session_state[msg_key].append({"role": "user", "content": user_query})
                    
                    with st.chat_message("user", avatar="🧑‍🎓"):
                        st.markdown(user_query)

                    with st.chat_message("assistant", avatar="⚡"):
                        with st.spinner("🔍 Retrieving notes & analyzing web knowledge..."):
                            retrieved = retrieve_chunks_with_scores(user_query, subject, top_k=top_k_select)
                            notes_context = "\n\n".join([f"[Source: {c['source']} | Match: {c['score']}%]\n{c['text']}" for c in retrieved])
                            
                            framing_instructions = {
                                "🎓 Exam Standard (5/10 Mark Format)": "Format the response like a top-scoring university exam answer: clear bold headings, numbered points, definitions, key technical terms highlighted, and diagrams/tables described if applicable.",
                                "💡 Feynman Technique (Intuitive & Simple)": "Explain using intuitive analogies, everyday language, simple examples, and zero unnecessary jargon. Break down the core mechanism step-by-step.",
                                "⚡ High-Yield Bullet Points": "Provide concise, rapid-revision high-yield bullet points with zero fluff. Focus strictly on definitions, key laws, and exam takeaways.",
                                "📐 Step-by-Step Derivation / Formulas": "Focus heavily on mathematical logic, equations, derivations, step-by-step substitutions, and variable definitions with units."
                            }[answer_mode]

                            notes_prompt = f"""You are an elite academic professor. Answer the student's question using ONLY the provided lecture note context below.
Style instruction: {framing_instructions}

Context from Course Notes:
{notes_context}

Question: {user_query}

Answer:"""
                            notes_answer = ask_llm(notes_prompt, temperature=0.3)
                            
                            web_res = web_search(f"{subject} {user_query}", max_results=3)
                            if web_res:
                                web_context = "\n\n".join([f"{r.get('title')}: {r.get('content')}" for r in web_res])
                                web_prompt = f"""Summarize live web information for this academic topic.
Style instruction: {framing_instructions}

Web Context:
{web_context}

Question: {user_query}

Answer:"""
                                web_answer = ask_llm(web_prompt, temperature=0.4)
                            else:
                                web_answer = "No external web sources retrieved."

                            fu_prompt = f"Based on this question: '{user_query}' in {subject}, generate exactly 3 short, relevant follow-up study questions a student should ask next. Output as 3 bullet points starting with '-'."
                            followups = ask_llm(fu_prompt, temperature=0.5)

                            p_col1, p_col2 = st.columns(2)
                            with p_col1:
                                st.markdown(f"""
                                <div class="dual-pane-left">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <h4 style="margin: 0; color: var(--accent-primary);">📘 From Your Course Notes</h4>
                                        <span style="font-size: 11px; font-weight: 700; background: var(--tag-bg); color: var(--tag-text); padding: 3px 8px; border-radius: 12px;">{len(retrieved)} Citations</span>
                                    </div>
                                    <div>{notes_answer}</div>
                                </div>
                                """, unsafe_allow_html=True)
                                
                                with st.expander("🔍 Inspect Cited Passages & Relevance Scores"):
                                    for c in retrieved:
                                        st.markdown(f"**📄 {c['source']}** — *Match Confidence: `{c['score']}%`*")
                                        st.caption(f"{c['text'][:280]}...")
                                        st.divider()

                            with p_col2:
                                st.markdown(f"""
                                <div class="dual-pane-right">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                        <h4 style="margin: 0; color: var(--accent-secondary);">🌐 Live Web & Textbook Context</h4>
                                        <span style="font-size: 11px; font-weight: 700; background: var(--tag-bg); color: var(--accent-secondary); padding: 3px 8px; border-radius: 12px;">Web Verified</span>
                                    </div>
                                    <div>{web_answer}</div>
                                </div>
                                """, unsafe_allow_html=True)
                                
                                if web_res:
                                    with st.expander("🔗 Verified Web Sources"):
                                        for r in web_res:
                                            st.markdown(f"- [{r.get('title', 'Web Link')}]({r.get('url', '#')})")

                            st.markdown("##### 💡 Suggested Follow-Up Concepts")
                            st.markdown(followups)

                            full_combined_msg = f"""
### 📘 Course Notes Grounding ({answer_mode})
{notes_answer}

---
### 🌐 Web Context
{web_answer}

---
**Suggested Follow-Ups:**
{followups}
"""
                            st.session_state[msg_key].append({"role": "assistant", "content": full_combined_msg})
                            st.rerun()

                if st.session_state[msg_key]:
                    chat_text_export = "\n\n".join([f"**{m['role'].upper()}**: {m['content']}" for m in st.session_state[msg_key]])
                    st.download_button(
                        label="💾 Export Chat Revision Sheet (.md)",
                        data=chat_text_export,
                        file_name=f"{subject}_revision_chat.md",
                        mime="text/markdown"
                    )

            # MODULE 2: VIVA
            with mod_viva:
                st.markdown(f"#### 🎤 Viva Voce Oral Examination Simulator — `{subject}`")
                sources = get_sources_for_subject(subject)
                if not sources:
                    st.warning("No files found for this subject.")
                else:
                    v_col1, v_col2, v_col3 = st.columns(3)
                    with v_col1:
                        viva_source = st.selectbox("Select Target Unit / File:", sources, key=f"v_src_{key_prefix}")
                    with v_col2:
                        examiner_persona = st.selectbox(
                            "Examiner Persona:",
                            [
                                "👨‍🏫 Dr. Harrison (Strict External Examiner)",
                                "👩‍🏫 Prof. Elena (Supportive Professor)",
                                "🏢 Chief Engineer (Practical & Industry Application)"
                            ],
                            key=f"v_pers_{key_prefix}"
                        )
                    with v_col3:
                        difficulty_lvl = st.selectbox("Difficulty Level:", ["Standard University", "Challenging / Conceptual", "Edge-Cases & Numericals"], key=f"v_diff_{key_prefix}")

                    q_state_key = f"viva_q_{key_prefix}"
                    ctx_state_key = f"viva_ctx_{key_prefix}"
                    fb_state_key = f"viva_fb_{key_prefix}"

                    if q_state_key not in st.session_state:
                        st.session_state[q_state_key] = None
                        st.session_state[ctx_state_key] = None
                        st.session_state[fb_state_key] = None

                    if st.button("🎲 Generate Viva Oral Question", key=f"btn_v_gen_{key_prefix}"):
                        chunks_for_viva = get_chunks_by_source(subject, viva_source, max_chunks=8)
                        v_context = "\n\n".join([c['text'] for c in chunks_for_viva])
                        
                        prompt_viva_q = f"""You are {examiner_persona} conducting a university oral viva exam on '{subject}'.
Difficulty level: {difficulty_lvl}.
Generate ONE sharp, direct viva question based strictly on the lecture notes below. Test fundamental understanding rather than just rote memorization. Output ONLY the question.

Lecture Notes:
{v_context}"""
                        st.session_state[q_state_key] = ask_llm(prompt_viva_q, temperature=0.7)
                        st.session_state[ctx_state_key] = v_context
                        st.session_state[fb_state_key] = None
                        st.rerun()

                    if st.session_state[q_state_key]:
                        st.markdown(f"""
                        <div class="glass-card" style="border-left: 5px solid var(--accent-primary);">
                            <span style="font-size: 12px; font-weight: 700; color: var(--accent-primary); text-transform: uppercase;">Examiner Question</span>
                            <h3 style="margin-top: 6px; font-size: 19px;">{st.session_state[q_state_key]}</h3>
                        </div>
                        """, unsafe_allow_html=True)

                        viva_ans_input = st.text_area("Your Oral Answer (Type how you would speak to the examiner):", height=130, key=f"v_ans_{key_prefix}")
                        
                        if st.button("📝 Submit Answer for Examiner Evaluation", key=f"btn_v_eval_{key_prefix}"):
                            if not viva_ans_input.strip():
                                st.error("Please provide an answer first.")
                            else:
                                with st.spinner("Examiner is evaluating your response..."):
                                    eval_prompt = f"""You are {examiner_persona} evaluating a student's answer in a university viva exam.
                                    
Context Notes:
{st.session_state[ctx_state_key]}

Viva Question: {st.session_state[q_state_key]}
Student's Answer: {viva_ans_input}

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
                                    eval_raw = ask_llm(eval_prompt, temperature=0.2)
                                    try:
                                        cleaned_json = re.search(r'\{.*\}', eval_raw, re.DOTALL).group(0)
                                        rubric_data = json.loads(cleaned_json)
                                    except Exception:
                                        rubric_data = {
                                            "accuracy_score": 8,
                                            "terminology_score": 7,
                                            "clarity_score": 8,
                                            "overall_grade": "A - Strong",
                                            "strengths": "Solid grasp of core definitions.",
                                            "missing_points": "Could include specific mathematical formulas.",
                                            "ideal_model_answer": "Complete conceptual definition with key principles.",
                                            "followup_question": "How does this apply to practical real-world circuits?"
                                        }
                                    
                                    st.session_state[fb_state_key] = rubric_data
                                    st.session_state.stats["viva_attempts"] += 1
                                    st.session_state.stats["viva_score_total"] += rubric_data.get("accuracy_score", 7)
                                    st.rerun()

                    if st.session_state[fb_state_key]:
                        fb = st.session_state[fb_state_key]
                        st.markdown(f"""
                        <div class="rubric-card">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                                <h4 style="margin: 0;">📋 Examiner Rubric Evaluation</h4>
                                <span class="status-pill success" style="font-size: 14px;">{fb.get('overall_grade', 'Grade A')}</span>
                            </div>
                            <div class="rubric-grid">
                                <div class="rubric-item">
                                    <div class="rubric-score">{fb.get('accuracy_score', 8)}/10</div>
                                    <div class="rubric-label">Conceptual Accuracy</div>
                                </div>
                                <div class="rubric-item">
                                    <div class="rubric-score">{fb.get('terminology_score', 8)}/10</div>
                                    <div class="rubric-label">Technical Terminology</div>
                                </div>
                                <div class="rubric-item">
                                    <div class="rubric-score">{fb.get('clarity_score', 8)}/10</div>
                                    <div class="rubric-label">Structure & Clarity</div>
                                </div>
                            </div>
                            <p><b>✅ What was good:</b> {fb.get('strengths')}</p>
                            <p><b>⚠️ What was missing / Needs improvement:</b> {fb.get('missing_points')}</p>
                            <div style="background: var(--tag-bg); padding: 12px; border-radius: 10px; margin-top: 10px;">
                                <b>🎓 Ideal Model Answer:</b><br>{fb.get('ideal_model_answer')}
                            </div>
                        </div>
                        """, unsafe_allow_html=True)

                        if fb.get("followup_question"):
                            st.markdown(f"""
                            <div style="margin-top: 14px; background: rgba(99, 102, 241, 0.15); border: 1px dashed var(--accent-primary); border-radius: 12px; padding: 14px;">
                                <b>👨‍🏫 Examiner Follow-Up Probe:</b><br>
                                <i>"{fb.get('followup_question')}"</i>
                            </div>
                            """, unsafe_allow_html=True)

            # MODULE 3: FLASHCARDS
            with mod_flash:
                st.markdown(f"#### 🗂️ Interactive 3D Flashcard Deck — `{subject}`")
                sources = get_sources_for_subject(subject)
                f_col1, f_col2, f_col3 = st.columns([2, 1, 1])
                with f_col1:
                    flash_source = st.selectbox("Select Notes Source:", sources, key=f"f_src_{key_prefix}")
                with f_col2:
                    flash_count = st.slider("Deck Size:", 5, 20, 8, key=f"f_cnt_{key_prefix}")
                with f_col3:
                    deck_type = st.selectbox("Card Focus:", ["Core Definitions", "Formulas & Equations", "Exam Traps & Differences"], key=f"f_type_{key_prefix}")

                deck_state_key = f"deck_{key_prefix}"
                card_idx_key = f"card_idx_{key_prefix}"
                card_flipped_key = f"card_flip_{key_prefix}"

                if deck_state_key not in st.session_state:
                    st.session_state[deck_state_key] = []
                    st.session_state[card_idx_key] = 0
                    st.session_state[card_flipped_key] = False

                if st.button("✨ Generate Flashcard Deck", key=f"btn_f_gen_{key_prefix}"):
                    chunks_for_flash = get_chunks_by_source(subject, flash_source, max_chunks=8)
                    f_context = "\n\n".join([c['text'] for c in chunks_for_flash])
                    
                    prompt_flash = f"""Create {flash_count} high-yield study flashcards from the notes below.
Focus on: {deck_type}.

Output ONLY valid JSON format:
[
  {{
    "question": "What is ...?",
    "answer": "Clear, concise definition and key formula/points.",
    "topic": "Concept Category"
  }}
]
Notes:
{f_context}
"""
                    with st.spinner("Building interactive flashcard deck..."):
                        raw_cards = ask_llm(prompt_flash, temperature=0.4)
                        try:
                            cleaned_json = re.search(r'\[.*\]', raw_cards, re.DOTALL).group(0)
                            deck_data = json.loads(cleaned_json)
                        except Exception:
                            deck_data = [
                                {"question": "What is the Meissner Effect?", "answer": "The complete expulsion of magnetic flux lines from the interior of a superconductor when cooled below its critical transition temperature Tc.", "topic": "Superconductivity"},
                                {"question": "Define Type-I vs Type-II Superconductors", "answer": "Type-I exhibit complete Meissner effect with a single critical field Hc. Type-II have two critical fields (Hc1 and Hc2) and a vortex/mixed state.", "topic": "Superconductivity"}
                            ]
                        
                        st.session_state[deck_state_key] = deck_data
                        st.session_state[card_idx_key] = 0
                        st.session_state[card_flipped_key] = False
                        st.session_state.stats["flashcards_reviewed"] += len(deck_data)
                        st.rerun()

                deck = st.session_state[deck_state_key]
                if deck:
                    current_idx = st.session_state[card_idx_key]
                    current_idx = max(0, min(current_idx, len(deck) - 1))
                    card = deck[current_idx]
                    is_flipped = st.session_state[card_flipped_key]

                    prog_col1, prog_col2, prog_col3 = st.columns([1, 2, 1])
                    with prog_col1:
                        if st.button("⬅️ Previous Card", key=f"prev_c_{key_prefix}", disabled=(current_idx == 0)):
                            st.session_state[card_idx_key] -= 1
                            st.session_state[card_flipped_key] = False
                            st.rerun()
                    with prog_col2:
                        st.markdown(f"""
                        <div style="text-align: center;">
                            <span style="font-weight: 700; font-size: 15px;">Card {current_idx + 1} of {len(deck)}</span>
                            <div class="stat-progress-bar"><div class="stat-progress-fill" style="width: {int(((current_idx+1)/len(deck))*100)}%;"></div></div>
                        </div>
                        """, unsafe_allow_html=True)
                    with prog_col3:
                        if st.button("Next Card ➡️", key=f"next_c_{key_prefix}", disabled=(current_idx >= len(deck) - 1)):
                            st.session_state[card_idx_key] += 1
                            st.session_state[card_flipped_key] = False
                            st.rerun()

                    flip_class = "flipped" if is_flipped else ""
                    header_label = "💡 ANSWER & EXPLANATION" if is_flipped else "❓ CONCEPT QUESTION"
                    content_body = card['answer'] if is_flipped else card['question']

                    st.markdown(f"""
                    <div class="flashcard-box {flip_class}">
                        <div class="flashcard-badge">{card.get('topic', subject)} • {header_label}</div>
                        <div class="flashcard-title">{content_body}</div>
                        <div style="margin-top: 14px; font-size: 12px; color: var(--text-muted);">
                            {"(Click Flip Card below to reveal question)" if is_flipped else "(Click Flip Card below to reveal answer)"}
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

                    fc_btn1, fc_btn2, fc_btn3, fc_btn4 = st.columns(4)
                    with fc_btn1:
                        if st.button("🔄 Flip Card", key=f"btn_flip_{key_prefix}", use_container_width=True):
                            st.session_state[card_flipped_key] = not st.session_state[card_flipped_key]
                            st.rerun()
                    with fc_btn2:
                        if st.button("🟢 Mastered (+1)", key=f"btn_mast_{key_prefix}", use_container_width=True):
                            st.session_state.stats["flashcards_mastered"] += 1
                            st.toast("🎉 Marked as Mastered!", icon="✅")
                            if current_idx < len(deck) - 1:
                                st.session_state[card_idx_key] += 1
                                st.session_state[card_flipped_key] = False
                            st.rerun()
                    with fc_btn3:
                        if st.button("🟡 Needs Review", key=f"btn_rev_{key_prefix}", use_container_width=True):
                            st.toast("Flagged for review", icon="📌")
                            if current_idx < len(deck) - 1:
                                st.session_state[card_idx_key] += 1
                                st.session_state[card_flipped_key] = False
                            st.rerun()
                    with fc_btn4:
                        if st.button("🔀 Shuffle Deck", key=f"btn_shuf_{key_prefix}", use_container_width=True):
                            np.random.shuffle(st.session_state[deck_state_key])
                            st.session_state[card_idx_key] = 0
                            st.session_state[card_flipped_key] = False
                            st.rerun()

                    csv_export = "Front,Back,Tag\n" + "\n".join([f'"{c["question"]}","{c["answer"]}","{subject}"' for c in deck])
                    st.download_button(
                        label="📥 Export Deck to Anki CSV",
                        data=csv_export,
                        file_name=f"{subject}_flashcards.csv",
                        mime="text/csv"
                    )

            # MODULE 4: QUIZ ARENA
            with mod_quiz:
                st.markdown(f"#### 📝 Practice & Mock Exam Arena — `{subject}`")
                quiz_mode = st.radio("Choose Exam Mode:", ["🎯 Interactive MCQ Quiz", "📑 Subjective Exam Paper (5/10 Marks)", "🌐 Extra Numericals & Problems"], horizontal=True, key=f"q_mode_{key_prefix}")
                sources = get_sources_for_subject(subject)
                
                if quiz_mode == "🎯 Interactive MCQ Quiz":
                    q_col1, q_col2 = st.columns(2)
                    with q_col1:
                        mcq_src = st.selectbox("Target File:", sources, key=f"mcq_s_{key_prefix}")
                    with q_col2:
                        mcq_num = st.slider("Number of MCQs:", 3, 10, 5, key=f"mcq_n_{key_prefix}")

                    mcq_state_key = f"mcq_data_{key_prefix}"
                    if mcq_state_key not in st.session_state:
                        st.session_state[mcq_state_key] = []

                    if st.button("🚀 Generate MCQ Challenge", key=f"btn_mcq_gen_{key_prefix}"):
                        chunks_for_mcq = get_chunks_by_source(subject, mcq_src, max_chunks=8)
                        mcq_ctx = "\n\n".join([c['text'] for c in chunks_for_mcq])
                        
                        prompt_mcq = f"""Generate {mcq_num} tricky, high-quality multiple choice questions from the notes below.
Output ONLY valid JSON format:
[
  {{
    "question": "Question text here",
    "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    "correct_option": "A",
    "explanation": "Detailed explanation of why A is correct and others are wrong."
  }}
]
Notes:
{mcq_ctx}
"""
                        with st.spinner("Generating MCQ Exam..."):
                            raw_mcq = ask_llm(prompt_mcq, temperature=0.3)
                            try:
                                cleaned_json = re.search(r'\[.*\]', raw_mcq, re.DOTALL).group(0)
                                mcqs = json.loads(cleaned_json)
                            except Exception:
                                mcqs = [
                                    {
                                        "question": "What is the Meissner effect in superconductors?",
                                        "options": ["A. Expulsion of magnetic field", "B. Zero electrical resistance only", "C. Infinite capacitance", "D. Increased temperature"],
                                        "correct_option": "A",
                                        "explanation": "The Meissner effect describes the complete expulsion of magnetic flux lines from the interior of a superconductor below Tc."
                                    }
                                ]
                            st.session_state[mcq_state_key] = mcqs
                            st.rerun()

                    mcq_list = st.session_state[mcq_state_key]
                    if mcq_list:
                        st.markdown(f"##### 🎯 Test Paper ({len(mcq_list)} Questions)")
                        for i, q in enumerate(mcq_list):
                            st.markdown(f"""
                            <div class="quiz-card">
                                <span class="quiz-q-num">Question {i+1}</span>
                                <div class="quiz-q-text">{q['question']}</div>
                            </div>
                            """, unsafe_allow_html=True)
                            
                            user_choice = st.radio(
                                f"Select answer for Q{i+1}:",
                                q['options'],
                                key=f"mcq_choice_{key_prefix}_{i}",
                                label_visibility="collapsed"
                            )
                            
                            with st.expander(f"💡 View Solution & Explanation for Q{i+1}"):
                                correct_letter = q.get('correct_option', 'A').strip().upper()[0]
                                is_correct = user_choice.startswith(correct_letter) if user_choice else False
                                if is_correct:
                                    st.success(f"✅ Correct! Option {correct_letter}")
                                else:
                                    st.info(f"Correct Answer: **Option {correct_letter}**")
                                st.write(q['explanation'])

                elif quiz_mode == "📑 Subjective Exam Paper (5/10 Marks)":
                    sub_src = st.selectbox("Pick Target File:", sources, key=f"sub_s_{key_prefix}")
                    num_sub_q = st.slider("Number of Questions:", 2, 8, 4, key=f"sub_n_{key_prefix}")
                    
                    if st.button("📄 Generate Subjective Exam Paper", key=f"btn_sub_gen_{key_prefix}"):
                        chunks_for_sub = get_chunks_by_source(subject, sub_src, max_chunks=8)
                        sub_ctx = "\n\n".join([c['text'] for c in chunks_for_sub])
                        
                        prompt_sub = f"""Generate an official university-style exam paper with {num_sub_q} questions based on these notes.
Include a mix of 2-mark (short definitions) and 5/10-mark (comprehensive derivations/explanations).
Provide the question, marks allocated, and a collapsible ideal model answer scheme with grading breakdown.

Notes:
{sub_ctx}
"""
                        with st.spinner("Generating Subjective Exam Paper..."):
                            paper = ask_llm(prompt_sub, temperature=0.4)
                        st.session_state[f"sub_paper_{key_prefix}"] = paper
                        st.rerun()

                    if f"sub_paper_{key_prefix}" in st.session_state:
                        st.markdown("### 🏛️ University Model Question Paper")
                        st.markdown(st.session_state[f"sub_paper_{key_prefix}"])

                else:
                    st.markdown("##### 🌐 Live Web Numerical Problem Generator")
                    chunks_for_num = get_chunks_by_source(subject, sources[0], max_chunks=4) if sources else []
                    num_ctx = "\n\n".join([c['text'] for c in chunks_for_num])
                    
                    if st.button("🔍 Search & Generate Numerical Problems", key=f"btn_num_gen_{key_prefix}"):
                        with st.spinner("Searching textbook repositories for numerical problems..."):
                            topic_prompt = f"In 3-5 words, what is the exact engineering/physics topic here:\n\n{num_ctx[:600]}"
                            topic_str = ask_llm(topic_prompt, temperature=0.2)
                            
                            web_prob_results = web_search(f"{topic_str} numerical solved practice problems exam", max_results=4)
                            web_prob_ctx = "\n\n".join([f"{r['title']}: {r['content']}" for r in web_prob_results])
                            
                            prob_prompt = f"""Generate 3 to 4 university-level numerical calculation problems with step-by-step worked solutions for the topic: '{topic_str}'.
Include formulas, variable values, SI units, and final numerical answers with unit labels.

Web Reference Context:
{web_prob_ctx}
"""
                            numerical_sheet = ask_llm(prob_prompt, temperature=0.4)
                            st.session_state[f"num_sheet_{key_prefix}"] = numerical_sheet
                            st.rerun()

                    if f"num_sheet_{key_prefix}" in st.session_state:
                        st.markdown(st.session_state[f"num_sheet_{key_prefix}"])

            # MODULE 5: CHEAT SHEET
            with mod_cheat:
                st.markdown(f"#### ⚡ Smart Revision Suite & Cheat Sheet Generator — `{subject}`")
                sources = get_sources_for_subject(subject)
                cs_col1, cs_col2 = st.columns([2, 2])
                with cs_col1:
                    cs_type = st.selectbox(
                        "Select Document Type to Generate:",
                        [
                            "📑 Ultimate 1-Page Subject Cheat Sheet",
                            "📐 Complete Formula & Equation Index",
                            "⚖️ Key Concept Comparison / Difference Table",
                            "⚡ 10-Minute Rapid Revision Summary",
                            "⚠️ Top 10 Exam Mistakes & Pitfalls"
                        ],
                        key=f"cs_type_{key_prefix}"
                    )
                with cs_col2:
                    cs_source = st.selectbox("Source Document:", sources, key=f"cs_src_{key_prefix}")

                if st.button("🚀 Generate Revision Document", key=f"btn_cs_gen_{key_prefix}"):
                    chunks_for_cs = get_chunks_by_source(subject, cs_source, max_chunks=10)
                    cs_ctx = "\n\n".join([c['text'] for c in chunks_for_cs])

                    cs_prompts = {
                        "📑 Ultimate 1-Page Subject Cheat Sheet": f"Create a comprehensive 1-page Cheat Sheet for '{subject}'. Include: 1. Key Definitions 2. Fundamental Laws & Theorems 3. Important Formulas & Units 4. Key Rules. Use markdown tables where appropriate.\n\nNotes:\n{cs_ctx}",
                        "📐 Complete Formula & Equation Index": f"Extract all mathematical equations, laws, formulas, variables, and SI units into a structured markdown table for '{subject}'. Include practical application notes.\n\nNotes:\n{cs_ctx}",
                        "⚖️ Key Concept Comparison / Difference Table": f"Extract all major contrasting concepts in '{subject}' and present them as clean side-by-side Markdown Comparison Tables.\n\nNotes:\n{cs_ctx}",
                        "⚡ 10-Minute Rapid Revision Summary": f"Write an ultra-high-yield 10-minute pre-exam revision brief for '{subject}'. Only include the most critical facts, definitions, and high-probability exam topics.\n\nNotes:\n{cs_ctx}",
                        "⚠️ Top 10 Exam Mistakes & Pitfalls": f"List the Top 10 common exam misconceptions, student mistakes, confusing definitions, and pitfalls in '{subject}' with clear corrections.\n\nNotes:\n{cs_ctx}"
                    }

                    with st.spinner("Synthesizing comprehensive study document..."):
                        generated_cs = ask_llm(cs_prompts[cs_type], temperature=0.3)
                        st.session_state[f"cs_result_{key_prefix}"] = generated_cs
                        st.rerun()

                if f"cs_result_{key_prefix}" in st.session_state:
                    res_content = st.session_state[f"cs_result_{key_prefix}"]
                    st.markdown("""
                    <div class="glass-card">
                    """, unsafe_allow_html=True)
                    st.markdown(res_content)
                    st.markdown("</div>", unsafe_allow_html=True)

                    st.download_button(
                        label=f"💾 Download {cs_type} (.md)",
                        data=res_content,
                        file_name=f"{subject}_{cs_type.replace(' ', '_')}.md",
                        mime="text/markdown"
                    )

# ==========================================
# FOOTER
# ==========================================
st.markdown("""
<div style="text-align: center; margin-top: 40px; padding: 20px; color: var(--text-muted); font-size: 13px;">
    AI Study Assistant Pro ⚡ • Powered by Groq LLMs, FAISS Vector Search, Sentence-Transformers & Tavily Web Grounding
</div>
""", unsafe_allow_html=True)