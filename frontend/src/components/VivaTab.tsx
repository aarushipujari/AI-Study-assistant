'use client';

import React, { useState } from 'react';
import { api, VivaEvaluation } from '@/lib/api';
import { Mic, Award, CheckCircle, AlertTriangle, Sparkles, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface VivaTabProps {
  subject: string;
  sources: string[];
}

export function VivaTab({ subject, sources }: VivaTabProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0] || '');
  const [persona, setPersona] = useState('Dr. Harrison (Strict External Examiner)');
  const [difficulty, setDifficulty] = useState('Standard University');
  const [question, setQuestion] = useState<string | null>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<VivaEvaluation | null>(null);

  const handleGenerateQuestion = async () => {
    if (!selectedSource) return;
    setLoading(true);
    setQuestion(null);
    setEvaluation(null);
    setStudentAnswer('');

    try {
      const res = await api.getVivaQuestion({
        subject,
        source_file: selectedSource,
        persona,
        difficulty,
      });
      setQuestion(res.question);
    } catch {
      alert('Error fetching viva question');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!question || !studentAnswer.trim()) return;
    setLoading(true);

    try {
      const res = await api.evaluateViva({
        subject,
        source_file: selectedSource,
        question,
        student_answer: studentAnswer,
        persona,
      });
      setEvaluation(res);
    } catch {
      alert('Error evaluating viva answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="glass-panel rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="text-emerald-400" size={20} />
          <h3 className="text-lg font-bold text-white">Oral Viva Examination Simulator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Document / File</label>
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
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Examiner Persona</label>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              <option>Dr. Harrison (Strict External Examiner)</option>
              <option>Prof. Elena (Supportive Mentor)</option>
              <option>Chief Engineer (Practical Application Focus)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              <option>Standard University</option>
              <option>Challenging / Deep Conceptual</option>
              <option>Edge Cases & Numericals</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateQuestion}
          disabled={loading || !selectedSource}
          className="gradient-btn text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          🎲 Generate Oral Question
        </button>
      </div>

      {/* Active Question Box */}
      {question && (
        <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-indigo-500 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Examiner Question ({persona.split(' ')[0]})
          </span>
          <h4 className="text-lg font-bold text-white">{question}</h4>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-300">
              Your Oral Answer (Type how you would respond out loud):
            </label>
            <textarea
              rows={4}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="State your clear conceptual answer with definitions, laws, or formulas..."
              className="w-full bg-slate-800/90 border border-slate-700 text-slate-200 text-sm rounded-xl p-3.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={loading || !studentAnswer.trim()}
            className="gradient-btn text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            <Award size={15} /> Submit for Examiner Evaluation
          </button>
        </div>
      )}

      {/* Rubric Evaluation Result */}
      {evaluation && (
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="text-emerald-400" size={18} /> Official Examiner Rubric Evaluation
            </h4>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {evaluation.overall_grade}
            </span>
          </div>

          {/* 3 Metric Score Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-indigo-400">
                {evaluation.accuracy_score}/10
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Conceptual Accuracy</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-purple-400">
                {evaluation.terminology_score}/10
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Technical Terminology</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <span className="text-2xl font-black text-cyan-400">
                {evaluation.clarity_score}/10
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Clarity & Communication</p>
            </div>
          </div>

          {/* Feedback Points */}
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-emerald-300">
              <CheckCircle size={16} className="mt-0.5 shrink-0" />
              <span>
                <strong className="text-white">Strengths:</strong> {evaluation.strengths}
              </span>
            </div>
            <div className="flex items-start gap-2 text-amber-300">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>
                <strong className="text-white">Missing Elements:</strong> {evaluation.missing_points}
              </span>
            </div>
          </div>

          {/* Ideal Model Answer */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
            <span className="text-xs font-bold text-indigo-300">🎓 Ideal Examiner Model Answer:</span>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{evaluation.ideal_model_answer}</p>
          </div>

          {/* Adaptive Follow-up Probe */}
          {evaluation.followup_question && (
            <div className="p-4 rounded-xl bg-slate-800/70 border border-dashed border-indigo-400">
              <span className="text-xs font-bold text-purple-300">👨‍🏫 Examiner Follow-Up Question:</span>
              <p className="text-sm font-semibold text-white mt-1 italic">
                &ldquo;{evaluation.followup_question}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
