'use client';

import React, { useState, useEffect } from 'react';
import { api, Class10PYQResponse } from '@/lib/api';
import { CLASS10_CHAPTERS, Class10Subject, NCERTChapter } from '@/lib/class10-data';
import { OFFICIAL_NCERT_DIAGRAMS, NCERTDiagram } from '@/lib/class10-ncert-diagrams';
import { NCERTTextbookIllustration } from './NCERTTextbookIllustrations';
import { 
  GraduationCap, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Palette,
  FileText,
  Award,
  Pencil,
  Eye,
  Atom,
  Dna,
  Calculator,
  Globe
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Class10TabProps {
  initialView?: 'pyqs' | 'ncert_diagrams';
}

export function Class10Tab({ initialView = 'pyqs' }: Class10TabProps) {
  const [subView, setSubView] = useState<'pyqs' | 'ncert_diagrams'>(initialView);
  const [selectedSubject, setSelectedSubject] = useState<Class10Subject>('Science (Biology)');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bio-ch5');
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(OFFICIAL_NCERT_DIAGRAMS[0].id);
  const [questionFilter, setQuestionFilter] = useState('All Sections (CBSE Board Full Paper Mix)');
  const [pyqData, setPyqData] = useState<Class10PYQResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialView) {
      setSubView(initialView);
    }
  }, [initialView]);

  // Filter chapters by selected subject
  const subjectChapters = CLASS10_CHAPTERS.filter((c) => c.subject === selectedSubject);
  const currentChapter = CLASS10_CHAPTERS.find((c) => c.id === selectedChapterId) || subjectChapters[0] || CLASS10_CHAPTERS[0];
  const activeDiagram = OFFICIAL_NCERT_DIAGRAMS.find((d) => d.id === selectedDiagramId) || OFFICIAL_NCERT_DIAGRAMS[0];

  const handleSubjectChange = (subject: Class10Subject) => {
    setSelectedSubject(subject);
    const firstChap = CLASS10_CHAPTERS.find((c) => c.subject === subject);
    if (firstChap) {
      setSelectedChapterId(firstChap.id);
    }
  };

  const fetchPYQs = async (chapterId: string) => {
    setLoading(true);
    setPyqData(null);
    setExpandedSolutions({});

    try {
      const res = await api.getClass10PYQs({
        chapterId,
        questionType: questionFilter,
      });
      setPyqData(res);
    } catch {
      alert('Error fetching CBSE Class 10 PYQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subView === 'pyqs') {
      fetchPYQs(selectedChapterId);
    }
  }, [selectedChapterId, questionFilter, subView]);

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportPYQs = () => {
    if (!pyqData) return;
    const text = `
# CBSE Class 10 Board Master Sheet: ${pyqData.chapter_name}
**Subject:** ${selectedSubject} | **Unit:** ${currentChapter.unitName}
**Board Weightage:** ${pyqData.high_yield_weightage}
**Official NCERT Textbook PDF:** ${pyqData.official_ncert_url}

---

## Previous Year Questions (PYQs 2018–2024) & CBSE Step-Marking:
${pyqData.pyq_collection
  .map(
    (q, i) => `
### Q${i + 1} [${q.year} | ${q.marks} Marks | ${q.questionType}]
**Question:**
${q.question}

**Official CBSE Model Answer:**
${q.cbseModelAnswer}

**Step-by-Step Marking Scheme:**
${q.markingSchemePoints.map((p) => `- ${p}`).join('\n')}

**Common Board Exam Pitfall:**
${q.commonMistakes}
`
  )
  .join('\n---\n')}

---

## Chapter Formulae & Key Laws:
${pyqData.formula_and_laws_cheat_sheet.map((f) => `- ${f}`).join('\n')}

## Top CBSE Board Traps:
${pyqData.top_exam_traps.map((t) => `- ${t}`).join('\n')}
    `.trim();

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_Class10_${currentChapter.name.replace(/\s+/g, '_')}_PYQs.md`;
    a.click();
  };

  const handleExportDiagram = () => {
    const text = `
# ${activeDiagram.figureNumber}: ${activeDiagram.title}
**Subject:** Class 10 ${activeDiagram.subject} | **Chapter ${activeDiagram.chapterNumber}:** ${activeDiagram.chapterName}
**Board Exam Weightage:** ${activeDiagram.marksWeightage} (${activeDiagram.boardFrequency})

---

## Step-by-Step 60-Second Board Drawing Guide:
${activeDiagram.stepByStepDrawingGuide.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Mandatory CBSE Labels (Scoring Full Marks):
${activeDiagram.mandatoryLabels.map((l) => `- [x] ${l}`).join('\n')}

## Common Board Exam Traps & Deductions:
${activeDiagram.boardExamTraps.map((t) => `- ⚠️ ${t}`).join('\n')}

## Sample Questions Asked in Past Board Exams:
${activeDiagram.boardQuestionExamples.map((q) => `- ${q}`).join('\n')}
    `.trim();

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_Class10_${activeDiagram.figureNumber.replace(/[\s\.]+/g, '_')}_Guide.md`;
    a.click();
  };

  const subjectTabs: { id: Class10Subject; label: string; icon: React.ReactNode }[] = [
    { id: 'Science (Biology)', label: 'Biology', icon: <Dna size={14} /> },
    { id: 'Science (Physics)', label: 'Physics', icon: <Zap size={14} /> },
    { id: 'Science (Chemistry)', label: 'Chemistry', icon: <Atom size={14} /> },
    { id: 'Mathematics', label: 'Mathematics', icon: <Calculator size={14} /> },
    { id: 'Social Science', label: 'Social Science', icon: <Globe size={14} /> },
  ];

  return (
    <div className="space-y-5">
      {/* Top Suite Header Banner */}
      <div className="vault-panel rounded-2xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-white font-sans">
                  CBSE Class 10 Board Master
                </h2>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  NCERT 2024-25
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Select your subject & chapter • Verified Board PYQs (2018–2024) & Official NCERT vector figures
              </p>
            </div>
          </div>

          {/* Sub-View Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-900/80 p-1 border border-white/[0.08] text-xs shrink-0">
            <button
              onClick={() => setSubView('pyqs')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 font-medium transition ${
                subView === 'pyqs'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={14} />
              <span>Board PYQs (2018–2024)</span>
            </button>
            <button
              onClick={() => setSubView('ncert_diagrams')}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 font-medium transition ${
                subView === 'ncert_diagrams'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette size={14} />
              <span>NCERT Textbook Figures</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            SUBVIEW 1: CBSE BOARD PYQ BANK & STEP-MARKING SCHEMES
           ======================================================== */}
        {subView === 'pyqs' && (
          <div className="space-y-4 pt-3 border-t border-white/[0.06]">
            {/* STEP 1: SUBJECT SELECTOR PILLS */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
                1. Choose Subject:
              </span>
              <div className="flex flex-wrap gap-2">
                {subjectTabs.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubjectChange(sub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
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
            </div>

            {/* STEP 2: CHAPTER DROPDOWN SELECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <div className="md:col-span-2 space-y-1">
                <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium">
                  2. Select Chapter ({subjectChapters.length} Available):
                </label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
                >
                  {subjectChapters.map((ch) => (
                    <option key={ch.id} value={ch.id} className="bg-slate-900 text-slate-200">
                      Ch {ch.chapterNumber}: {ch.name} — [{ch.highYieldWeightage}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct NCERT PDF Link Card */}
              <div className="flex flex-col justify-end space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-medium">
                  Official NCERT PDF:
                </span>
                <a
                  href={currentChapter.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <BookOpen size={14} />
                  <span>Open NCERT PDF ({currentChapter.ncertCode})</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>

            {/* CBSE Section Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-medium mr-1">Section:</span>
              {[
                'All Sections (CBSE Board Full Paper Mix)',
                'Section A: 1M MCQs',
                'Section B & C: 2M/3M Numericals',
                'Section D: 5M Long Answers',
                'Section E: 4M Case-Based',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setQuestionFilter(type)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition ${
                    questionFilter === type
                      ? 'bg-white/[0.1] text-white font-semibold border border-white/[0.15]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {type.split(':')[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            SUBVIEW 2: OFFICIAL NCERT TEXTBOOK FIGURES SELECTOR
           ======================================================== */}
        {subView === 'ncert_diagrams' && (
          <div className="space-y-3 pt-3 border-t border-white/[0.06]">
            <span className="text-[11px] font-mono text-slate-400 uppercase block font-medium">
              Select Official NCERT Textbook Diagram from Dropdown:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <select
                  value={selectedDiagramId}
                  onChange={(e) => setSelectedDiagramId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
                >
                  {OFFICIAL_NCERT_DIAGRAMS.map((diag) => (
                    <option key={diag.id} value={diag.id} className="bg-slate-900 text-slate-200">
                      {diag.figureNumber}: {diag.title} ({diag.subject} • {diag.marksWeightage})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <span className="text-xs text-slate-400 font-mono">
                  {OFFICIAL_NCERT_DIAGRAMS.length} Textbook Plates Available
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          SHOWCASE CONTENT: PYQS OR NCERT DIAGRAMS
         ======================================================== */}

      {subView === 'pyqs' && (
        <>
          {loading && (
            <div className="vault-panel p-10 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 font-sans text-xs">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span>Fetching official CBSE Board Papers (2018–2024) for {currentChapter.name}...</span>
            </div>
          )}

          {pyqData && !loading && (
            <div className="space-y-4">
              {/* Header */}
              <div className="vault-panel rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest">
                    CBSE BOARD QUESTION BANK
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                    {pyqData.chapter_name} ({selectedSubject})
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Weightage: <span className="text-slate-200 font-medium">{pyqData.high_yield_weightage}</span> • {currentChapter.unitName}
                  </p>
                </div>

                <button
                  onClick={handleExportPYQs}
                  className="vault-btn-secondary text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0"
                >
                  <Download size={13} /> Export PYQs (.md)
                </button>
              </div>

              {/* Question Cards */}
              <div className="space-y-3">
                {pyqData.pyq_collection.map((q, idx) => {
                  const isExpanded = !!expandedSolutions[q.id || idx];
                  return (
                    <div
                      key={idx}
                      className="vault-panel rounded-2xl p-5 space-y-3 transition hover:border-white/15"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] text-xs font-mono">
                            {q.year}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono font-medium">
                            {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'} • {q.questionType}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSolution(q.id || idx.toString())}
                          className="text-xs font-sans text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition"
                        >
                          <span>{isExpanded ? 'Hide Solution' : 'View CBSE Model Solution'}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      <div className="text-sm md:text-base font-semibold text-white leading-relaxed font-sans">
                        {q.question}
                      </div>

                      {isExpanded && (
                        <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                          {/* Ideal Model Answer */}
                          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1.5">
                            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                              <Award size={13} className="text-indigo-400" /> CBSE Evaluator Model Answer:
                            </span>
                            <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans">
                              <ReactMarkdown>{q.cbseModelAnswer}</ReactMarkdown>
                            </div>
                          </div>

                          {/* Step-by-Step Marking Scheme */}
                          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] space-y-1.5">
                            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                              <CheckCircle2 size={13} className="text-emerald-400" /> Step-by-Step Mark Allocation:
                            </span>
                            <div className="space-y-1">
                              {q.markingSchemePoints.map((point, pIdx) => (
                                <div key={pIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Common Board Mistakes */}
                          {q.commonMistakes && (
                            <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] text-xs text-slate-400 flex items-start gap-2">
                              <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-400" />
                              <div>
                                <strong className="text-slate-200">Common Mistake: </strong>
                                <span>{q.commonMistakes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Formula & Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="vault-panel rounded-2xl p-5 space-y-2.5">
                  <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Zap size={14} className="text-indigo-400" /> Key Formulas & Laws
                  </span>
                  <div className="space-y-1.5">
                    {pyqData.formula_and_laws_cheat_sheet.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.05] text-xs font-mono text-slate-300">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="vault-panel rounded-2xl p-5 space-y-2.5">
                  <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle size={14} className="text-amber-400" /> Common Exam Traps
                  </span>
                  <div className="space-y-1.5">
                    {pyqData.top_exam_traps.map((trap, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.05] text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{trap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ========================================================
          SUBVIEW 2: OFFICIAL NCERT TEXTBOOK FIGURE BLUEPRINT
         ======================================================== */}
      {subView === 'ncert_diagrams' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div className="vault-panel rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {activeDiagram.figureNumber}
                </span>
                <span className="text-xs text-slate-400">
                  Chapter {activeDiagram.chapterNumber}: {activeDiagram.chapterName}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                {activeDiagram.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Weightage: <strong className="text-slate-200">{activeDiagram.marksWeightage}</strong> • Frequency: {activeDiagram.boardFrequency}
              </p>
            </div>

            <button
              onClick={handleExportDiagram}
              className="vault-btn-secondary text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0"
            >
              <Download size={13} /> Export Diagram Guide (.md)
            </button>
          </div>

          {/* 1. Exact NCERT Textbook Vector Plate */}
          <div className="vault-panel rounded-2xl p-5 space-y-3">
            <NCERTTextbookIllustration figureId={activeDiagram.id} />
          </div>

          {/* 2. Step-by-Step 60-Second Sketching Walkthrough & Labels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Step-by-step Sketching */}
            <div className="vault-panel rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Pencil size={14} className="text-indigo-400" /> Step-by-Step Drawing Guide (Pencil & Ruler)
              </span>
              <div className="space-y-2">
                {activeDiagram.stepByStepDrawingGuide.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.05] flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-white/[0.08] text-slate-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Labels */}
            <div className="vault-panel rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" /> Mandatory CBSE Labels
              </span>
              <div className="space-y-2">
                {activeDiagram.mandatoryLabels.map((label, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.05] flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Board Questions Sample */}
              <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 block uppercase font-medium">
                  Past Board Exam Questions:
                </span>
                {activeDiagram.boardQuestionExamples.map((ex, i) => (
                  <div key={i} className="text-[11px] text-slate-400 p-2 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Board Traps Warning */}
          <div className="vault-panel rounded-2xl p-4 border border-white/[0.08] space-y-2">
            <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle size={14} className="text-amber-400" /> Common Board Exam Traps & Deductions:
            </span>
            <div className="space-y-1.5">
              {activeDiagram.boardExamTraps.map((trap, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{trap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
