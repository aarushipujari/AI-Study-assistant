'use client';

import React, { useState, useEffect } from 'react';
import { api, Class10PYQResponse } from '@/lib/api';
import { CLASS10_CHAPTERS, NCERTChapter } from '@/lib/class10-data';
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
  FileText,
  Award
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Class10Tab() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CLASS10_CHAPTERS[0].id);
  const [questionFilter, setQuestionFilter] = useState('All Sections (CBSE Board Full Paper Mix)');
  const [pyqData, setPyqData] = useState<Class10PYQResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const currentChapter = CLASS10_CHAPTERS.find((c) => c.id === selectedChapterId) || CLASS10_CHAPTERS[0];

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
    fetchPYQs(selectedChapterId);
  }, [selectedChapterId, questionFilter]);

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExport = () => {
    if (!pyqData) return;
    const text = `
# 🎓 CBSE Class 10 Board Master Sheet: ${pyqData.chapter_name}
**Subject:** ${pyqData.subject} | **Board Weightage:** ${pyqData.high_yield_weightage}
**Official NCERT Textbook PDF:** ${pyqData.official_ncert_url}

---

## 🎯 Previous Year Questions (PYQs) & Step-Marking Schemes:
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
    a.download = `CBSE_Class10_${currentChapter.name.replace(/\s+/g, '_')}_PYQ_Guide.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection & NCERT Link Banner */}
      <div className="vault-panel rounded-3xl p-6 md:p-8 space-y-5 border border-amber-500/30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <GraduationCap size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold text-white font-mono">
                  CBSE Class 10 Board Master Suite
                </h3>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  NCERT 2024-25 SYLLABUS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-loaded official NCERT chapters, real CBSE board PYQs (2018–2024), and step-marking schemes
              </p>
            </div>
          </div>

          {/* Direct NCERT Official Textbook Link Button */}
          <a
            href={currentChapter.officialPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition shadow-md shrink-0"
          >
            <BookOpen size={14} />
            <span>Open Official NCERT PDF ({currentChapter.ncertCode})</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>

        {/* Chapter Grid Selector */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
            Select NCERT Chapter (No upload needed — Pre-indexed from NCERT):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {CLASS10_CHAPTERS.map((ch) => {
              const isSelected = selectedChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`text-left p-3 rounded-xl border text-xs font-mono transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 border-amber-400 text-white font-bold shadow-md ring-1 ring-amber-400/50'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-amber-400 block opacity-80">{ch.subject}</span>
                    <span className="truncate">{ch.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-400 shrink-0">
                    {ch.highYieldWeightage}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">CBSE Section Filter:</span>
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

      {/* Loading State */}
      {loading && (
        <div className="vault-panel p-10 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-300 font-mono text-xs">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Curating real CBSE Board PYQs, step-by-step model answers, and evaluator marking schemes...</span>
        </div>
      )}

      {/* PYQs Showcase */}
      {pyqData && (
        <div className="space-y-6">
          {/* Chapter Metadata & Export Header */}
          <div className="vault-panel rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                OFFICIAL CBSE BOARD QUESTION BANK
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">
                {pyqData.chapter_name} ({pyqData.subject})
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Board Weightage: <span className="text-amber-300 font-bold">{pyqData.high_yield_weightage}</span> • {pyqData.pyq_collection.length} Curated Questions
              </p>
            </div>

            <button
              onClick={handleExport}
              className="vault-btn-emerald text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
            >
              <Download size={14} /> Export Board PYQ Sheet (.md)
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
                  {/* Top Badges */}
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

                  {/* Question Text */}
                  <div className="text-base md:text-lg font-bold text-white leading-relaxed font-sans pt-1">
                    {q.question}
                  </div>

                  {/* Collapsible Model Answer & Marking Scheme */}
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

          {/* Bottom High-Yield Cheat Sheet & Traps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Formulas & Laws */}
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

            {/* Top Exam Traps */}
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
    </div>
  );
}
