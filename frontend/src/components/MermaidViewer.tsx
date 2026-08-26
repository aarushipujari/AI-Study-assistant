'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';

interface MermaidViewerProps {
  chart: string;
}

export function MermaidViewer({ chart }: MermaidViewerProps) {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!chart) return;
    try {
      setHasError(false);
      // Clean chart syntax
      const cleanChart = chart.replace(/```mermaid/g, '').replace(/```/g, '').trim();
      const encoded = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(cleanChart))) : '';
      setImgSrc(`https://mermaid.ink/svg/${encoded}`);
    } catch {
      setHasError(true);
    }
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="p-5 rounded-2xl bg-[#090D1A]/95 border border-indigo-500/30 min-h-[220px] flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
        {/* Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs flex items-center gap-1 font-mono transition"
            title="Copy Mermaid Code"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Code'}</span>
          </button>
        </div>

        {/* Vector SVG Viewer */}
        {!hasError && imgSrc ? (
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt="Medical & Anatomical Pathway Diagram"
              onError={() => setHasError(true)}
              className="max-w-full h-auto rounded-xl filter drop-shadow-[0_4px_20px_rgba(99,102,241,0.25)] transition-all"
            />
          </div>
        ) : (
          <div className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-indigo-400 font-bold block mb-2">Diagram Structural Architecture:</span>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-emerald-300">{chart}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
