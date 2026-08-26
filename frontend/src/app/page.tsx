'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, SubjectInfo } from '@/lib/api';
import { Header } from '@/components/Header';
import { StatCards } from '@/components/StatCards';
import { AuthGateway } from '@/components/AuthGateway';
import { Class10Tab } from '@/components/Class10Tab';
import { ChatTab } from '@/components/ChatTab';
import { VivaTab } from '@/components/VivaTab';
import { FlashcardsTab } from '@/components/FlashcardsTab';
import { QuizTab } from '@/components/QuizTab';
import { CheatSheetTab } from '@/components/CheatSheetTab';
import { DiagramsTab } from '@/components/DiagramsTab';
import { UploadModal } from '@/components/UploadModal';
import { 
  MessageSquare, 
  Mic, 
  Layers, 
  HelpCircle, 
  Zap, 
  BookOpen, 
  Trash2, 
  Palette, 
  GraduationCap 
} from 'lucide-react';

export default function StudyAssistantPage() {
  const { user, loading: authLoading } = useAuth();
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [activeSubject, setActiveSubject] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('class10_pyqs');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isClass10 = user?.stream === 'class10';
  const isMedical = user?.stream === 'medical';

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
    if (user) {
      if (isClass10) {
        setActiveTab('class10_pyqs');
        setLoading(false);
      } else {
        fetchSubjects();
        if (isMedical) {
          setActiveTab('diagrams');
        } else {
          setActiveTab('chat');
        }
      }
    }
  }, [user, isClass10, isMedical]);

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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs text-indigo-300">
        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Render Authentication & Stream Selection Gateway if not logged in
  if (!user) {
    return (
      <main className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto flex items-center justify-center">
        <AuthGateway />
      </main>
    );
  }

  const totalChunks = subjects.reduce((acc, s) => acc + s.chunk_count, 0);
  const currentSubjectInfo = subjects.find((s) => s.name === activeSubject);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <Header
        subjectsCount={isClass10 ? 15 : subjects.length}
        chunksCount={isClass10 ? 500 : totalChunks}
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

      {/* ========================================================
          BRANCH 1: CLASS 10 CBSE BOARDS TRACK (Pre-loaded NCERT)
         ======================================================== */}
      {isClass10 ? (
        <div className="space-y-6">
          {/* Class 10 Module Tabs */}
          <div className="vault-panel p-1 rounded-xl flex flex-wrap gap-1 border border-white/[0.08]">
            {[
              {
                id: 'class10_pyqs',
                label: 'CBSE Board PYQ Bank (2018–2024)',
                icon: <GraduationCap size={15} />,
              },
              {
                id: 'class10_diagrams',
                label: 'NCERT Diagrams & Ray Optics',
                icon: <Palette size={15} />,
              },
              {
                id: 'class10_chat',
                label: 'NCERT AI Doubt Solver',
                icon: <MessageSquare size={15} />,
              },
              {
                id: 'class10_flash',
                label: '3D Board Formula Decks',
                icon: <Layers size={15} />,
              },
              {
                id: 'class10_quiz',
                label: 'CBSE Mock Exam Arena',
                icon: <HelpCircle size={15} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[170px] text-xs font-sans font-medium py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className="transition-all duration-300">
            {activeTab === 'class10_pyqs' && <Class10Tab initialView="pyqs" />}
            {activeTab === 'class10_diagrams' && (
              <Class10Tab initialView="ncert_diagrams" />
            )}
            {activeTab === 'class10_chat' && (
              <ChatTab subject="CBSE Class 10 Science & Mathematics (NCERT)" />
            )}
            {activeTab === 'class10_flash' && (
              <FlashcardsTab
                subject="Class 10 CBSE Science"
                sources={['NCERT Class 10 Science.pdf', 'CBSE Board Sample Papers.pdf']}
              />
            )}
            {activeTab === 'class10_quiz' && (
              <QuizTab
                subject="Class 10 CBSE Science"
                sources={['NCERT Class 10 Science.pdf']}
              />
            )}
          </div>
        </div>
      ) : (
        /* ========================================================
            BRANCH 2: MEDICAL & ENGINEERING HIGHER-ED TRACKS
           ======================================================== */
        subjects.length === 0 && !loading ? (
          <div className="vault-panel rounded-3xl p-12 text-center space-y-4">
            <div className="text-5xl mb-2">📂</div>
            <h3 className="text-xl font-bold text-white uppercase font-mono tracking-wider">
              {isMedical ? 'No Medical Vault Notes Ingested' : 'No Engineering Notes Ingested'}
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              {isMedical
                ? 'Ingest Anatomy, Physiology, Pharmacology, or Pathology slides to unlock grounded AI recall, 3D anatomical flashcards, and clinical viva simulation.'
                : 'Ingest Digital Circuits, Signals, Quantum Physics, or Engineering slides to unlock grounded derivations, formula tables, and model exam questions.'}
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

            {/* Module Navigation Sub-Tabs */}
            <div className="vault-panel p-1.5 rounded-2xl flex flex-wrap gap-1.5">
              {[
                {
                  id: 'diagrams',
                  label: isMedical ? '🩺 MBBS Diagrams & Drawing Guides' : '🎨 Schematics & System Diagrams',
                  icon: <Palette size={15} />,
                },
                {
                  id: 'chat',
                  label: isMedical ? '💬 Clinical AI Study Partner' : '💬 Dual-Stream AI Chat',
                  icon: <MessageSquare size={15} />,
                },
                {
                  id: 'viva',
                  label: isMedical ? '🎤 Oral Viva & Ward Examiner' : '🎤 Viva Voce Oral Examiner',
                  icon: <Mic size={15} />,
                },
                {
                  id: 'flashcards',
                  label: isMedical ? '🗂️ 3D Anatomy/Physio Decks' : '🗂️ 3D Concept Decks',
                  icon: <Layers size={15} />,
                },
                {
                  id: 'quiz',
                  label: '📝 Practice & Mock Arena',
                  icon: <HelpCircle size={15} />,
                },
                {
                  id: 'cheatsheet',
                  label: isMedical ? '⚡ Clinical Pearls & High-Yield' : '⚡ Formulas & Equation Indices',
                  icon: <Zap size={15} />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[145px] text-xs font-sans font-medium py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
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
                {activeTab === 'diagrams' && <DiagramsTab subject={activeSubject} />}
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
        )
      )}

      {/* Ingest PDF Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => fetchSubjects()}
      />

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 pt-8 pb-4 font-mono">
        VAULTX STUDY PRO v2.5 • PERSONALIZED {isClass10 ? 'CBSE CLASS 10' : isMedical ? 'MEDICAL & MBBS' : 'ENGINEERING'} INTELLIGENCE SUITE
      </footer>
    </main>
  );
}
