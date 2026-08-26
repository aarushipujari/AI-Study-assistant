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
  Pencil,
  GraduationCap,
  Zap
} from 'lucide-react';

interface DiagramsTabProps {
  subject: string;
}

export function DiagramsTab({ subject }: DiagramsTabProps) {
  const isClass10 = subject.toLowerCase().includes('class 10') || subject.toLowerCase().includes('cbse') || subject.toLowerCase().includes('ncert');

  const [topic, setTopic] = useState('');
  const [diagramType, setDiagramType] = useState(
    isClass10 
      ? '📐 NCERT Ray Diagram & Board Exam Drawing Guide' 
      : '🩺 Anatomical Sketch & Exam Drawing Guide'
  );
  const [diagramData, setDiagramData] = useState<DiagramData | null>(null);
  const [loading, setLoading] = useState(false);

  // 10th Standard Specific NCERT Topics
  const class10PresetTopics = [
    { title: 'Concave Mirror Ray Diagram (Object between P and F)', icon: '🪞' },
    { title: 'Myopia & Hypermetropia Eye Defects and Lens Correction', icon: '🔍' },
    { title: 'Refraction through Prism & VIBGYOR Dispersion', icon: '🌈' },
    { title: 'Human Heart Sectional View & Double Circulation', icon: '🫀' },
    { title: 'Structure of a Nephron & Urine Formation', icon: '🫘' },
    { title: 'Magnetic Field Lines of a Current-Carrying Solenoid', icon: '⚡' },
    { title: 'Electrolysis of Water (2:1 H2 to O2 Volume Ratio)', icon: '🧪' },
    { title: 'Soap Micelle Cleansing Mechanism on Oil Droplet', icon: '🧼' },
    { title: 'Reflex Arc Pathway & Neuron Synapse', icon: '🧠' },
    { title: 'Longitudinal Section (LS) of a Flower', icon: '🌸' },
    { title: 'Ohm\'s Law Verification Circuit Diagram', icon: '🔌' },
    { title: 'Open and Closed Stomatal Pore with Guard Cells', icon: '🔬' },
  ];

  const medicalPresetTopics = [
    { title: 'Renin-Angiotensin-Aldosterone System (RAAS)', icon: '🧪' },
    { title: 'Nephron & Counter-Current Mechanism', icon: '🫘' },
    { title: 'Cardiac Conduction System & ECG Vectors', icon: '🫀' },
    { title: 'Circle of Willis (Cerebral Circulation)', icon: '🧠' },
    { title: 'Coagulation Cascade (Intrinsic vs Extrinsic)', icon: '🩸' },
    { title: 'Brachial Plexus & Nerve Branches', icon: '⚡' },
    { title: 'Kreb\'s Citric Acid Cycle & ATP Yield', icon: '🧬' },
    { title: 'Action Potential Phases in Cardiac Myocyte', icon: '📈' },
  ];

  const activePresets = isClass10 ? class10PresetTopics : medicalPresetTopics;

  const handleGenerate = async (topicToFetch?: string) => {
    const t = topicToFetch || topic;
    if (!t.trim() || loading) return;

    setLoading(true);
    setDiagramData(null);

    try {
      const res = await api.getDiagram({
        subject: isClass10 ? 'Class 10 CBSE Science (NCERT Textbook)' : subject,
        topic: t,
        diagram_type: diagramType,
      });
      setDiagramData(res);
      setTopic(t);
    } catch {
      alert('Error synthesizing NCERT diagram and drawing guide.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!diagramData) return;
    const text = `
# 📐 ${diagramData.title}
**Class:** ${isClass10 ? 'Class 10 CBSE Science (NCERT)' : subject} | **Protocol Type:** ${diagramType}

---

## 📊 Schematic Architecture:
\`\`\`mermaid
${diagramData.mermaid_code}
\`\`\`

## ✏️ Step-by-Step 60-Second Board Drawing Guide:
${diagramData.drawing_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## 🏷️ Mandatory CBSE Labels & Marks Checklist:
${diagramData.labels_checklist.map((l) => `- [x] ${l}`).join('\n')}

## 🖍️ Color Coding / Ray Arrow Guidelines:
${diagramData.color_coding_guide.map((c) => `- ${c}`).join('\n')}

## 💡 High-Yield Board Exam Mnemonic / Sign Conventions:
${diagramData.high_yield_mnemonics}

## ⚠️ CBSE Board Exam Pitfalls & Traps:
${diagramData.clinical_correlation}
    `.trim();

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_Class10_${diagramData.title.replace(/\s+/g, '_')}_Guide.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="vault-panel rounded-3xl p-6 md:p-8 space-y-5 border border-amber-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              {isClass10 ? <GraduationCap size={26} /> : <Stethoscope size={24} />}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-mono">
                {isClass10 
                  ? 'CBSE Class 10 NCERT Diagrams & Ray Optics Suite' 
                  : 'MBBS & Medical Visual Diagram Suite'}
              </h3>
              <p className="text-xs text-slate-400">
                {isClass10
                  ? 'Official 10th standard ray optics, biology sketches, circuit diagrams & 60-second pencil drawing guides'
                  : 'Interactive flowcharts, step-by-step sketching instructions, and exam scoring label checklists'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase shrink-0">
            {isClass10 ? '10TH STD NCERT ENGINE' : 'ANATOMY / PHYSIO ENGINE'}
          </span>
        </div>

        {/* Quick 10th Standard Preset Chips */}
        <div>
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block mb-2">
            ⚡ High-Yield Class 10th NCERT Textbook Diagrams:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {activePresets.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(item.title)}
                className="text-xs font-mono font-semibold p-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-950/40 text-amber-200 border border-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2 text-left shadow-sm"
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Mode Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              {isClass10 ? 'Target Class 10th Topic to Draw' : 'Target Organ / Pathway to Draw'}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder={
                isClass10
                  ? 'e.g. Concave mirror between P and F, Human Heart, Nephron, Refraction in Prism, Stomata...'
                  : 'e.g. Circle of Willis, RAAS, Brachial Plexus, Cardiac Cycle...'
              }
              className="w-full bg-slate-900/90 border border-slate-700 text-white text-xs md:text-sm rounded-xl p-3 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
              Diagram Protocol Type
            </label>
            <select
              value={diagramType}
              onChange={(e) => setDiagramType(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-amber-400 font-mono"
            >
              {isClass10 ? (
                <>
                  <option>📐 NCERT Ray Diagram & Board Exam Drawing Guide</option>
                  <option>🧬 NCERT Biology Anatomical Sketch (Heart, Nephron, Stomata)</option>
                  <option>🧪 Chemistry Apparatus Setup & Electron Dot Structure</option>
                  <option>⚡ Electrical Circuit & Magnetic Field Lines</option>
                </>
              ) : (
                <>
                  <option>🩺 Anatomical Sketch & Exam Drawing Guide</option>
                  <option>🧬 Physiological & Biochemical Flowchart</option>
                  <option>🏥 Clinical Diagnostic Pathway / Algorithm</option>
                  <option>⚡ System Circuit & Vector Architecture</option>
                </>
              )}
            </select>
          </div>
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !topic.trim()}
          className="vault-btn-emerald text-white text-xs font-bold font-mono px-6 py-3.5 rounded-2xl flex items-center gap-2 uppercase tracking-wider disabled:opacity-50 cursor-pointer"
        >
          <Pencil size={15} /> Synthesize 10th Standard Diagram & 60-Sec Sketch Guide
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="vault-panel p-10 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-300 font-mono text-xs">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Generating 10th standard NCERT diagram, step-by-step sketching breakdown, and CBSE marking checklist...</span>
        </div>
      )}

      {/* Active Diagram Showcase */}
      {diagramData && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="vault-panel rounded-3xl p-6 border-l-4 border-l-amber-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                OFFICIAL CBSE CLASS 10 BOARD BLUEPRINT
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-1">{diagramData.title}</h3>
            </div>
            <button
              onClick={handleExport}
              className="vault-btn-emerald text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"
            >
              <Download size={14} /> Export 10th Drawing Guide (.md)
            </button>
          </div>

          {/* 1. Schematic Flow */}
          <div className="vault-panel rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
                <Eye size={15} /> 1. Functional Schematic & Flow Architecture
              </span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                NCERT VECTOR ENGINE
              </span>
            </div>
            <MermaidViewer chart={diagramData.mermaid_code} />
          </div>

          {/* 2. Step-by-Step 60-Second Sketching Walkthrough & Labels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="vault-panel rounded-3xl p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
                <Pencil size={15} /> 2. Step-by-Step 60-Second Pencil & Ruler Sketching Guide
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
                <CheckCircle2 size={15} /> 3. Mandatory CBSE Marking Scheme Labels (Guarantees Full Marks)
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

              {/* Color Coding & Arrows */}
              {diagramData.color_coding_guide.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-2 uppercase">
                    🖍️ Ray Arrows & Label Leader Line Rules:
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

          {/* 4. Board Traps & Mnemonics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="vault-panel rounded-3xl p-5 border border-amber-500/30 bg-amber-950/15 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                <Lightbulb size={15} /> 💡 High-Yield Board Exam Mnemonic
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {diagramData.high_yield_mnemonics}
              </p>
            </div>

            <div className="vault-panel rounded-3xl p-5 border border-rose-500/30 bg-rose-950/15 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-1.5 uppercase">
                <Activity size={15} /> ⚠️ Critical CBSE Board Traps & Mistakes
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
