'use client';

import React from 'react';
import { Shield, Sparkles, Upload, Activity, Database, Cpu } from 'lucide-react';

interface HeaderProps {
  subjectsCount: number;
  chunksCount: number;
  onOpenUpload: () => void;
}

export function Header({ subjectsCount, chunksCount, onOpenUpload }: HeaderProps) {
  return (
    <header className="vault-panel rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
      {/* Top Cyber Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400" />
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
        <div>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-emerald-500/20 border border-indigo-500/40 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="text-indigo-400" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight vault-gradient-text uppercase font-mono">
                  VAULTX <span className="text-white">STUDY</span>
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-500/40 uppercase tracking-widest font-mono">
                  PRO PROTOCOL v2.5
                </span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium mt-0.5">
                Next-Gen RAG Intelligence Suite • Oral Viva Simulator • 3D Holographic Recall Decks
              </p>
            </div>
          </div>

          {/* Cyber HUD Status Ticker */}
          <div className="flex flex-wrap items-center gap-2.5 mt-4 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE RAG MATRIX</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-semibold">
              <Database size={13} /> {subjectsCount} VAULTS LOADED
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-semibold">
              <Cpu size={13} /> {chunksCount} NEURAL CHUNKS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 font-semibold">
              <Activity size={13} /> LLAMA-3.3-70B ENGINE
            </span>
          </div>
        </div>

        <button
          onClick={onOpenUpload}
          className="vault-btn-emerald text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-2xl flex items-center gap-2.5 cursor-pointer uppercase tracking-wider font-mono shrink-0"
        >
          <Upload size={16} /> Ingest Vault Data (PDF)
        </button>
      </div>
    </header>
  );
}
