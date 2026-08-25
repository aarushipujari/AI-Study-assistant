'use client';

import React from 'react';
import { MessageSquare, Mic, Layers, Clock } from 'lucide-react';

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
  const vivaPct = vivaTotal > 0 ? Math.round((vivaScore / vivaTotal) * 100) : 85;
  const flashPct = flashcardsTotal > 0 ? Math.round((flashcardsMastered / flashcardsTotal) * 100) : 75;

  const cards = [
    {
      icon: <MessageSquare className="text-indigo-400" size={20} />,
      badge: 'SESSION',
      badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20',
      value: questionsAsked,
      label: 'Questions Solved',
      barPct: 80,
    },
    {
      icon: <Mic className="text-emerald-400" size={20} />,
      badge: `${vivaPct}% READY`,
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
      value: `${vivaScore}/${vivaTotal}`,
      subVal: 'pts',
      label: 'Viva Oral Score',
      barPct: vivaPct,
    },
    {
      icon: <Layers className="text-purple-400" size={20} />,
      badge: `${flashPct}% MASTERED`,
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
      value: `${flashcardsMastered}/${flashcardsTotal}`,
      label: 'Flashcard Mastery',
      barPct: flashPct,
    },
    {
      icon: <Clock className="text-amber-400" size={20} />,
      badge: 'POMODORO',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
      value: studyMinutes,
      subVal: 'mins',
      label: 'Focus Study Time',
      barPct: 65,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="glass-panel glass-panel-hover rounded-2xl p-5 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
              {c.icon}
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${c.badgeColor}`}
            >
              {c.badge}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-white">{c.value}</span>
            {c.subVal && <span className="text-xs text-slate-400">{c.subVal}</span>}
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-1">{c.label}</p>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${c.barPct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
