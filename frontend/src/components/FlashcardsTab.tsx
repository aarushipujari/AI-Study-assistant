'use client';

import React, { useState } from 'react';
import { api, Flashcard } from '@/lib/api';
import { Layers, RotateCw, Check, AlertCircle, Shuffle, Download, ArrowLeft, ArrowRight } from 'lucide-react';

interface FlashcardsTabProps {
  subject: string;
  sources: string[];
}

export function FlashcardsTab({ subject, sources }: FlashcardsTabProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0] || '');
  const [count, setCount] = useState(8);
  const [focus, setFocus] = useState('Core Definitions');
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const handleGenerate = async () => {
    if (!selectedSource) return;
    setLoading(true);
    setIsFlipped(false);
    setCurrentIndex(0);

    try {
      const res = await api.getFlashcards({
        subject,
        source_file: selectedSource,
        count,
        focus,
      });
      setDeck(res.flashcards || []);
    } catch {
      alert('Error building flashcard deck');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    setDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleExportCSV = () => {
    const csv =
      'Front,Back,Tag\n' +
      deck.map((c) => `"${c.question}","${c.answer}","${subject}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}_flashcards.csv`;
    a.click();
  };

  const currentCard = deck[currentIndex];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-panel rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="text-purple-400" size={20} />
          <h3 className="text-lg font-bold text-white">Interactive 3D Flashcard Deck</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Deck Focus</label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              <option>Core Definitions</option>
              <option>Formulas & Equations</option>
              <option>Exam Traps & Contrasting Differences</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Deck Size: {count} cards</label>
            <input
              type="range"
              min={5}
              max={20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full mt-2 accent-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !selectedSource}
          className="gradient-btn text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          ✨ Generate Flashcard Deck
        </button>
      </div>

      {/* Active Flashcard Viewer */}
      {deck.length > 0 && currentCard && (
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
            <span>
              Card {currentIndex + 1} of {deck.length}
            </span>
            <span>Mastered: {masteredCount}</span>
          </div>

          {/* 3D Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer min-h-[260px] rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300 border-2 ${
              isFlipped
                ? 'bg-slate-800/95 border-indigo-500 shadow-2xl shadow-indigo-500/20'
                : 'glass-panel border-slate-700/70 hover:border-slate-600'
            }`}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 mb-2">
              {currentCard.topic || subject} • {isFlipped ? '💡 ANSWER & EXPLANATION' : '❓ CONCEPT QUESTION'}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white max-w-xl leading-relaxed">
              {isFlipped ? currentCard.answer : currentCard.question}
            </h3>
            <p className="text-xs text-slate-400 mt-4">
              (Click card to {isFlipped ? 'flip back to question' : 'reveal answer'})
            </p>
          </div>

          {/* Action Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 border border-slate-700"
            >
              <ArrowLeft size={14} /> Prev
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1"
            >
              <RotateCw size={14} /> Flip
            </button>

            <button
              onClick={() => {
                setMasteredCount((prev) => prev + 1);
                handleNext();
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1"
            >
              <Check size={14} /> Mastered
            </button>

            <button
              onClick={handleShuffle}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 border border-slate-700"
            >
              <Shuffle size={14} /> Shuffle
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= deck.length - 1}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 border border-slate-700"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleExportCSV}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium"
            >
              <Download size={13} /> Export Deck to Anki (.csv)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
