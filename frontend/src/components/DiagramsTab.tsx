'use client';

import React, { useState } from 'react';
import { api, DiagramData } from '@/lib/api';
import { MermaidViewer } from './MermaidViewer';
import { 
  Palette, 
  CheckCircle2, 
  Download, 
  Stethoscope, 
  Eye, 
  Lightbulb, 
  Activity, 
  Pencil,
  GraduationCap,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface DiagramsTabProps {
  subject: string;
}

export function DiagramsTab({ subject }: DiagramsTabProps) {
  const isClass10 = subject.toLowerCase().includes('class 10') || subject.toLowerCase().includes('cbse') || subject.toLowerCase().includes('ncert');

  const [topic, setTopic] = useState('');
  const [diagramType, setDiagramType] = useState(
    isClass10 
      ? 'NCERT Ray Diagram & Drawing Guide' 
      : 'Anatomical Sketch & Exam Drawing Guide'
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
# ${diagramData.title}
**Class:** ${isClass10 ? 'Class 10 CBSE Science (NCERT)' : subject} | **Protocol Type:** ${diagramType}

---

## Schematic Architecture:
\`\`\`mermaid
${diagramData.mermaid_code}
\`\`\`

## Step-by-Step 60-Second Board Drawing Guide:
${diagramData.drawing_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Mandatory CBSE Labels & Marks Checklist:
${diagramData.labels_checklist.map((l) => `- [x] ${l}`).join('\n')}

## Ray Arrows / Label Leader Line Rules:
${diagramData.color_coding_guide.map((c) => `- ${c}`).join('\n')}

## High-Yield Board Exam Mnemonic / Sign Conventions:
${diagramData.high_yield_mnemonics}

## CBSE Board Exam Pitfalls & Traps:
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
    <div className="space-y-5">
      {/* Configuration Header */}
      <div className="vault-panel rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              {isClass10 ? <GraduationCap size={22} /> : <Stethoscope size={20} />}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white font-sans">
                {isClass10 
                  ? 'NCERT Diagrams & Ray Optics Suite' 
                  : 'Visual Diagram & Anatomical Suite'}
              </h3>
              <p className="text-xs text-slate-400">
                {isClass10
                  ? 'Official ray optics, biology sketches, circuit diagrams & step-by-step drawing walkthroughs'
                  : 'Interactive flowcharts, step-by-step sketching instructions, and exam scoring label checklists'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08] shrink-0">
            {isClass10 ? 'NCERT ENGINE' : 'ANATOMY ENGINE'}
          </span>
        </div>

        {/* Quick 10th Standard Preset Chips */}
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
            High-Yield NCERT Diagrams:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {activePresets.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(item.title)}
                className="text-xs p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.06] transition flex items-center gap-2 text-left"
              >
                <span className="text-sm shrink-0">{item.icon}</span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Mode Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium">
              {isClass10 ? 'Topic to Draw' : 'Target Organ / Pathway'}
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
              className="w-full bg-slate-950 border border-slate-700/80 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium">
              Diagram Type
            </label>
            <select
              value={diagramType}
              onChange={(e) => setDiagramType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 font-sans"
            >
              {isClass10 ? (
                <>
                  <option>NCERT Ray Diagram & Drawing Guide</option>
                  <option>NCERT Biology Anatomical Sketch</option>
                  <option>Chemistry Apparatus & Electron Dot</option>
                  <option>Electrical Circuit & Magnetic Lines</option>
                </>
              ) : (
                <>
                  <option>Anatomical Sketch & Drawing Guide</option>
                  <option>Physiological Flowchart</option>
                  <option>Clinical Diagnostic Algorithm</option>
                  <option>System Circuit Architecture</option>
                </>
              )}
            </select>
          </div>
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={loading || !topic.trim()}
          className="vault-btn-primary text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 disabled:opacity-50 cursor-pointer transition"
        >
          <Pencil size={14} /> <span>Generate Diagram Guide</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="vault-panel p-10 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-400 font-sans text-xs">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Generating NCERT diagram, sketching breakdown, and CBSE marking checklist...</span>
        </div>
      )}

      {/* Active Diagram Showcase */}
      {diagramData && (
        <div className="space-y-4">
          {/* Header Banner */}
          <div className="vault-panel rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-widest">
                CBSE CLASS 10 BOARD BLUEPRINT
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">{diagramData.title}</h3>
            </div>
            <button
              onClick={handleExport}
              className="vault-btn-secondary text-xs font-medium px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Download size={13} /> Export Drawing Guide (.md)
            </button>
          </div>

          {/* 1. Schematic Flow */}
          <div className="vault-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Eye size={14} className="text-indigo-400" /> Functional Schematic & Flow
              </span>
              <span className="text-[10px] font-mono bg-white/[0.05] text-slate-400 px-2 py-0.5 rounded border border-white/[0.08]">
                NCERT VECTOR
              </span>
            </div>
            <MermaidViewer chart={diagramData.mermaid_code} />
          </div>

          {/* 2. Step-by-Step 60-Second Sketching Walkthrough & Labels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="vault-panel rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Pencil size={14} className="text-indigo-400" /> Step-by-Step Drawing Guide
              </span>
              <div className="space-y-2">
                {diagramData.drawing_steps.map((step, idx) => (
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

            {/* 3. Essential Labels & Mark-Scoring Checklist */}
            <div className="vault-panel rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" /> Mandatory CBSE Labels
              </span>
              <div className="space-y-2">
                {diagramData.labels_checklist.map((label, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.05] flex items-start gap-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Color Coding & Arrows */}
              {diagramData.color_coding_guide.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1.5 uppercase font-medium">
                    Leader Line & Arrow Rules:
                  </span>
                  <div className="space-y-1">
                    {diagramData.color_coding_guide.map((col, idx) => (
                      <div key={idx} className="text-[11px] font-mono text-slate-400">
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
            <div className="vault-panel rounded-2xl p-4 space-y-1.5">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase">
                <Lightbulb size={14} className="text-indigo-400" /> Board Exam Mnemonic
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {diagramData.high_yield_mnemonics}
              </p>
            </div>

            <div className="vault-panel rounded-2xl p-4 border border-white/[0.08] space-y-1.5">
              <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5 uppercase">
                <AlertTriangle size={14} className="text-amber-400" /> Common Board Mistakes
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {diagramData.clinical_correlation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
