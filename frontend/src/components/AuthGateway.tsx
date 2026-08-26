'use client';

import React, { useState } from 'react';
import { useAuth, AcademicStream } from '@/context/AuthContext';
import { 
  Shield, 
  Stethoscope, 
  Cpu, 
  FlaskConical, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Building2,
  CheckCircle2
} from 'lucide-react';

export function AuthGateway() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [selectedStream, setSelectedStream] = useState<AcademicStream>('medical');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (isRegister) {
      register(name.trim() || 'Student Operative', email.trim(), selectedStream, institution.trim());
    } else {
      login(email.trim(), name.trim(), selectedStream);
    }
  };

  const handleQuickDemo = (stream: AcademicStream) => {
    if (stream === 'medical') {
      register('Dr. Alex Rivera', 'alex.rivera@med.edu', 'medical', 'Global Medical College');
    } else {
      register('Alex Chen', 'alex.chen@eng.edu', 'engineering', 'Tech Institute of Science');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="vault-panel w-full max-w-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden border border-indigo-500/30 shadow-2xl">
        {/* Top Glow Ambient Strip */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400" />

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-emerald-500/20 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 mb-3">
            <Shield className="text-indigo-400" size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight vault-gradient-text uppercase font-mono">
            VAULTX PROTOCOL // GATEWAY
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium max-w-md mx-auto">
            Personalized AI Intelligence Platform. Select your discipline for dedicated study suites & drawing tools.
          </p>
        </div>

        {/* Quick Demo Fast-Track Buttons */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 space-y-2.5">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block text-center">
            ⚡ Quick 1-Click Track Previews:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('medical')}
              className="px-4 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
            >
              <Stethoscope size={15} /> <span>Launch MBBS / Medical Mode</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('engineering')}
              className="px-4 py-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
            >
              <Cpu size={15} /> <span>Launch Engineering Mode</span>
            </button>
          </div>
        </div>

        {/* Tab Toggle (Sign In vs Register) */}
        <div className="flex rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 mb-6 font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2.5 rounded-xl transition ${
              isRegister
                ? 'vault-btn-primary text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Create New Operative Profile
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2.5 rounded-xl transition ${
              !isRegister
                ? 'vault-btn-primary text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔐 Sign In to Existing Vault
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Stream Selector Cards (Crucial Choice) */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-2 uppercase">
              1. Select Your Academic Specialization Track:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Medical / MBBS */}
              <div
                onClick={() => setSelectedStream('medical')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all relative ${
                  selectedStream === 'medical'
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                    <Stethoscope size={16} />
                  </div>
                  {selectedStream === 'medical' && (
                    <CheckCircle2 size={16} className="text-cyan-400" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white font-mono">🩺 MBBS & Medical Track</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Anatomy sketching guides, physiological pathways, clinical mnemonics, and viva examiners.
                </p>
              </div>

              {/* Option B: Engineering / STEM */}
              <div
                onClick={() => setSelectedStream('engineering')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all relative ${
                  selectedStream === 'engineering'
                    ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Cpu size={16} />
                  </div>
                  {selectedStream === 'engineering' && (
                    <CheckCircle2 size={16} className="text-indigo-400" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-white font-mono">⚡ Engineering & STEM Track</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Mathematical derivations, circuit logic, formula indexes, K-maps, and numerical solvers.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 pt-1">
            {isRegister && (
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                  Full Name / Academic Alias
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe or Alex Smith"
                    className="w-full bg-slate-900/90 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-slate-900/90 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                Vault Security Passkey
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                  College / Medical University (Optional)
                </label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Harvard Medical / MIT Engineering"
                    className="w-full bg-slate-900/90 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full vault-btn-emerald text-white text-xs font-mono font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl cursor-pointer"
          >
            <span>{isRegister ? 'Initialize Personalized Vault' : 'Authenticate & Enter Vault'}</span>
            <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
