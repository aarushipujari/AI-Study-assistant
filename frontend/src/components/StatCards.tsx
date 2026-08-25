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
  const vivaPct = vivaTotal > 0 ? Math.round((vivaScore / vivaTotal) * 100) : 88;
  const flashPct = flashcardsTotal > 0 ? Math.round((flashcardsMastered / flashcardsTotal) * 100) : 80;

  const cards = [
    {
      icon: <Terminal className="text-cyan-400" size={20} />,
      badge: 'LIVE PROTOCOL',
      badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      value: questionsAsked,
      label: 'Questions Decoded',
      barColor: 'from-cyan-500 to-blue-600',
      barPct: 85,
    },
    {
      icon: <Mic className="text-emerald-400" size={20} />,
      badge: `${vivaPct}% EXAM READINESS`,
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      value: `${vivaScore}/${vivaTotal}`,
      subVal: 'pts',
      label: 'Viva Voce Score',
      barColor: 'from-emerald-500 to-teal-500',
      barPct: vivaPct,
    },
    {
      icon: <ShieldCheck className="text-purple-400" size={20} />,
      badge: `${flashPct}% RETENTION`,
      badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      value: `${flashcardsMastered}/${flashcardsTotal}`,
      label: 'Flashcards Mastered',
      barColor: 'from-purple-500 to-pink-500',
      barPct: flashPct,
    },
    {
      icon: <Timer className="text-amber-400" size={20} />,
      badge: 'FOCUS MATRIX',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      value: studyMinutes,
      subVal: 'mins',
      label: 'Deep Focus Logged',
      barColor: 'from-amber-500 to-orange-500',
      barPct: 70,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="vault-panel vault-panel-glow rounded-3xl p-5 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shadow-inner">
              {c.icon}
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${c.badgeClass}`}
            >
              {c.badge}
            </span>
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-white font-mono tracking-tight">{c.value}</span>
            {c.subVal && <span className="text-xs font-mono text-slate-400 font-semibold">{c.subVal}</span>}
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider font-mono">{c.label}</p>

          <div className="w-full bg-slate-900 rounded-full h-1.5 mt-3.5 overflow-hidden border border-slate-800">
            <div
              className={`h-full bg-gradient-to-r ${c.barColor} rounded-full transition-all duration-500 shadow-sm`}
              style={{ width: `${c.barPct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
