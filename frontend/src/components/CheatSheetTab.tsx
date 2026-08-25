'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Zap, Download, FileSpreadsheet } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CheatSheetTabProps {
  subject: string;
  sources: string[];
}

export function CheatSheetTab({ subject, sources }: CheatSheetTabProps) {
  const [selectedSource, setSelectedSource] = useState(sources[0] || '');
  const [docType, setDocType] = useState('Ultimate 1-Page Subject Cheat Sheet');
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const docTypes = [
    'Ultimate 1-Page Subject Cheat Sheet',
    'Complete Formula & Equation Index',
    'Key Concept Comparison & Difference Table',
    '10-Minute Rapid Revision Summary',
    'Top 10 Exam Traps & Misconceptions',
  ];

  const handleGenerate = async () => {
    if (!selectedSource) return;
    setLoading(true);

    try {
      const res = await api.getCheatSheet({
        subject,
        source_file: selectedSource,
        doc_type: docType,
      });
      setContent(res.content);
    } catch {
      alert('Error synthesizing cheat sheet');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject}_${docType.replace(/\s+/g, '_')}.md`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-panel rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="text-amber-400" size={20} />
          <h3 className="text-lg font-bold text-white">Smart Revision & Cheat Sheet Suite</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              {docTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Source Document</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none"
            >
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !selectedSource}
          className="gradient-btn text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          🚀 Synthesize Revision Document
        </button>
      </div>

      {/* Result Display */}
      {content && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="text-indigo-400" size={18} /> {docType}
            </h4>
            <button
              onClick={handleDownload}
              className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow"
            >
              <Download size={13} /> Download (.md)
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
