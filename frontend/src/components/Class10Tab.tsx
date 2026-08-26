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
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Palette,
  FileText,
  Award,
  Layers,
  Pencil,
  Eye,
  Atom,
  Dna,
  Calculator,
  Globe
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Class10Tab() {
  const [subView, setSubView] = useState<'pyqs' | 'ncert_diagrams'>('pyqs');
  const [selectedSubject, setSelectedSubject] = useState<Class10Subject>('Science (Biology)');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bio-ch5');
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(OFFICIAL_NCERT_DIAGRAMS[0].id);
  const [questionFilter, setQuestionFilter] = useState('All Sections (CBSE Board Full Paper Mix)');
  const [pyqData, setPyqData] = useState<Class10PYQResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

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
# 🎓 CBSE Class 10 Board Master Sheet: ${pyqData.chapter_name}
**Subject:** ${selectedSubject} | **Unit:** ${currentChapter.unitName}
**Board Weightage:** ${pyqData.high_yield_weightage}
**Official NCERT Textbook PDF:** ${pyqData.official_ncert_url}

---

## 🎯 Previous Year Questions (PYQs 2018–2024) & CBSE Step-Marking:
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

**⚠️ Common Board Exam Pitfall:**
${q.commonMistakes}
`
  )
  .join('\n---\n')}

---

## ⚡ Chapter Formulae & Key Laws:
${pyqData.formula_and_laws_cheat_sheet.map((f) => `- ${f}`).join('\n')}

## ⚠️ Top CBSE Board Traps:
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
# 🎨 ${activeDiagram.figureNumber}: ${activeDiagram.title}
**Subject:** Class 10 ${activeDiagram.subject} | **Chapter ${activeDiagram.chapterNumber}:** ${activeDiagram.chapterName}
**Board Exam Weightage:** ${activeDiagram.marksWeightage} (${activeDiagram.boardFrequency})

---

## ✏️ Step-by-Step 60-Second Board Drawing Guide:
${activeDiagram.stepByStepDrawingGuide.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## 🏷️ Mandatory CBSE Labels (Scoring Full Marks):
${activeDiagram.mandatoryLabels.map((l) => `- [x] ${l}`).join('\n')}

## ⚠️ Common Board Exam Traps & Deductions:
${activeDiagram.boardExamTraps.map((t) => `- ⚠️ ${t}`).join('\n')}

## 🎯 Sample Questions Asked in Past Board Exams:
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
    { id: 'Science (Biology)', label: '🧬 Biology', icon: <Dna size={14} /> },
    { id: 'Science (Physics)', label: '⚡ Physics', icon: <Zap size={14} /> },
    { id: 'Science (Chemistry)', label: '🧪 Chemistry', icon: <Atom size={14} /> },
    { id: 'Mathematics', label: '📐 Mathematics', icon: <Calculator size={14} /> },
    { id: 'Social Science', label: '🌍 Social Science', icon: <Globe size={14} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Top Suite Header Banner */}
      <div className="vault-panel rounded-3xl p-6 md:p-8 space-y-6 border border-amber-500/30 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0 shadow-lg shadow-amber-500/20">
              <GraduationCap size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-black text-white font-mono uppercase tracking-tight">
                  CBSE Class 10 Board Master Engine
                </h3>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  NCERT 2024-25
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Choose your subject & select any chapter from the dropdown • Exact NCERT figures & verified PYQs (2018–2024)
              </p>
            </div>
          </div>

          {/* Sub-View Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-950 p-1.5 border border-slate-800 font-mono text-xs font-bold shrink-0">
            <button
              onClick={() => setSubView('pyqs')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                subView === 'pyqs'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={14} />
              <span>1. CBSE Board PYQs (2018–2024)</span>
            </button>
            <button
              onClick={() => setSubView('ncert_diagrams')}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
                subView === 'ncert_diagrams'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette size={14} />
              <span>2. Official NCERT Textbook Figures</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            SUBVIEW 1: CBSE BOARD PYQ BANK & STEP-MARKING SCHEMES
           ======================================================== */}
        {subView === 'pyqs' && (
          <div className="space-y-5 pt-2 border-t border-slate-800">
            {/* STEP 1: SUBJECT SELECTOR PILLS */}
            <div>
              <span className="text-xs font-mono font-bold text-amber-300 uppercase block mb-2">
                1. Choose Class 10 Subject:
              </span>
              <div className="flex flex-wrap gap-2">
                {subjectTabs.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubjectChange(sub.id)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition ${
                      selectedSubject === sub.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-400'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: CHAPTER DROPDOWN SELECTOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                  2. Select Chapter from Dropdown ({subjectChapters.length} Available):
                </label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="w-full bg-slate-950 border border-amber-500/40 text-amber-300 text-xs md:text-sm font-mono font-bold rounded-xl p-3 focus:outline-none focus:border-amber-400"
                >
                  {subjectChapters.map((ch) => (
                    <option key={ch.id} value={ch.id} className="bg-slate-900 text-slate-200">
                      Chapter {ch.chapterNumber}: {ch.name} — [{ch.highYieldWeightage}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct NCERT PDF Link Card */}
              <div className="flex flex-col justify-end space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                  Official Textbook PDF:
                </span>
                <a
                  href={currentChapter.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <BookOpen size={14} />
                  <span>Open NCERT PDF ({currentChapter.ncertCode})</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>

            {/* CBSE Section Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">Board Section:</span>
              {[
                'All Sections (CBSE Board Full Paper Mix)',
                'Section A: 1-Mark MCQs & Assertion-Reason',
                'Section B & C: 2M & 3M Numericals / Short Answer',
                'Section D: 5-Mark Long Answer & Derivations',
                'Section E: 4-Mark Case-Based Integrated',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setQuestionFilter(type)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl transition ${
                    questionFilter === type
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
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
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase block">
              Select Official NCERT Textbook Diagram from Dropdown:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <select
                  value={selectedDiagramId}
                  onChange={(e) => setSelectedDiagramId(e.target.value)}
                  className="w-full bg-slate-950 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-mono font-bold rounded-xl p-3 focus:outline-none focus:border-cyan-400"
                >
                  {OFFICIAL_NCERT_DIAGRAMS.map((diag) => (
                    <option key={diag.id} value={diag.id} className="bg-slate-900 text-slate-200">
                      {diag.figureNumber}: {diag.title} ({diag.subject} • {diag.marksWeightage})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <span className="text-xs font-mono text-slate-400">
                  {OFFICIAL_NCERT_DIAGRAMS.length} High-Yield NCERT Plates Loaded
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
            <div className="vault-panel p-10 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-300 font-mono text-xs">
              <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span>Fetching official CBSE Board Papers (2018–2024) for {currentChapter.name}...</span>
            </div>
          )}

          {pyqData && !loading && (
            <div className="space-y-6">
              {/* Header */}
              <div className="vault-panel rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-l-amber-400">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    OFFICIAL CBSE BOARD QUESTION BANK
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                    {pyqData.chapter_name} ({selectedSubject})
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Board Weightage: <span className="text-amber-300 font-bold">{pyqData.high_yield_weightage}</span> • {currentChapter.unitName}
                  </p>
                </div>

                <button
                  onClick={handleExportPYQs}
                  className="vault-btn-emerald text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
                >
                  <Download size={14} /> Export Chapter PYQs (.md)
                </button>
              </div>

              {/* Question Cards */}
              <div className="space-y-4">
                {pyqData.pyq_collection.map((q, idx) => {
                  const isExpanded = !!expandedSolutions[q.id || idx];
                  return (
                    <div
                      key={idx}
                      className="vault-panel rounded-3xl p-6 border-l-4 border-l-amber-400 space-y-4 shadow-lg"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                            {q.year}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                            {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'} • {q.questionType}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSolution(q.id || idx.toString())}
                          className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold transition"
                        >
                          <span>{isExpanded ? 'Hide Model Solution' : 'View CBSE Model Solution'}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      <div className="text-base md:text-lg font-bold text-white leading-relaxed font-sans pt-1">
                        {q.question}
                      </div>

                      {isExpanded && (
                        <div className="space-y-4 pt-3 border-t border-slate-800">
                          {/* Ideal Model Answer */}
                          <div className="p-4 rounded-2xl bg-slate-900/95 border border-amber-500/30 space-y-2">
                            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                              <Award size={14} /> Official CBSE Evaluator Model Answer:
                            </span>
                            <div className="prose prose-invert max-w-none text-xs text-slate-200 leading-relaxed font-sans">
                              <ReactMarkdown>{q.cbseModelAnswer}</ReactMarkdown>
                            </div>
                          </div>

                          {/* Step-by-Step Marking Scheme */}
                          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
                            <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-1.5 uppercase">
                              <CheckCircle2 size={14} /> Step-by-Step Mark Allocation (How Examiners Grade):
                            </span>
                            <div className="space-y-1.5">
                              {q.markingSchemePoints.map((point, pIdx) => (
                                <div key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Common Board Mistakes */}
                          {q.commonMistakes && (
                            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                              <div>
                                <strong className="block text-white">⚠️ Common Board Student Mistake:</strong>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="vault-panel rounded-3xl p-6 space-y-3 border border-indigo-500/30">
                  <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
                    <Zap size={15} /> ⚡ Essential Formulas, Equations & Laws
                  </span>
                  <div className="space-y-2">
                    {pyqData.formula_and_laws_cheat_sheet.map((f, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="vault-panel rounded-3xl p-6 space-y-3 border border-amber-500/30">
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                    <AlertTriangle size={15} /> ⚠️ Top CBSE Board Traps & Misconceptions
                  </span>
                  <div className="space-y-2">
                    {pyqData.top_exam_traps.map((trap, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
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
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="vault-panel rounded-3xl p-6 border-l-4 border-l-cyan-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activeDiagram.figureNumber}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Chapter {activeDiagram.chapterNumber}: {activeDiagram.chapterName}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                {activeDiagram.title}
              </h3>
              <p className="text-xs font-mono text-amber-300 mt-1">
                Board Weightage: <strong>{activeDiagram.marksWeightage}</strong> • Frequency: {activeDiagram.boardFrequency}
              </p>
            </div>

            <button
              onClick={handleExportDiagram}
              className="vault-btn-emerald text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
            >
              <Download size={14} /> Export Diagram Guide (.md)
            </button>
          </div>

          {/* 1. Exact NCERT Textbook Vector Plate */}
          <div className="vault-panel rounded-3xl p-6 space-y-3">
            <NCERTTextbookIllustration figureId={activeDiagram.id} />
          </div>

          {/* 2. Step-by-Step 60-Second Sketching Walkthrough & Labels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step-by-step Sketching */}
            <div className="vault-panel rounded-3xl p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <Pencil size={15} /> 2. Step-by-Step 60-Second Drawing Walkthrough (Pencil & Ruler)
              </span>
              <div className="space-y-3">
                {activeDiagram.stepByStepDrawingGuide.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Labels */}
            <div className="vault-panel rounded-3xl p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 size={15} /> 3. Mandatory CBSE Marking Scheme Labels (Guarantees Full Marks)
              </span>
              <div className="space-y-2.5">
                {activeDiagram.mandatoryLabels.map((label, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-purple-500/20 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 size={15} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Board Questions Sample */}
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                  🎯 Repeated in Past CBSE Board Papers:
                </span>
                {activeDiagram.boardQuestionExamples.map((ex, i) => (
                  <div key={i} className="text-[11px] font-mono text-slate-300 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Board Traps Warning */}
          <div className="vault-panel rounded-3xl p-6 border border-rose-500/30 bg-rose-950/15 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle size={15} /> ⚠️ Critical CBSE Board Traps & Common Marks Deductions:
            </span>
            <div className="space-y-2">
              {activeDiagram.boardExamTraps.map((trap, i) => (
                <div key={i} className="text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
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
