'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileModal } from './ProfileModal';
import { Shield, Upload, Activity, Database, Cpu, Stethoscope, GraduationCap } from 'lucide-react';

interface HeaderProps {
  subjectsCount: number;
  chunksCount: number;
  onOpenUpload: () => void;
}

export function Header({ subjectsCount, chunksCount, onOpenUpload }: HeaderProps) {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isClass10 = user?.stream === 'class10';
  const isMedical = user?.stream === 'medical';

  let bannerGradient = 'from-indigo-500 via-purple-500 to-cyan-400';
  let badgeLabel = 'ENGINEERING TRACK';
  let badgeStyle = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
  let icon = <Cpu size={24} />;
  let subtitle = 'Mathematical Derivations • Circuit Diagrams • Formula Indices & Model Papers';
  let titleSuffix = 'ENG';

  if (isClass10) {
    bannerGradient = 'from-amber-400 via-orange-500 to-yellow-400';
    badgeLabel = 'CBSE CLASS 10 BOARDS';
    badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    icon = <GraduationCap size={24} className="text-amber-400" />;
    subtitle = 'Pre-loaded NCERT Textbooks • Board PYQs 2018–2024 • Evaluator Step-Marking Schemes';
    titleSuffix = 'BOARDS';
  } else if (isMedical) {
    bannerGradient = 'from-cyan-400 via-emerald-400 to-teal-400';
    badgeLabel = 'MBBS MEDICAL TRACK';
    badgeStyle = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    icon = <Stethoscope size={24} className="text-cyan-400" />;
    subtitle = 'Clinical RAG Intelligence • Step-by-Step Anatomical Sketching • Viva Voce Rubrics';
    titleSuffix = 'MED';
  }

  return (
    <>
      <header className="vault-panel rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden">
        {/* Top Cyber Glow Line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${bannerGradient}`} />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shadow-lg">
                {icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight vault-gradient-text uppercase font-mono">
                    VAULTX <span className="text-white">{titleSuffix}</span>
                  </h1>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border uppercase tracking-widest font-mono ${badgeStyle}`}>
                    {badgeLabel}
                  </span>
                </div>
                <p className="text-slate-400 text-xs md:text-sm font-medium mt-0.5">{subtitle}</p>
              </div>
            </div>

            {/* Cyber HUD Status Ticker */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isClass10 ? 'NCERT SYLLABUS ACTIVE' : 'LIVE VAULT RAG'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 font-semibold">
                <Database size={13} /> {isClass10 ? '15 NCERT CHAPTERS LOADED' : `${subjectsCount} VAULTS ACTIVE`}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-semibold">
                <Cpu size={13} /> {isClass10 ? '500+ CBSE BOARD PYQS' : `${chunksCount} NEURAL CHUNKS`}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-500/30 font-semibold">
                <Activity size={13} /> LLAMA-3.3-70B ENGINE
              </span>
            </div>
          </div>

          {/* Right Action Bar (Profile + Ingest) */}
          <div className="flex items-center gap-3 shrink-0">
            {user && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center gap-2 font-mono text-xs transition"
                title="Manage Profile & Switch Track"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>
            )}

            {!isClass10 && (
              <button
                onClick={onOpenUpload}
                className="vault-btn-emerald text-white text-xs md:text-sm font-bold px-5 py-3 rounded-2xl flex items-center gap-2 cursor-pointer uppercase tracking-wider font-mono shrink-0"
              >
                <Upload size={16} /> Ingest Vault Data
              </button>
            )}
          </div>
        </div>
      </header>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
