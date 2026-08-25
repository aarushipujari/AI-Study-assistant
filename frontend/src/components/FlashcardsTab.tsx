'use client';

import React, { useState } from 'react';
import { api, Flashcard } from '@/lib/api';
import { Layers, RotateCw, Check, ShieldAlert, Shuffle, Download, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

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
    a.download = `${subject}_vault_flashcards.csv`;
    a.click();
  };

  const currentCard = deck[currentIndex];

  return (
    <div className="space-y-6">
      {/* VaultX Controls */}
      <div className="vault-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                VaultX Holographic Flashcard Deck
              </h3>
              <p className="text-xs text-slate-400">Active spaced recall matrix with 3D tactile flipping</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
            HOLO-ENGINE v2.5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Target Vault File
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-purple-500 font-mono"
            >
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Card Specialization
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-purple-500 font-mono"
            >
              <option>Core Definitions</option>
              <option>Formulas & Equations</option>
              <option>Exam Traps & Contrasting Differences</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Deck Size: {count} Holo-Cards
            </label>
            <input
              type="range"
              min={5}
              max={20}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full mt-2 accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !selectedSource}
          className="vault-btn-primary text-white text-xs font-bold font-mono px-5 py-3 rounded-2xl flex items-center gap-2 uppercase tracking-wider disabled:opacity-50"
        >
          <Sparkles size={15} /> Synthesize Holo-Card Deck
        </button>
      </div>

      {/* Holographic 3D Card Showcase */}
      {deck.length > 0 && currentCard && (
        <div className="space-y-5 max-w-3xl mx-auto">
          {/* Deck Ticker */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400 font-semibold px-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              HOLO-CARD {currentIndex + 1} OF {deck.length}
            </span>
            <span className="text-emerald-400 font-bold">MASTERED: {masteredCount}</span>
          </div>

          {/* 3D Holo Card Component */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="holo-card cursor-pointer min-h-[300px] p-10 flex flex-col justify-between items-center text-center shadow-2xl relative select-none"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-mono font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border border-indigo-400/40 text-indigo-300 uppercase tracking-widest">
                {currentCard.topic || subject}
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wider">
                {isFlipped ? '💡 CLASSIFIED ANSWER' : '❓ INQUIRY'}
              </span>
            </div>

            {/* Core Body */}
            <div className="my-auto py-6">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed max-w-lg font-sans">
                {isFlipped ? currentCard.answer : currentCard.question}
              </h3>
            </div>

            {/* Bottom Glow Hint */}
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 opacity-80">
              <RotateCw size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>(Click to {isFlipped ? 'flip back to question' : 'reveal classified answer'})</span>
            </div>
          </div>

          {/* Cyber Control Deck */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1 border border-slate-700/80 transition"
            >
              <ArrowLeft size={14} /> PREV
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="vault-btn-primary px-4 py-3 rounded-2xl text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5"
            >
              <RotateCw size={14} /> FLIP
            </button>

            <button
              onClick={() => {
                setMasteredCount((prev) => prev + 1);
                handleNext();
              }}
              className="vault-btn-emerald px-4 py-3 rounded-2xl text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5"
            >
              <Check size={14} /> MASTERED
            </button>

            <button
              onClick={handleShuffle}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1 border border-slate-700/80 transition"
            >
              <Shuffle size={14} /> SHUFFLE
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= deck.length - 1}
              className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-1 border border-slate-700/80 transition"
            >
              NEXT <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleExportCSV}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5 font-medium transition"
            >
              <Download size={13} /> Export Holo-Deck to Anki (.csv)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
