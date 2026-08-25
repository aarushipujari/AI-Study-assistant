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
import { UploadModal } from '@/components/UploadModal';
import { MessageSquare, Mic, Layers, HelpCircle, Zap, BookOpen } from 'lucide-react';

export default function StudyAssistantPage() {
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [activeSubject, setActiveSubject] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'chat' | 'viva' | 'flashcards' | 'quiz' | 'cheatsheet'>('chat');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const data = await api.getSubjects();
      setSubjects(data.subjects || []);
      if (data.subjects && data.subjects.length > 0 && !activeSubject) {
        setActiveSubject(data.subjects[0].name);
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
        questionsAsked={14}
        vivaScore={26}
        vivaTotal={30}
        flashcardsMastered={12}
        flashcardsTotal={18}
        studyMinutes={45}
      />

      {/* Subject Navigation Tabs */}
      {subjects.length === 0 && !loading ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="text-5xl mb-2">📂</div>
          <h3 className="text-xl font-bold text-white">No Course Notes Ingested Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Upload your lecture slides or textbook PDFs to unlock grounded AI chat, oral viva examiner, 3D flashcard decks, and quiz arena.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="gradient-btn px-6 py-3 rounded-xl text-white font-bold text-sm shadow-xl shadow-indigo-500/25"
          >
            Upload Your First PDF Note
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Subject Pill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen size={14} className="text-indigo-400" /> Active Subject:
            </span>
            {subjects.map((sub) => (
              <button
                key={sub.name}
                onClick={() => setActiveSubject(sub.name)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeSubject === sub.name
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <span>{sub.name.toUpperCase()}</span>
                <span className="text-[10px] opacity-80 bg-black/20 px-1.5 py-0.5 rounded-md">
                  {sub.chunk_count} chunks
                </span>
              </button>
            ))}
          </div>

          {/* Module Navigation Sub-Tabs */}
          <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap gap-1.5">
            {[
              { id: 'chat', label: '💬 Dual-Stream AI Chat', icon: <MessageSquare size={15} /> },
              { id: 'viva', label: '🎤 Oral Viva Voce Examiner', icon: <Mic size={15} /> },
              { id: 'flashcards', label: '🗂️ 3D Flashcard Deck', icon: <Layers size={15} /> },
              { id: 'quiz', label: '📝 Practice & Mock Quiz Arena', icon: <HelpCircle size={15} /> },
              { id: 'cheatsheet', label: '⚡ Smart Cheat Sheet Suite', icon: <Zap size={15} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[160px] text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
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
      <footer className="text-center text-xs text-slate-500 pt-8 pb-4">
        AI Study Assistant Pro v2.0 • Full-Stack Next.js + FastAPI Architecture • Ready for Vercel & Render Deployment
      </footer>
    </main>
  );
}
