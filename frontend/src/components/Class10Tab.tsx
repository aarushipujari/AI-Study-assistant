'use client';

import React, { useState, useEffect } from 'react';
import { OFFICIAL_NCERT_DIAGRAMS, NCERTDiagram } from '@/lib/class10-ncert-diagrams';
import { NCERTTextbookIllustration } from './NCERTTextbookIllustrations';
import { MarksAppPYQViewer } from './MarksAppPYQViewer';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Palette,
  FileText,
  Pencil
} from 'lucide-react';

interface Class10TabProps {
  initialView?: 'pyqs' | 'ncert_diagrams';
}

export function Class10Tab({ initialView = 'pyqs' }: Class10TabProps) {
  const [subView, setSubView] = useState<'pyqs' | 'ncert_diagrams'>(initialView);
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(OFFICIAL_NCERT_DIAGRAMS[0].id);

  useEffect(() => {
    if (initialView) {
      setSubView(initialView);
    }
  }, [initialView]);

  const activeDiagram = OFFICIAL_NCERT_DIAGRAMS.find((d) => d.id === selectedDiagramId) || OFFICIAL_NCERT_DIAGRAMS[0];

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

  return (
    <div className="space-y-4 font-sans text-slate-200">
      {/* Sub-View Switcher Pill Bar */}
      <div className="vault-panel p-1 rounded-xl flex items-center justify-between gap-2 border border-white/[0.08]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSubView('pyqs')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition ${
              subView === 'pyqs'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <FileText size={14} />
            <span>MARKS App PYQ Practice</span>
          </button>
          <button
            onClick={() => setSubView('ncert_diagrams')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition ${
              subView === 'ncert_diagrams'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Palette size={14} />
            <span>NCERT Textbook Figures</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400 px-3 hidden sm:inline">
          CBSE 10th Boards 2024-25
        </span>
      </div>

      {/* ========================================================
          1. SUBVIEW 1: MARKS APP PYQ PRACTICE ARENA
         ======================================================== */}
      {subView === 'pyqs' && <MarksAppPYQViewer />}

      {/* ========================================================
          2. SUBVIEW 2: OFFICIAL NCERT TEXTBOOK FIGURE BLUEPRINT
         ======================================================== */}
      {subView === 'ncert_diagrams' && (
        <div className="space-y-4">
          {/* Header Banner & Selector */}
          <div className="vault-panel rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
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

            {/* Dropdown */}
            <div className="pt-2 border-t border-white/[0.06]">
              <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium mb-1">
                Select NCERT Textbook Figure:
              </label>
              <select
                value={selectedDiagramId}
                onChange={(e) => setSelectedDiagramId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
              >
                {OFFICIAL_NCERT_DIAGRAMS.map((diag) => (
                  <option key={diag.id} value={diag.id} className="bg-slate-900 text-slate-200">
                    {diag.figureNumber}: {diag.title} ({diag.subject} • {diag.marksWeightage})
                  </option>
                ))}
              </select>
            </div>
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
