'use client';

import React from 'react';
import { Terminal, Mic, ShieldCheck, Timer } from 'lucide-react';

interface StatCardsProps {
  questionsAsked: number;
  vivaScore: number;
  vivaTotal: number;
  flashcardsMastered: number;
  flashcardsTotal: number;
  studyMinutes: number;
}

export function StatCards({
  questionsAsked,
  vivaScore,
  vivaTotal,
  flashcardsMastered,
  flashcardsTotal,
  studyMinutes,
}: StatCardsProps) {
  const vivaPct = vivaTotal > 0 ? Math.round((vivaScore / vivaTotal) * 100) : 0;
  const flashPct = flashcardsTotal > 0 ? Math.round((flashcardsMastered / flashcardsTotal) * 100) : 0;
  const questionsPct = Math.min(100, questionsAsked * 10);
  const timePct = Math.min(100, Math.round((studyMinutes / 60) * 100));

  const cards = [
    {
      icon: <Terminal className="text-indigo-400" size={18} />,
      badge: 'ACTIVE',
      value: questionsAsked,
      label: 'Questions Solved',
      barPct: questionsPct,
    },
    {
      icon: <Mic className="text-indigo-400" size={18} />,
      badge: `${vivaPct}% READY`,
      value: vivaTotal > 0 ? `${vivaScore}/${vivaTotal}` : '0/0',
      subVal: 'pts',
      label: 'Viva Score',
      barPct: vivaPct,
    },
    {
      icon: <ShieldCheck className="text-indigo-400" size={18} />,
      badge: `${flashPct}% MEMORY`,
      value: flashcardsTotal > 0 ? `${flashcardsMastered}/${flashcardsTotal}` : '0/0',
      label: 'Flashcards Mastered',
      barPct: flashPct,
    },
    {
      icon: <Timer className="text-indigo-400" size={18} />,
      badge: 'LOGGED',
      value: studyMinutes,
      subVal: 'mins',
      label: 'Focus Time',
      barPct: timePct,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="vault-panel rounded-2xl p-4 relative overflow-hidden transition hover:border-white/20"
        >
          <div className="flex items-center justify-between mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              {c.icon}
            </div>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/[0.08]">
              {c.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-white font-mono tracking-tight">{c.value}</span>
            {c.subVal && <span className="text-xs font-mono text-slate-400">{c.subVal}</span>}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{c.label}</p>

          <div className="w-full bg-slate-900 rounded-full h-1 mt-3 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${c.barPct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
