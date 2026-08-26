'use client';

import React from 'react';
import { useAuth, AcademicStream } from '@/context/AuthContext';
import { X, User, Stethoscope, Cpu, GraduationCap, LogOut, CheckCircle2, Building2, Calendar } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateStream, logout } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="vault-panel w-full max-w-lg rounded-3xl p-6 md:p-8 relative border border-indigo-500/30 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-900 border border-slate-800 transition"
        >
          <X size={18} />
        </button>

        {/* Header Profile Badge */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-indigo-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-black text-xl text-amber-300 shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-mono">{user.name}</h3>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        {/* Info Rows */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 font-mono text-xs">
          {user.institution && (
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 size={13} /> School / Institution:
              </span>
              <span className="font-semibold text-white truncate max-w-[200px]">{user.institution}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar size={13} /> Member Since:
            </span>
            <span className="font-semibold text-white">
              {new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* 3-Track Stream Switcher */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
            Active Specialization Track:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => updateStream('class10')}
              className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition ${
                user.stream === 'class10'
                  ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <GraduationCap size={18} />
              <span>🎓 Class 10 CBSE</span>
            </button>

            <button
              onClick={() => updateStream('medical')}
              className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition ${
                user.stream === 'medical'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Stethoscope size={18} />
              <span>🩺 MBBS Medical</span>
            </button>

            <button
              onClick={() => updateStream('engineering')}
              className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition ${
                user.stream === 'engineering'
                  ? 'bg-indigo-950/60 border-indigo-400 text-indigo-300 shadow-md ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Cpu size={18} />
              <span>⚡ Engineering</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-bold transition"
          >
            <LogOut size={14} /> Sign Out
          </button>
          <button
            onClick={onClose}
            className="vault-btn-primary px-5 py-2 rounded-xl text-white text-xs font-mono font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
