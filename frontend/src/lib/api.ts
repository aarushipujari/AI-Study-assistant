const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SubjectInfo {
  name: string;
  chunk_count: number;
  sources: string[];
}

export interface ChatResponse {
  notes_answer: string;
  web_answer: string;
  citations: { source: string; score: number; snippet: string }[];
  web_sources: { title?: string; url?: string }[];
  suggested_followups: string[];
}

export interface VivaEvaluation {
  accuracy_score: number;
  terminology_score: number;
  clarity_score: number;
  overall_grade: string;
  strengths: string;
  missing_points: string;
  ideal_model_answer: string;
  followup_question: string;
}

export interface Flashcard {
  question: string;
  answer: string;
  topic?: string;
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correct_option: string;
  explanation: string;
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getSubjects(): Promise<{ subjects: SubjectInfo[] }> {
    try {
      const res = await fetch(`${API_BASE}/api/subjects`);
      if (!res.ok) return { subjects: [] };
      return res.json();
    } catch {
      return { subjects: [] };
    }
  },

  async uploadNotes(subject: string, files: File[]) {
    const formData = new FormData();
    formData.append('subject', subject);
    files.forEach((f) => formData.append('files', f));

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async sendChat(params: {
    subject: string;
    query: string;
    framing_style?: string;
    top_k?: number;
    model?: string;
  }): Promise<ChatResponse> {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async getVivaQuestion(params: {
    subject: string;
    source_file: string;
    persona?: string;
    difficulty?: string;
  }): Promise<{ question: string }> {
    const res = await fetch(`${API_BASE}/api/viva/question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async evaluateViva(params: {
    subject: string;
    source_file: string;
    question: string;
    student_answer: string;
    persona?: string;
  }): Promise<VivaEvaluation> {
    const res = await fetch(`${API_BASE}/api/viva/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async getFlashcards(params: {
    subject: string;
    source_file: string;
    count?: number;
    focus?: string;
  }): Promise<{ flashcards: Flashcard[] }> {
    const res = await fetch(`${API_BASE}/api/flashcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async getMCQs(params: {
    subject: string;
    source_file: string;
    num_questions?: number;
  }): Promise<{ questions: MCQQuestion[] }> {
    const res = await fetch(`${API_BASE}/api/quiz/mcq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  async getCheatSheet(params: {
    subject: string;
    source_file: string;
    doc_type: string;
  }): Promise<{ content: string }> {
    const res = await fetch(`${API_BASE}/api/cheatsheet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },
};
