'use client';

import React, { useState } from 'react';
import { api, MCQQuestion } from '@/lib/api';
import { HelpCircle, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface QuizTabProps {
  subject: string;
  sources: string[];
}

export function QuizTab({ subject, sources }: QuizTabProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0] || '');
  const [numQuestions, setNumQuestions] = useState(5);
  const [mcqs, setMcqs] = useState<MCQQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  const handleGenerateMCQs = async () => {
    if (!selectedSource) return;
    setLoading(true);
    setUserAnswers({});
    setShowExplanations({});

    try {
      const res = await api.getMCQs({
        subject,
        source_file: selectedSource,
        num_questions: numQuestions,
      });
      setMcqs(res.questions || []);
    } catch {
      alert('Error generating MCQ challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, optionLetter: string) => {
    setUserAnswers((prev) => ({ ...prev, [qIdx]: optionLetter }));
    setShowExplanations((prev) => ({ ...prev, [qIdx]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-panel rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="text-amber-400" size={20} />
          <h3 className="text-lg font-bold text-white">Interactive Practice & Mock Quiz Arena</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Document</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Number of MCQs: {numQuestions}
            </label>
            <input
              type="range"
              min={3}
              max={10}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full mt-2 accent-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateMCQs}
          disabled={loading || !selectedSource}
          className="gradient-btn text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          🚀 Generate MCQ Exam Challenge
        </button>
      </div>

      {/* MCQs List */}
      {mcqs.length > 0 && (
        <div className="space-y-4">
          {mcqs.map((q, i) => {
            const selected = userAnswers[i];
            const correctLetter = q.correct_option?.trim().toUpperCase()[0] || 'A';
            const isAnswered = selected !== undefined;
            const isCorrect = isAnswered && selected.startsWith(correctLetter);

            return (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 border-l-4 border-l-indigo-500 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Question {i + 1}
                  </span>
                  {isAnswered && (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white">{q.question}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const optLetter = opt.trim()[0];
                    const isOptionSelected = selected === opt;
                    const isOptionCorrect = opt.startsWith(correctLetter);

                    let btnStyle = 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-700';
                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(i, opt)}
                        className={`text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        )}
                        {isAnswered && isOptionSelected && !isCorrect && (
                          <XCircle size={15} className="text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanations[i] && (
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                    <strong className="text-indigo-300 block">💡 Detailed Explanation:</strong>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
