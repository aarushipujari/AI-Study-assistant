const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

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

export interface DiagramData {
  title: string;
  mermaid_code: string;
  drawing_steps: string[];
  labels_checklist: string[];
  color_coding_guide: string[];
  high_yield_mnemonics: string;
  clinical_correlation: string;
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.json();
  },

  async getDiagram(params: {
    subject: string;
    topic: string;
    diagram_type?: string;
  }): Promise<DiagramData> {
    const res = await fetch(`${API_BASE}/api/diagrams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Diagram API error');
    return res.json();
  },

  async getSubjects(): Promise<{ subjects: SubjectInfo[] }> {
    const res = await fetch(`${API_BASE}/api/subjects`);
    if (!res.ok) throw new Error('Failed to fetch subjects');
    return res.json();
  },

  async deleteSubject(name: string): Promise<{ message: string; remaining_chunks: number }> {
    const res = await fetch(`${API_BASE}/api/subjects?name=${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete subject');
    return res.json();
  },

  async uploadNotes(subject: string, files: File[]) {
    const formData = new FormData();
    formData.append('subject', subject);
    files.forEach((f) => formData.append('files', f));

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => 'Upload failed');
      throw new Error(`Upload error (${res.status}): ${errText}`);
    }
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
    if (!res.ok) throw new Error('Chat API error');
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
    if (!res.ok) throw new Error('Viva question API error');
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
    if (!res.ok) throw new Error('Viva evaluation API error');
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
    if (!res.ok) throw new Error('Flashcard API error');
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
    if (!res.ok) throw new Error('Quiz MCQ API error');
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
    if (!res.ok) throw new Error('CheatSheet API error');
    return res.json();
  },
};
