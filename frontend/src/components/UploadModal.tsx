'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const [subject, setSubject] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!subject.trim() || files.length === 0) return;
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await api.uploadNotes(subject.trim(), files);
      setSuccessMsg(`🎉 Successfully indexed ${res.new_chunks_count} chunks for "${subject}"!`);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSubject('');
        setFiles([]);
        setSuccessMsg('');
      }, 1500);
    } catch {
      alert('Error uploading PDF notes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 relative border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Upload size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Ingest New Lecture Notes</h3>
            <p className="text-xs text-slate-400">PDFs will be parsed, chunked, and vectorized via FAISS</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Subject / Unit Name</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Digital Circuits, Quantum Physics"
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Select PDF Notes / Slides</label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="w-full bg-slate-800/80 border border-dashed border-slate-700 text-slate-300 text-xs rounded-xl p-4 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white"
            />
          </div>

          {files.length > 0 && (
            <div className="p-3 bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-400">Selected Files:</span>
              {files.map((f, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                  <FileText size={13} className="text-indigo-400 shrink-0" /> {f.name} ({(f.size / 1024).toFixed(0)} KB)
                </div>
              ))}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={loading || !subject.trim() || files.length === 0}
              className="gradient-btn px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Chunking & Vectorizing...
                </>
              ) : (
                'Process & Vectorize'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
