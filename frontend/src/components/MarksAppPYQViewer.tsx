'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CLASS10_CHAPTERS, Class10Subject, NCERTChapter } from '@/lib/class10-data';
import { 
  MARKS_PYQ_QUESTIONS, 
  MARKS_CHAPTER_TOPICS, 
  MarksPYQQuestion 
} from '@/lib/marks-pyq-data';
import { 
  Star, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ExternalLink, 
  Filter, 
  Timer, 
  Award, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Sparkles,
  Download,
  Dna,
  Zap,
  Atom,
  Calculator,
  Globe,
  HelpCircle,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function MarksAppPYQViewer() {
  const [selectedSubject, setSelectedSubject] = useState<Class10Subject>('Science (Biology)');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('bio-ch5');
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'starred' | 'solved' | 'unsolved'>('all');
  
  // Storage for Starred and Solved questions
  const [starredIds, setStarredIds] = useState<Record<string, boolean>>({});
  const [solvedIds, setSolvedIds] = useState<Record<string, boolean>>({});
  const [expandedSolutionIds, setExpandedSolutionIds] = useState<Record<string, boolean>>({});
  const [selectedMCQOptions, setSelectedMCQOptions] = useState<Record<string, string>>({});

  // Timed Test Mode
  const [isTestMode, setIsTestMode] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 mins default
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Load persistence from localStorage
  useEffect(() => {
    try {
      const savedStarred = localStorage.getItem('marks_pyq_starred');
      if (savedStarred) setStarredIds(JSON.parse(savedStarred));

      const savedSolved = localStorage.getItem('marks_pyq_solved');
      if (savedSolved) setSolvedIds(JSON.parse(savedSolved));
    } catch {}
  }, []);

  // Sync persistence
  const toggleStar = (id: string) => {
    setStarredIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('marks_pyq_starred', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSolved = (id: string) => {
    setSolvedIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('marks_pyq_solved', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((sec) => sec - 1), 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert('⏰ Time is up for this practice session!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  };

  // Filter chapters and topics
  const subjectChapters = useMemo(
    () => CLASS10_CHAPTERS.filter((c) => c.subject === selectedSubject),
    [selectedSubject]
  );

  const currentChapter = useMemo(
    () => CLASS10_CHAPTERS.find((c) => c.id === selectedChapterId) || subjectChapters[0] || CLASS10_CHAPTERS[0],
    [selectedChapterId, subjectChapters]
  );

  const availableTopics = useMemo(
    () => MARKS_CHAPTER_TOPICS[selectedChapterId] || ['All Topics'],
    [selectedChapterId]
  );

  const handleSubjectChange = (subj: Class10Subject) => {
    setSelectedSubject(subj);
    const firstCh = CLASS10_CHAPTERS.find((c) => c.subject === subj);
    if (firstCh) {
      setSelectedChapterId(firstCh.id);
      setSelectedTopic('All Topics');
    }
  };

  const handleChapterChange = (chId: string) => {
    setSelectedChapterId(chId);
    setSelectedTopic('All Topics');
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return MARKS_PYQ_QUESTIONS.filter((q) => {
      // Chapter match
      if (q.chapterId !== selectedChapterId) return false;

      // Topic match
      if (selectedTopic !== 'All Topics' && q.topic !== selectedTopic) return false;

      // Year match
      if (selectedYear !== 'All Years' && q.year.toString() !== selectedYear) return false;

      // Section match
      if (selectedSection !== 'All' && !q.section.includes(selectedSection)) return false;

      // Status filter
      if (statusFilter === 'starred' && !starredIds[q.id]) return false;
      if (statusFilter === 'solved' && !solvedIds[q.id]) return false;
      if (statusFilter === 'unsolved' && solvedIds[q.id]) return false;

      return true;
    });
  }, [
    selectedChapterId,
    selectedTopic,
    selectedYear,
    selectedSection,
    statusFilter,
    starredIds,
    solvedIds,
  ]);

  const starredCount = useMemo(
    () => Object.values(starredIds).filter(Boolean).length,
    [starredIds]
  );

  const solvedCount = useMemo(
    () => Object.values(solvedIds).filter(Boolean).length,
    [solvedIds]
  );

  const subjectTabs: { id: Class10Subject; label: string; icon: React.ReactNode }[] = [
    { id: 'Science (Biology)', label: 'Biology', icon: <Dna size={14} /> },
    { id: 'Science (Physics)', label: 'Physics', icon: <Zap size={14} /> },
    { id: 'Science (Chemistry)', label: 'Chemistry', icon: <Atom size={14} /> },
    { id: 'Mathematics', label: 'Mathematics', icon: <Calculator size={14} /> },
    { id: 'Social Science', label: 'Social Science', icon: <Globe size={14} /> },
  ];

  return (
    <div className="space-y-4 font-sans text-slate-200">
      {/* ========================================================
          1. MARKS APP TOP NAVIGATION & SUBJECT SELECTOR
         ======================================================== */}
      <div className="vault-panel rounded-2xl p-4 md:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs font-mono shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                  MARKS CBSE PYQ Practice Arena
                </h2>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  2018–2024 Papers
                </span>
              </div>
              <p className="text-xs text-slate-400">Chapter-wise & Topic-wise past board papers with official marking rubrics</p>
            </div>
          </div>

          {/* Practice vs Timed Test Mode Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTestMode(!isTestMode);
                if (!isTestMode) setIsTimerRunning(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
                isTestMode
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/[0.08]'
              }`}
            >
              <Timer size={14} className={isTestMode ? 'text-amber-400' : 'text-slate-400'} />
              <span>{isTestMode ? 'Timed Test Mode' : 'Practice Mode'}</span>
            </button>

            {isTestMode && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs font-mono font-bold text-amber-300">
                <Clock size={13} />
                <span>{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="ml-1 text-slate-400 hover:text-white"
                  title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                >
                  {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SUBJECT PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {subjectTabs.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSubjectChange(sub.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition ${
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

        {/* CHAPTER DROPDOWN & NCERT LINK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase font-medium">
              Select Chapter ({subjectChapters.length} Available):
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => handleChapterChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 text-white text-xs md:text-sm rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
            >
              {subjectChapters.map((ch) => (
                <option key={ch.id} value={ch.id} className="bg-slate-900 text-slate-200">
                  Chapter {ch.chapterNumber}: {ch.name} — [{ch.highYieldWeightage}]
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-medium">
              Official Textbook:
            </span>
            <a
              href={currentChapter.officialPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <BookOpen size={14} />
              <span>NCERT PDF ({currentChapter.ncertCode})</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>
        </div>

        {/* SUB-TOPIC PILLS BAR (MARKS App Signature Feature) */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-medium block">
            Filter by Sub-Topic:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {availableTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`text-xs px-3 py-1.5 rounded-lg transition ${
                  selectedTopic === topic
                    ? 'bg-white/[0.12] text-white font-semibold border border-white/[0.2]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/[0.04]'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* FILTERS BAR: YEAR & SECTION & STATUS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
          {/* Left: Year & Section */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Year:</span>
              {['All Years', '2024', '2023', '2022'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition ${
                    selectedYear === yr
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-white/[0.1] hidden sm:block" />

            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Marks:</span>
              {['All', '1M', '3M', '5M'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-2 py-0.5 rounded-md text-xs font-mono transition ${
                    selectedSection === sec
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Solved / Starred Buckets */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${
                statusFilter === 'all'
                  ? 'bg-white/[0.1] text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({filteredQuestions.length})
            </button>
            <button
              onClick={() => setStatusFilter('starred')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
                statusFilter === 'starred'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span>Starred ({starredCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('solved')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
                statusFilter === 'solved'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Solved ({solvedCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MARKS APP QUESTION STREAM
         ======================================================== */}
      <div className="space-y-3.5">
        {filteredQuestions.length === 0 ? (
          <div className="vault-panel rounded-2xl p-10 text-center space-y-2">
            <div className="text-3xl">🎯</div>
            <h4 className="text-base font-bold text-white">No Questions in this Filter</h4>
            <p className="text-xs text-slate-400">
              Try switching your year, sub-topic, or clear the starred/solved filter.
            </p>
            <button
              onClick={() => {
                setSelectedTopic('All Topics');
                setSelectedYear('All Years');
                setSelectedSection('All');
                setStatusFilter('all');
              }}
              className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isStarred = !!starredIds[q.id];
            const isSolved = !!solvedIds[q.id];
            const isExpanded = !!expandedSolutionIds[q.id];
            const chosenOption = selectedMCQOptions[q.id];

            return (
              <div
                key={q.id}
                className={`vault-panel rounded-2xl p-5 space-y-3.5 transition border ${
                  isSolved
                    ? 'border-emerald-500/30 bg-emerald-950/[0.04]'
                    : 'border-white/[0.07] hover:border-white/15'
                }`}
              >
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-200 border border-white/[0.08] text-xs font-mono font-medium">
                      CBSE {q.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono font-medium">
                      {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'} • {q.section.split(' ')[0]}
                    </span>
                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                      • {q.topic}
                    </span>
                  </div>

                  {/* Top Right Action Icons (Star & Solved) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleStar(q.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        isStarred
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                          : 'bg-slate-900/60 border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                      title={isStarred ? 'Unstar question' : 'Star for revision'}
                    >
                      <Star size={14} className={isStarred ? 'fill-amber-400' : ''} />
                    </button>

                    <button
                      onClick={() => toggleSolved(q.id)}
                      className={`p-1.5 rounded-lg border transition flex items-center gap-1 text-xs font-medium ${
                        isSolved
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900/60 border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                      title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                    >
                      <CheckCircle2 size={14} className={isSolved ? 'text-emerald-400' : ''} />
                      <span className="hidden sm:inline">{isSolved ? 'Solved' : 'Mark Solved'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="text-sm md:text-base font-semibold text-white leading-relaxed font-sans">
                  {q.question}
                </div>

                {/* MCQ Options (If 1-Mark Question) */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = chosenOption === opt;
                      const isCorrect = isExpanded && q.correctOption === opt;
                      return (
                        <button
                          key={oIdx}
                          onClick={() =>
                            setSelectedMCQOptions((prev) => ({ ...prev, [q.id]: opt }))
                          }
                          className={`p-2.5 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                              : isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                              : 'bg-slate-900/50 border-white/[0.06] text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Bottom Bar: Solution Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                  >
                    <span>{isExpanded ? 'Hide CBSE Model Solution' : 'View CBSE Model Solution'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">
                    Difficulty: <span className="text-slate-300 font-medium">{q.difficulty}</span>
                  </span>
                </div>

                {/* Expanded Solution Accordion */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                    {/* Official CBSE Model Answer */}
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1.5">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                        <Award size={13} className="text-indigo-400" /> Official CBSE Model Answer:
                      </span>
                      <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed font-sans">
                        <ReactMarkdown>{q.modelAnswer}</ReactMarkdown>
                      </div>
                    </div>

                    {/* Step-by-Step Marking Rubric */}
                    <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] space-y-1.5">
                      <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                        <CheckCircle2 size={13} className="text-emerald-400" /> Step-by-Step Mark Allocation:
                      </span>
                      <div className="space-y-1">
                        {q.markingScheme.map((item, pIdx) => (
                          <div key={pIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Board Pitfall */}
                    {q.commonTrap && (
                      <div className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] text-xs text-slate-400 flex items-start gap-2">
                        <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-400" />
                        <div>
                          <strong className="text-slate-200">Examiner Warning: </strong>
                          <span>{q.commonTrap}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
