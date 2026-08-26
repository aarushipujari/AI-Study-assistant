'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileModal } from './ProfileModal';
import { Shield, Upload, Database, Cpu, Stethoscope, GraduationCap, User } from 'lucide-react';

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

  let badgeLabel = 'Engineering Track';
  let icon = <Cpu size={20} className="text-indigo-400" />;
  let subtitle = 'Step-by-step derivations, circuit schematics, and formula index';

  if (isClass10) {
    badgeLabel = 'Class 10 CBSE';
    icon = <GraduationCap size={20} className="text-indigo-400" />;
    subtitle = 'Official NCERT curriculum, verified board PYQs (2018–2024), and step-marking schemes';
  } else if (isMedical) {
    badgeLabel = 'MBBS & Medical';
    icon = <Stethoscope size={20} className="text-indigo-400" />;
    subtitle = 'Clinical case reasoning, anatomical drawings, and viva examiner';
  }

  return (
    <>
      <header className="vault-panel rounded-2xl p-5 md:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
                  VaultX Study Assistant
                </h1>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300">
                  {badgeLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 shrink-0">
            {user && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-medium flex items-center gap-2 transition"
                title="Manage Profile"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name.split(' ')[0]}</span>
              </button>
            )}

            {!isClass10 && (
              <button
                onClick={onOpenUpload}
                className="vault-btn-primary text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
              >
                <Upload size={14} /> <span>Upload Notes</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
