'use client';

import React, { useState } from 'react';
import { api, DiagramData } from '@/lib/api';
import { MermaidViewer } from './MermaidViewer';
import { 
  Palette, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  Stethoscope, 
  Eye, 
  Lightbulb, 
  Activity, 
  ArrowRight,
  Pencil
} from 'lucide-react';

interface DiagramsTabProps {
  subject: string;
}

export function DiagramsTab({ subject }: DiagramsTabProps) {
  const [topic, setTopic] = useState('');
  const [diagramType, setDiagramType] = useState('🩺 Anatomical Sketch & Exam Drawing Guide');
  const [diagramData, setDiagramData] = useState<DiagramData | null>(null);
  const [loading, setLoading] = useState(false);

  const quickMedicalTopics = [
    { title: 'Renin-Angiotensin-Aldosterone System (RAAS)', icon: '🧪' },
    { title: 'Nephron & Counter-Current Mechanism', icon: '🫘' },
    { title: 'Cardiac Conduction System & ECG Vectors', icon: '🫀' },
    { title: 'Circle of Willis (Cerebral Circulation)', icon: '🧠' },
    { title: 'Coagulation Cascade (Intrinsic vs Extrinsic)', icon: '🩸' },
    { title: 'Brachial Plexus & Nerve Branches', icon: '⚡' },
    { title: 'Kreb\'s Citric Acid Cycle & ATP Yield', icon: '🧬' },
    { title: 'Action Potential Phases in Cardiac Myocyte', icon: '📈' },
  ];

  const handleGenerate = async (topicToFetch?: string) => {
    const t = topicToFetch || topic;
    if (!t.trim() || loading) return;

    setLoading(true);
    setDiagramData(null);

    try {
      const res = await api.getDiagram({
        subject,
        topic: t,
        diagram_type: diagramType,
      });
      setDiagramData(res);
      setTopic(t);
    } catch {
      alert('Error synthesizing medical diagram and drawing guide.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!diagramData) return;
    const text = `
# 🩺 ${diagramData.title}
**Subject:** ${subject.toUpperCase()} | **Type:** ${diagramType}

## 📊 Mermaid Diagram Code:
\`\`\`mermaid
${diagramData.mermaid_code}
\`\`\`

## 🎨 Step-by-Step 60-Second Exam Drawing Guide:
${diagramData.drawing_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## 🏷️ Essential Labels & Marks Checklist:
${diagramData.labels_checklist.map((l) => `- [x] ${l}`).join('\n')}

## 🖍️ Color Coding Guide:
${diagramData.color_coding_guide.map((c) => `- ${c}`).join('\n')}

## 💡 High-Yield Clinical Mnemonic:
${diagramData.high_yield_mnemonics}

## 🏥 Clinical & Exam Correlation:
${diagramData.clinical_correlation}
    `.trim();

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diagramData.title.replace(/\s+/g, '_')}_drawing_guide.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="vault-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Stethoscope size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                MBBS & Medical Visual Diagram Suite
              </h3>
              <p className="text-xs text-slate-400">
                Interactive flowcharts, step-by-step sketching instructions, and exam scoring label checklists
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
            ANATOMY / PHYSIO ENGINE
          </span>
        </div>

        {/* Quick Topic Chips */}
        <div>
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
            ⚡ High-Yield MBBS & Science Preset Diagrams:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickMedicalTopics.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(item.title)}
                className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 text-indigo-300 border border-indigo-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-1.5 shadow-sm"
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Mode Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Target Organ / Pathway / Mechanism to Draw
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., Circle of Willis, RAAS, Brachial Plexus, Cardiac Cycle..."
              className="w-full bg-slate-900/90 border border-slate-700 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Diagram Protocol Type
            </label>
            <select
              value={diagramType}
              onChange={(e) => setDiagramType(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option>🩺 Anatomical Sketch & Exam Drawing Guide</option>
              <option>🧬 Physiological & Biochemical Flowchart</option>
              <option>🏥 Clinical Diagnostic Pathway / Algorithm</option>
              <option>⚡ System Circuit & Vector Architecture</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !topic.trim()}
          className="vault-btn-primary text-white text-xs font-bold font-mono px-6 py-3 rounded-2xl flex items-center gap-2 uppercase tracking-wider disabled:opacity-50"
        >
          <Pencil size={15} /> Synthesize Interactive Diagram & Drawing Guide
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="vault-panel p-8 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-300 font-mono text-xs">
          <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Generating anatomical vectors, step-by-step sketching breakdown, and mark-scoring checklist...</span>
        </div>
      )}

      {/* Active Diagram Showcase */}
      {diagramData && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="vault-panel rounded-3xl p-6 border-l-4 border-l-cyan-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                OFFICIAL EXAM DIAGRAM BLUEPRINT
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">{diagramData.title}</h3>
            </div>
            <button
              onClick={handleExport}
              className="vault-btn-emerald text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"
            >
              <Download size={14} /> Export Drawing Sheet (.md)
            </button>
          </div>

          {/* 1. Interactive Vector Flowchart / Pathway */}
          <div className="vault-panel rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
                <Eye size={15} /> 1. Interactive Visual Pathway / Structural Vector
              </span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                MERMAID VECTOR ENGINE
              </span>
            </div>
            <MermaidViewer chart={diagramData.mermaid_code} />
          </div>

          {/* 2. Step-by-Step 60-Second Exam Sketching Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="vault-panel rounded-3xl p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <Pencil size={15} /> 2. Step-by-Step 60-Second Drawing Walkthrough
              </span>
              <div className="space-y-3">
                {diagramData.drawing_steps.map((step, idx) => (
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

            {/* 3. Essential Labels & Mark-Scoring Checklist */}
            <div className="vault-panel rounded-3xl p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 size={15} /> 3. Essential Exam Labels Checklist (Scores Full Marks)
              </span>
              <div className="space-y-2.5">
                {diagramData.labels_checklist.map((label, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-purple-500/20 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 size={15} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Color Coding Rules */}
              {diagramData.color_coding_guide.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-2 uppercase">
                    🖍️ Anatomical Pen/Color Guidelines:
                  </span>
                  <div className="space-y-1">
                    {diagramData.color_coding_guide.map((col, idx) => (
                      <div key={idx} className="text-[11px] font-mono text-slate-300">
                        {col}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Clinical Mnemonic & High-Yield Exam Pegs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="vault-panel rounded-3xl p-5 border border-amber-500/30 bg-amber-950/15 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                <Lightbulb size={15} /> 💡 High-Yield Clinical Mnemonic
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {diagramData.high_yield_mnemonics}
              </p>
            </div>

            <div className="vault-panel rounded-3xl p-5 border border-cyan-500/30 bg-cyan-950/15 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 uppercase">
                <Activity size={15} /> 🏥 MBBS Ward & Exam Correlation
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {diagramData.clinical_correlation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
