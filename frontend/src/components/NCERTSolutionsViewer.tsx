'use client';

import React, { useState, useMemo } from 'react';
import { CLASS10_CHAPTERS, Class10Subject, NCERTChapter } from '@/lib/class10-data';
import { 
  NCERT_SOLUTIONS_DATA, 
  NCERTQuestion 
} from '@/lib/ncert-solutions-data';
import { 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Download,
  Dna,
  Zap,
  Atom,
  Calculator,
  Globe,
  Sparkles,
  Lightbulb,
  FileQuestion,
  Layers,
  Award
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function NCERTSolutionsViewer() {
  const [selectedSubject, setSelectedSubject] = useState<Class10Subject>('Mathematics');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('math-ch1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Filter chapters
  const subjectChapters = useMemo(
    () => CLASS10_CHAPTERS.filter((c) => c.subject === selectedSubject),
    [selectedSubject]
  );

  const currentChapter = useMemo(
    () => CLASS10_CHAPTERS.find((c) => c.id === selectedChapterId) || subjectChapters[0] || CLASS10_CHAPTERS[0],
    [selectedChapterId, subjectChapters]
  );

  const handleSubjectChange = (subj: Class10Subject) => {
    setSelectedSubject(subj);
    const firstCh = CLASS10_CHAPTERS.find((c) => c.subject === subj);
    if (firstCh) {
      setSelectedChapterId(firstCh.id);
      setSelectedCategory('All');
    }
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return NCERT_SOLUTIONS_DATA.filter((q) => {
      if (q.chapterId !== selectedChapterId) return false;
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedChapterId, selectedCategory]);

  const subjectTabs: { id: Class10Subject; label: string; icon: React.ReactNode }[] = [
    { id: 'Mathematics', label: 'Mathematics', icon: <Calculator size={14} /> },
    { id: 'Science (Biology)', label: 'Biology', icon: <Dna size={14} /> },
    { id: 'Science (Physics)', label: 'Physics', icon: <Zap size={14} /> },
    { id: 'Science (Chemistry)', label: 'Chemistry', icon: <Atom size={14} /> },
    { id: 'Social Science', label: 'Social Science', icon: <Globe size={14} /> },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-200">
      {/* Top Header & Filters */}
      <div className="vault-panel rounded-2xl p-4 md:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm">
              <BookOpen size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Official NCERT Textbook Solutions & Solved Examples
                </h2>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  Textbook Only
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct NCERT Solved Examples, In-Text (Blue Box) questions, and Chapter-End Exercises with verified textbook solutions
              </p>
            </div>
          </div>
        </div>

        {/* SUBJECT PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {subjectTabs.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSubjectChange(sub.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
                selectedSubject === sub.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/[0.06]'
              }`}
            >
              {sub.icon}
              <span>{sub.label}</span>
            </button>
          ))}
        </div>

        {/* CHAPTER DROPDOWN & NCERT LINK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium">
              Select Chapter ({subjectChapters.length} Available):
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
            >
              {subjectChapters.map((ch) => (
                <option key={ch.id} value={ch.id} className="bg-slate-900 text-slate-200">
                  Chapter {ch.chapterNumber}: {ch.name} — [{ch.highYieldWeightage}]
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-medium">
              Official Textbook:
            </span>
            <a
              href={currentChapter.officialPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <BookOpen size={14} />
              <span>Open NCERT PDF ({currentChapter.ncertCode})</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-medium mr-1">
            Filter by Section:
          </span>
          {[
            { id: 'All', label: 'All Questions' },
            { id: 'Solved Example', label: '📘 Solved Examples' },
            { id: 'In-Text Question (Blue Box)', label: '💡 In-Text Questions (Blue Boxes)' },
            { id: 'Chapter-End Exercise', label: '📝 Chapter-End Exercises' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg transition ${
                selectedCategory === cat.id
                  ? 'bg-white/[0.12] text-white font-semibold border border-white/[0.2]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTION CARDS STREAM */}
      <div className="space-y-3.5">
        {filteredQuestions.length === 0 ? (
          <div className="vault-panel rounded-2xl p-10 text-center space-y-2">
            <div className="text-3xl">📖</div>
            <h4 className="text-base font-bold text-white">Select Any Chapter to View NCERT Solutions</h4>
            <p className="text-xs text-slate-400">
              NCERT solved examples and exercises for {currentChapter.name} are loaded.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Show All Questions
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = !!expandedSolutions[q.id];

            return (
              <div
                key={q.id}
                className="vault-panel rounded-2xl p-5 space-y-3.5 border border-white/[0.07] hover:border-white/15 transition"
              >
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono font-medium">
                      {q.exerciseName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-200 border border-white/[0.08] text-xs font-mono font-medium">
                      {q.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      • {q.questionNumber}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {q.boardImportanceTag}
                  </span>
                </div>

                {/* Question Statement */}
                <div className="text-sm md:text-base font-semibold text-white leading-relaxed font-sans">
                  {q.question}
                </div>

                {/* Key Concepts Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {q.keyConceptsApplied.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-white/[0.05]"
                    >
                      🏷️ {tag}
                    </span>
                  ))}
                </div>

                {/* Solution Toggle */}
                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                  >
                    <span>{isExpanded ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Solution'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {/* Expanded Solution */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-2 pt-3">
                    <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                      <CheckCircle2 size={13} className="text-emerald-400" /> Official NCERT Textbook Solution:
                    </span>
                    <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans">
                      <ReactMarkdown>{q.stepByStepSolution}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
