'use client';

import React, { useState, useEffect } from 'react';
import { api, SubjectInfo } from '@/lib/api';
import { Header } from '@/components/Header';
import { StatCards } from '@/components/StatCards';
import { ChatTab } from '@/components/ChatTab';
import { VivaTab } from '@/components/VivaTab';
import { FlashcardsTab } from '@/components/FlashcardsTab';
import { QuizTab } from '@/components/QuizTab';
import { CheatSheetTab } from '@/components/CheatSheetTab';
import { DiagramsTab } from '@/components/DiagramsTab';
import { UploadModal } from '@/components/UploadModal';
import { MessageSquare, Mic, Layers, HelpCircle, Zap, BookOpen, Trash2, Palette } from 'lucide-react';

export default function StudyAssistantPage() {
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [activeSubject, setActiveSubject] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'chat' | 'viva' | 'flashcards' | 'quiz' | 'cheatsheet' | 'diagrams'>('chat');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data.subjects || []);
      if (data.subjects && data.subjects.length > 0) {
        if (!activeSubject || !data.subjects.some((s) => s.name === activeSubject)) {
          setActiveSubject(data.subjects[0].name);
        }
      } else {
        setActiveSubject('');
      }
    } catch {
      console.error('Failed to fetch subjects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDeleteSubject = async (e: React.MouseEvent, subName: string) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to remove "${subName.toUpperCase()}" from your vault?`)) return;

    try {
      await api.deleteSubject(subName);
      const updated = subjects.filter((s) => s.name !== subName);
      setSubjects(updated);
      if (activeSubject === subName) {
        setActiveSubject(updated[0]?.name || '');
      }
    } catch {
      alert('Failed to delete subject');
    }
  };

  const totalChunks = subjects.reduce((acc, s) => acc + s.chunk_count, 0);
  const currentSubjectInfo = subjects.find((s) => s.name === activeSubject);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <Header
        subjectsCount={subjects.length}
        chunksCount={totalChunks}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* 4 Animated Metric Cards */}
      <StatCards
        questionsAsked={0}
        vivaScore={0}
        vivaTotal={0}
        flashcardsMastered={0}
        flashcardsTotal={0}
        studyMinutes={45}
      />

      {/* Subject Navigation Tabs */}
      {subjects.length === 0 && !loading ? (
        <div className="vault-panel rounded-3xl p-12 text-center space-y-4">
          <div className="text-5xl mb-2">📂</div>
          <h3 className="text-xl font-bold text-white uppercase font-mono tracking-wider">No Vault Data Ingested Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Ingest your lecture slides or textbook PDFs to unlock grounded AI chat, oral viva examiner, 3D holographic decks, medical diagram generator, and quiz arena.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="vault-btn-emerald px-6 py-3.5 rounded-2xl text-white font-mono font-bold text-sm shadow-xl tracking-wider uppercase"
          >
            Ingest Your First PDF Note
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Subject Pill Selector with Delete Option */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 font-mono">
              <BookOpen size={14} className="text-indigo-400" /> ACTIVE VAULT:
            </span>
            {subjects.map((sub) => {
              const isActive = activeSubject === sub.name;
              return (
                <div
                  key={sub.name}
                  className={`group flex items-center rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/50 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  <button
                    onClick={() => setActiveSubject(sub.name)}
                    className="text-xs font-bold font-mono px-4 py-2 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>{sub.name.toUpperCase()}</span>
                    <span className="text-[10px] opacity-80 bg-black/30 px-2 py-0.5 rounded-md">
                      {sub.chunk_count} chunks
                    </span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteSubject(e, sub.name)}
                    title={`Remove ${sub.name.toUpperCase()} vault`}
                    className="pr-3 pl-1 py-2 text-slate-400 hover:text-rose-400 transition"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Module Navigation Sub-Tabs (6 Modules) */}
          <div className="vault-panel p-1.5 rounded-2xl flex flex-wrap gap-1.5">
            {[
              { id: 'chat', label: '💬 Dual-Stream Chat', icon: <MessageSquare size={15} /> },
              { id: 'diagrams', label: '🎨 Medical Diagrams & Draw Guides', icon: <Palette size={15} /> },
              { id: 'viva', label: '🎤 Viva Voce Examiner', icon: <Mic size={15} /> },
              { id: 'flashcards', label: '🗂️ 3D Flashcards', icon: <Layers size={15} /> },
              { id: 'quiz', label: '📝 Practice Quiz Arena', icon: <HelpCircle size={15} /> },
              { id: 'cheatsheet', label: '⚡ Smart Cheat Sheets', icon: <Zap size={15} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[145px] text-xs font-mono font-bold py-3 px-3.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'vault-btn-primary text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Render Active Study Module */}
          {activeSubject && currentSubjectInfo && (
            <div className="transition-all duration-300">
              {activeTab === 'chat' && <ChatTab subject={activeSubject} />}
              {activeTab === 'diagrams' && <DiagramsTab subject={activeSubject} />}
              {activeTab === 'viva' && (
                <VivaTab subject={activeSubject} sources={currentSubjectInfo.sources} />
              )}
              {activeTab === 'flashcards' && (
                <FlashcardsTab subject={activeSubject} sources={currentSubjectInfo.sources} />
              )}
              {activeTab === 'quiz' && (
                <QuizTab subject={activeSubject} sources={currentSubjectInfo.sources} />
              )}
              {activeTab === 'cheatsheet' && (
                <CheatSheetTab subject={activeSubject} sources={currentSubjectInfo.sources} />
              )}
            </div>
          )}
        </div>
      )}

      {/* Ingest PDF Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => fetchSubjects()}
      />

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 pt-8 pb-4 font-mono">
        VAULTX STUDY ASSISTANT PRO v2.5 • FULL-STACK INTELLIGENCE & VISUAL DIAGRAM ARCHITECTURE
      </footer>
    </main>
  );
}
