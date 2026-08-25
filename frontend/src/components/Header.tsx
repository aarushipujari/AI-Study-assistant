'use client';

import React from 'react';
import { Sparkles, Upload, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  subjectsCount: number;
  chunksCount: number;
  onOpenUpload: () => void;
}

export function Header({ subjectsCount, chunksCount, onOpenUpload }: HeaderProps) {
  return (
    <header className="glass-panel rounded-2xl p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <h1 className="text-2xl md:text-3xl font-extrabold gradient-text">
              AI Study Assistant Pro
            </h1>
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-500/30">
              v2.0 SaaS
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Grounded Dual-Stream RAG • Oral Viva Examiner • 3D Active Recall Decks • Exam Simulator
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <CheckCircle2 size={13} /> RAG Vector Engine Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              <BookOpen size={13} /> {subjectsCount} Subject(s)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
              <Layers size={13} /> {chunksCount} Chunks Indexed
            </span>
          </div>
        </div>

        <button
          onClick={onOpenUpload}
          className="gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Upload size={16} /> Upload Notes (PDF)
        </button>
      </div>
    </header>
  );
}
