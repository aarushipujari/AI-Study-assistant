'use client';

import React, { useState } from 'react';
import { api, ChatResponse } from '@/lib/api';
import { Send, BookOpen, Globe, Sparkles, Download, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatTabProps {
  subject: string;
}

interface Message {
  role: 'user' | 'assistant';
  content?: string;
  data?: ChatResponse;
}

export function ChatTab({ subject }: ChatTabProps) {
  const [framingStyle, setFramingStyle] = useState('Exam Standard (5/10 Mark Format)');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am your AI study partner for **${subject.toUpperCase()}**. Ask me any question from your lecture slides or select a quick prompt below.`,
    },
  ]);

  const quickPrompts = [
    `Summarize core concepts in ${subject}`,
    `Top common exam mistakes & traps in ${subject}`,
    `List key formulas, derivations & SI units in ${subject}`,
    `Give a standard 5-mark exam question with ideal answer in ${subject}`,
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim() || loading) return;

    setQuery('');
    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setLoading(true);

    try {
      const res = await api.sendChat({
        subject,
        query: q,
        framing_style: framingStyle,
      });
      setMessages((prev) => [...prev, { role: 'assistant', data: res }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Failed to connect to the backend. Please verify the FastAPI backend is running.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const text = messages
      .map((m) =>
        m.role === 'user'
          ? `### 🧑‍🎓 Student:\n${m.content}\n`
          : `### ⚡ Assistant:\n${m.content || m.data?.notes_answer || ''}\n`
      )
      .join('\n---\n');

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}_revision_notes.md`;
    a.click();
  };

  return (
    <div className="space-y-5">
      {/* Framing Controls & Export */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-300">Framing Style:</span>
          {[
            'Exam Standard (5/10 Mark Format)',
            'Feynman Technique (Intuitive & Simple)',
            'High-Yield Bullet Points',
            'Step-by-Step Derivation / Formulas',
          ].map((style) => (
            <button
              key={style}
              onClick={() => setFramingStyle(style)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                framingStyle === style
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {style.split(' ')[0]} {style.split(' ')[1]}
            </button>
          ))}
        </div>

        <button
          onClick={handleExport}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
        >
          <Download size={14} /> Export Sheet (.md)
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition transform hover:-translate-y-0.5"
          >
            ⚡ {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4 min-h-[350px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl ${
              m.role === 'user'
                ? 'bg-slate-800/90 border border-slate-700/80 ml-auto max-w-2xl'
                : 'glass-panel border border-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-slate-200">
                {m.role === 'user' ? '🧑‍🎓 You' : '⚡ AI Study Partner'}
              </span>
            </div>

            {m.content && (
              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            )}

            {m.data && (
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Notes Grounding */}
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <BookOpen size={14} /> From Course Notes
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                        {m.data.citations.length} Citations
                      </span>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-200 text-xs leading-relaxed">
                      <ReactMarkdown>{m.data.notes_answer}</ReactMarkdown>
                    </div>

                    {m.data.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-indigo-500/20">
                        <span className="text-[11px] font-bold text-slate-400">Cited Sources:</span>
                        <div className="space-y-1 mt-1">
                          {m.data.citations.map((c, idx) => (
                            <div key={idx} className="text-[11px] text-slate-400">
                              📄 <span className="text-slate-300 font-semibold">{c.source}</span> ({c.score}% Match)
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Web Grounding */}
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Globe size={14} /> Live Web & Textbook Context
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                        Verified
                      </span>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-200 text-xs leading-relaxed">
                      <ReactMarkdown>{m.data.web_answer}</ReactMarkdown>
                    </div>

                    {m.data.web_sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-cyan-500/20">
                        <span className="text-[11px] font-bold text-slate-400">External References:</span>
                        <div className="space-y-1 mt-1">
                          {m.data.web_sources.map((w, idx) => (
                            <a
                              key={idx}
                              href={w.url}
                              target="_blank"
                              rel="noreferrer"
                              className="block text-[11px] text-cyan-400 hover:underline truncate"
                            >
                              🔗 {w.title || w.url}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up suggestions */}
                {m.data.suggested_followups.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-2">
                      <Sparkles size={13} className="text-amber-400" /> Suggested Next Questions:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {m.data.suggested_followups.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/70 hover:bg-slate-600 text-slate-200 font-medium transition"
                        >
                          👉 {fu}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-slate-300 text-sm">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span>Analyzing course notes and verifying live web sources...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="glass-panel p-2 rounded-2xl flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask any concept or exam question from ${subject}...`}
          className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !query.trim()}
          className="gradient-btn px-4 py-2.5 rounded-xl text-white font-semibold flex items-center gap-1.5 disabled:opacity-50"
        >
          <Send size={15} /> Send
        </button>
      </div>
    </div>
  );
}
