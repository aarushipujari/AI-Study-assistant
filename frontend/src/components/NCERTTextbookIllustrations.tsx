'use client';

import React, { useState } from 'react';

interface IllustrationProps {
  figureId: string;
}

export function NCERTTextbookIllustration({ figureId }: IllustrationProps) {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="space-y-3">
      {/* Label Toggle Bar */}
      <div className="flex items-center justify-between px-2">
        <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          📐 NCERT Textbook Exact Vector Plate
        </span>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold transition"
        >
          {showLabels ? '👁️ Hide Labels (Practice Mode)' : '🏷️ Show Textbook Labels'}
        </button>
      </div>

      {/* SVG Canvas Container */}
      <div className="w-full bg-[#080C1A] border border-amber-500/40 rounded-2xl p-4 sm:p-6 flex justify-center items-center min-h-[360px] shadow-2xl overflow-x-auto">
        {figureId === 'ncert-fig-6-7-heart' && <HeartIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-6-14-nephron' && <NephronIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-6-3-stomata' && <StomataIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-7-1-neuron' && <NeuronIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-7-2-reflex-arc' && <ReflexArcIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-8-7-flower' && <FlowerIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-9-concave-mirror-6-cases' && <RayDiagramIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-10-2-3-eye-defects' && <EyeDefectIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-10-4-5-prism-dispersion' && <PrismIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-12-10-solenoid' && <SolenoidIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-1-6-electrolysis' && <ElectrolysisIllustration showLabels={showLabels} />}
        {figureId === 'ncert-fig-4-12-micelle' && <MicelleIllustration showLabels={showLabels} />}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. HUMAN HEART (NCERT FIG 6.7)
// ----------------------------------------------------
function HeartIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 420" className="w-full max-w-[620px] h-auto font-sans select-none">
      <defs>
        <linearGradient id="oxygenated" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="deoxygenated" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Aorta Arch */}
      <path
        d="M 330 180 C 330 70, 420 50, 440 100 C 450 130, 430 180, 410 200"
        fill="none"
        stroke="url(#oxygenated)"
        strokeWidth="32"
        strokeLinecap="round"
        filter="url(#shadow)"
      />
      {/* 3 Aorta Arteries */}
      <line x1="365" y1="78" x2="365" y2="40" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
      <line x1="395" y1="70" x2="400" y2="35" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
      <line x1="425" y1="78" x2="435" y2="42" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />

      {/* Pulmonary Artery T-Branch */}
      <path
        d="M 290 200 C 280 120, 310 90, 370 120"
        fill="none"
        stroke="url(#deoxygenated)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <line x1="310" y1="110" x2="240" y2="90" stroke="#3B82F6" strokeWidth="18" strokeLinecap="round" />
      <line x1="360" y1="120" x2="430" y2="105" stroke="#3B82F6" strokeWidth="18" strokeLinecap="round" />

      {/* Superior & Inferior Vena Cava */}
      <line x1="220" y1="50" x2="220" y2="190" stroke="#2563EB" strokeWidth="26" strokeLinecap="round" />
      <line x1="220" y1="280" x2="220" y2="360" stroke="#2563EB" strokeWidth="26" strokeLinecap="round" />

      {/* Pulmonary Veins (Left side of diagram, Right lung in body) */}
      <line x1="450" y1="160" x2="490" y2="150" stroke="#DC2626" strokeWidth="14" strokeLinecap="round" />
      <line x1="450" y1="180" x2="490" y2="175" stroke="#DC2626" strokeWidth="14" strokeLinecap="round" />

      {/* Main Heart Muscular Body */}
      {/* Right Atrium (Blue) */}
      <path d="M 210 160 C 180 170, 180 240, 230 250 L 260 210 Z" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="3" />
      {/* Left Atrium (Red) */}
      <path d="M 390 160 C 440 170, 440 230, 390 245 L 360 210 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />

      {/* Ventricles Outer Muscular Layer */}
      <path
        d="M 190 240 C 190 340, 280 400, 330 410 C 390 400, 440 330, 430 240 Z"
        fill="#7F1D1D"
        stroke="#450A0A"
        strokeWidth="6"
      />

      {/* Right Ventricle Cavity (Blue) */}
      <path d="M 230 250 C 230 330, 270 370, 310 380 L 305 250 Z" fill="#1E3A8A" opacity="0.9" />
      {/* Left Ventricle Cavity (Red - Noticeably Thicker Myocardium) */}
      <path d="M 335 250 L 335 380 C 370 370, 395 320, 395 250 Z" fill="#991B1B" opacity="0.9" />

      {/* Thick Interventricular Septum */}
      <rect x="305" y="240" width="30" height="150" fill="#B91C1C" rx="4" />

      {/* Valves */}
      <line x1="240" y1="248" x2="265" y2="248" stroke="#FBBF24" strokeWidth="4" />
      <line x1="365" y1="248" x2="390" y2="248" stroke="#FBBF24" strokeWidth="4" />

      {/* Directional Flow Arrows */}
      <path d="M 220 90 L 220 160" stroke="#93C5FD" strokeWidth="3" markerEnd="url(#arrowBlue)" />
      <path d="M 250 220 L 270 280" stroke="#93C5FD" strokeWidth="3" />
      <path d="M 280 320 Q 300 230 330 160" stroke="#93C5FD" strokeWidth="3" />
      <path d="M 470 170 L 410 180" stroke="#FCA5A5" strokeWidth="3" />
      <path d="M 380 220 L 365 280" stroke="#FCA5A5" strokeWidth="3" />
      <path d="M 360 320 Q 340 230 370 140" stroke="#FCA5A5" strokeWidth="3" />

      {/* Text Labels & Pointer Lines */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          {/* Superior Vena Cava */}
          <line x1="220" y1="80" x2="100" y2="80" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="10" y="68" width="130" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="18" y="83" fill="#93C5FD">Superior Vena Cava</text>

          {/* Right Atrium */}
          <line x1="200" y1="200" x2="90" y2="200" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="10" y="188" width="100" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="18" y="203" fill="#93C5FD">Right Atrium</text>

          {/* Right Ventricle */}
          <line x1="260" y1="310" x2="80" y2="310" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="10" y="298" width="115" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="18" y="313" fill="#93C5FD">Right Ventricle</text>

          {/* Aorta */}
          <line x1="410" y1="65" x2="520" y2="65" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="520" y="53" width="70" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="532" y="68" fill="#FCA5A5">Aorta</text>

          {/* Pulmonary Artery */}
          <line x1="390" y1="110" x2="510" y2="110" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="510" y="98" width="130" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="518" y="113" fill="#93C5FD">Pulmonary Artery</text>

          {/* Pulmonary Veins */}
          <line x1="470" y1="168" x2="515" y2="168" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="515" y="156" width="125" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="522" y="171" fill="#FCA5A5">Pulmonary Veins</text>

          {/* Left Atrium */}
          <line x1="410" y1="210" x2="520" y2="210" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="520" y="198" width="95" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="528" y="213" fill="#FCA5A5">Left Atrium</text>

          {/* Left Ventricle */}
          <line x1="380" y1="310" x2="510" y2="310" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="510" y="298" width="120" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="518" y="313" fill="#FCA5A5">Left Ventricle</text>

          {/* Septum */}
          <line x1="320" y1="360" x2="320" y2="395" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="230" y="395" width="180" height="22" rx="6" fill="#0F172A" stroke="#F59E0B" />
          <text x="240" y="410" fill="#FDE68A">Interventricular Septum</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 2. NEPHRON STRUCTURE (NCERT FIG 6.14)
// ----------------------------------------------------
function NephronIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 420" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Bowman's Capsule Cup */}
      <path
        d="M 170 90 C 130 90, 110 140, 150 170 C 175 190, 205 170, 210 140 C 215 110, 195 90, 170 90 Z"
        fill="#FEF08A"
        stroke="#CA8A04"
        strokeWidth="4"
      />
      {/* Glomerulus Knot Inside */}
      <path
        d="M 150 120 Q 165 140 180 125 Q 170 105 155 130 Q 175 145 165 120"
        fill="none"
        stroke="#DC2626"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Afferent & Efferent Arterioles */}
      <path d="M 110 60 L 155 115" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
      <path d="M 175 115 L 220 70" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />

      {/* Proximal Convoluted Tubule (PCT) */}
      <path
        d="M 150 170 Q 120 210 160 230 Q 210 240 180 200 Q 230 190 220 250"
        fill="none"
        stroke="#EAB308"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Loop of Henle Hairpin */}
      <path
        d="M 220 250 L 220 370 C 220 395, 260 395, 260 370 L 260 230"
        fill="none"
        stroke="#EAB308"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Distal Convoluted Tubule (DCT) */}
      <path
        d="M 260 230 Q 300 200 280 150 Q 340 140 330 200 Q 370 190 380 170"
        fill="none"
        stroke="#EAB308"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* Collecting Duct Tree */}
      <path
        d="M 380 80 L 380 390"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="20"
        strokeLinecap="round"
      />
      {/* Branching inputs into Collecting Duct */}
      <line x1="350" y1="120" x2="380" y2="130" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
      <line x1="350" y1="240" x2="380" y2="250" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />
      <line x1="410" y1="180" x2="380" y2="190" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" />

      {/* Capillaries Net Wrapping Tubule */}
      <path
        d="M 220 70 Q 270 110 240 180 Q 200 280 230 360 Q 270 330 250 250 Q 290 180 340 280"
        fill="none"
        stroke="#DC2626"
        strokeWidth="3"
        strokeDasharray="4,2"
        opacity="0.85"
      />

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          {/* Glomerulus */}
          <line x1="165" y1="125" x2="70" y2="90" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="78" width="90" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="12" y="93" fill="#FCA5A5">Glomerulus</text>

          {/* Bowman's Capsule */}
          <line x1="140" y1="160" x2="60" y2="160" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="148" width="135" height="22" rx="6" fill="#0F172A" stroke="#EAB308" />
          <text x="12" y="163" fill="#FDE047">Bowman's Capsule</text>

          {/* PCT */}
          <line x1="160" y1="225" x2="60" y2="225" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="213" width="115" height="22" rx="6" fill="#0F172A" stroke="#EAB308" />
          <text x="12" y="228" fill="#FDE047">Tubular Part (PCT)</text>

          {/* Loop of Henle */}
          <line x1="240" y1="380" x2="110" y2="380" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="10" y="368" width="120" height="22" rx="6" fill="#0F172A" stroke="#EAB308" />
          <text x="18" y="383" fill="#FDE047">Loop of Henle</text>

          {/* Collecting Duct */}
          <line x1="390" y1="220" x2="490" y2="220" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="490" y="208" width="125" height="22" rx="6" fill="#0F172A" stroke="#F59E0B" />
          <text x="498" y="223" fill="#FDE68A">Collecting Duct</text>

          {/* Blood Capillaries */}
          <line x1="280" y1="270" x2="490" y2="270" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="490" y="258" width="135" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="498" y="273" fill="#FCA5A5">Capillary Network</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 3. STOMATAL PORE OPEN & CLOSED (NCERT FIG 6.3)
// ----------------------------------------------------
function StomataIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 360" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* (A) OPEN STOMATA */}
      <g transform="translate(40, 30)">
        <text x="100" y="20" textAnchor="middle" fill="#34D399" className="text-xs font-mono font-bold">
          (a) OPEN STOMATAL PORE
        </text>

        {/* Epidermal cells surround */}
        <path d="M 10 70 Q 50 40 90 70 Q 110 30 150 60 Q 200 40 210 90 Q 220 150 190 200 Q 150 230 110 200 Q 40 220 10 160 Z" fill="#064E3B" stroke="#059669" strokeWidth="2" opacity="0.4" />

        {/* Left Guard Cell (Turgid Curved) */}
        <path
          d="M 100 60 C 50 90, 50 170, 100 200 C 75 160, 75 100, 100 60 Z"
          fill="#10B981"
          stroke="#047857"
          strokeWidth="3"
        />
        {/* Thick Inner Concave Wall */}
        <path d="M 100 60 C 75 100, 75 160, 100 200" fill="none" stroke="#064E3B" strokeWidth="6" />

        {/* Right Guard Cell (Turgid Curved) */}
        <path
          d="M 110 60 C 160 90, 160 170, 110 200 C 135 160, 135 100, 110 60 Z"
          fill="#10B981"
          stroke="#047857"
          strokeWidth="3"
        />
        {/* Thick Inner Concave Wall */}
        <path d="M 110 60 C 135 100, 135 160, 110 200" fill="none" stroke="#064E3B" strokeWidth="6" />

        {/* Open Pore Aperture */}
        <ellipse cx="105" cy="130" rx="14" ry="38" fill="#022C22" stroke="#065F46" strokeWidth="2" />

        {/* Chloroplasts & Nucleus in Guard Cells */}
        <circle cx="70" cy="110" r="4" fill="#047857" />
        <circle cx="68" cy="145" r="4" fill="#047857" />
        <circle cx="78" cy="170" r="4" fill="#047857" />
        <circle cx="65" cy="130" r="6" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1" />

        <circle cx="140" cy="110" r="4" fill="#047857" />
        <circle cx="142" cy="145" r="4" fill="#047857" />
        <circle cx="132" cy="170" r="4" fill="#047857" />
        <circle cx="145" cy="130" r="6" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1" />
      </g>

      {/* (B) CLOSED STOMATA */}
      <g transform="translate(370, 30)">
        <text x="100" y="20" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono font-bold">
          (b) CLOSED STOMATAL PORE
        </text>

        {/* Left Guard Cell (Flaccid Straightened) */}
        <path
          d="M 98 60 C 65 90, 65 170, 98 200 C 90 160, 90 100, 98 60 Z"
          fill="#059669"
          stroke="#047857"
          strokeWidth="3"
        />
        {/* Right Guard Cell (Flaccid Straightened Touching) */}
        <path
          d="M 102 60 C 135 90, 135 170, 102 200 C 110 160, 110 100, 102 60 Z"
          fill="#059669"
          stroke="#047857"
          strokeWidth="3"
        />

        {/* Closed Contact Line */}
        <line x1="100" y1="60" x2="100" y2="200" stroke="#022C22" strokeWidth="4" />

        {/* Chloroplasts */}
        <circle cx="80" cy="120" r="4" fill="#047857" />
        <circle cx="80" cy="150" r="4" fill="#047857" />
        <circle cx="120" cy="120" r="4" fill="#047857" />
        <circle cx="120" cy="150" r="4" fill="#047857" />
      </g>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <line x1="145" y1="160" x2="145" y2="290" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="75" y="290" width="140" height="22" rx="6" fill="#0F172A" stroke="#10B981" />
          <text x="83" y="305" fill="#6EE7B7">Stomatal Pore (Open)</text>

          <line x1="90" y1="110" x2="90" y2="330" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="40" y="330" width="105" height="22" rx="6" fill="#0F172A" stroke="#10B981" />
          <text x="48" y="345" fill="#6EE7B7">Guard Cells</text>

          <line x1="180" y1="180" x2="270" y2="180" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="270" y="168" width="105" height="22" rx="6" fill="#0F172A" stroke="#059669" />
          <text x="278" y="183" fill="#6EE7B7">Chloroplasts</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 4. NEURON (NCERT FIG 7.1)
// ----------------------------------------------------
function NeuronIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 300" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Cell Body Cyton (Star-shaped) */}
      <path
        d="M 120 150 L 90 90 L 130 110 L 150 70 L 160 110 L 200 90 L 180 140 L 220 160 L 180 180 L 190 220 L 150 190 L 120 230 L 120 180 Z"
        fill="#818CF8"
        stroke="#4F46E5"
        strokeWidth="3"
      />
      {/* Dendrites Branches */}
      <path d="M 90 90 L 50 60 M 90 90 L 60 100" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M 150 70 L 140 30 M 150 70 L 170 30" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M 200 90 L 230 60 M 200 90 L 240 100" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M 120 230 L 80 250 M 120 230 L 100 270" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />

      {/* Nucleus */}
      <circle cx="150" cy="150" r="14" fill="#312E81" stroke="#C7D2FE" strokeWidth="2" />

      {/* Axon Cable */}
      <line x1="200" y1="160" x2="480" y2="160" stroke="#C7D2FE" strokeWidth="8" />

      {/* Myelin Sheath Sausages */}
      <rect x="220" y="145" width="45" height="30" rx="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <rect x="280" y="145" width="45" height="30" rx="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <rect x="340" y="145" width="45" height="30" rx="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <rect x="400" y="145" width="45" height="30" rx="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />

      {/* Axon Terminal / Nerve Endings */}
      <path d="M 480 160 L 530 120 M 480 160 L 540 160 M 480 160 L 530 200" stroke="#818CF8" strokeWidth="4" strokeLinecap="round" />
      <circle cx="530" cy="120" r="5" fill="#4F46E5" />
      <circle cx="540" cy="160" r="5" fill="#4F46E5" />
      <circle cx="530" cy="200" r="5" fill="#4F46E5" />

      {/* Direction of Impulse Arrow */}
      <path d="M 180 110 L 450 110" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6,4" />
      <polygon points="460,110 445,103 445,117" fill="#38BDF8" />
      <text x="250" y="100" fill="#38BDF8" className="text-[10px] font-mono font-bold">DIRECTION OF ELECTRICAL IMPULSE</text>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <line x1="60" y1="70" x2="20" y2="40" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="28" width="80" height="22" rx="6" fill="#0F172A" stroke="#818CF8" />
          <text x="12" y="43" fill="#C7D2FE">Dendrite</text>

          <line x1="150" y1="180" x2="150" y2="260" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="80" y="260" width="140" height="22" rx="6" fill="#0F172A" stroke="#818CF8" />
          <text x="88" y="275" fill="#C7D2FE">Cell Body (Cyton)</text>

          <line x1="300" y1="160" x2="300" y2="220" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="270" y="220" width="60" height="22" rx="6" fill="#0F172A" stroke="#FBBF24" />
          <text x="282" y="235" fill="#FDE68A">Axon</text>

          <line x1="535" y1="160" x2="535" y2="80" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="475" y="68" width="120" height="22" rx="6" fill="#0F172A" stroke="#818CF8" />
          <text x="483" y="83" fill="#C7D2FE">Nerve Ending</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 5. REFLEX ARC (NCERT FIG 7.2)
// ----------------------------------------------------
function ReflexArcIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 340" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Hot Pan (Stimulus) */}
      <rect x="30" y="160" width="70" height="15" rx="4" fill="#64748B" />
      <path d="M 50 160 Q 55 130 65 140 Q 75 120 70 160" fill="none" stroke="#EF4444" strokeWidth="3" />

      {/* Hand Touching (Skin Receptor) */}
      <path d="M 110 140 C 90 140, 80 160, 100 170 L 130 170 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />

      {/* Sensory Neuron (Red Forward Line) */}
      <path d="M 120 150 Q 230 60 380 90" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="280" cy="85" r="7" fill="#EF4444" />

      {/* Spinal Cord Butterfly Section */}
      <ellipse cx="440" cy="170" rx="90" ry="110" fill="#1E293B" stroke="#475569" strokeWidth="3" />
      <path d="M 400 130 Q 440 170 410 210 Q 440 170 470 210 Q 440 170 480 130 Q 440 160 400 130 Z" fill="#475569" />

      {/* Relay Neuron in Spinal Cord (Yellow) */}
      <path d="M 410 110 L 440 160 L 410 210" fill="none" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />

      {/* Motor Neuron (Blue Return Line) */}
      <path d="M 410 210 Q 260 250 160 210" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />

      {/* Effector Muscle */}
      <ellipse cx="140" cy="200" rx="25" ry="15" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <rect x="20" y="80" width="130" height="22" rx="6" fill="#0F172A" stroke="#F59E0B" />
          <text x="28" y="95" fill="#FDE68A">Receptors in Skin</text>

          <rect x="210" y="35" width="125" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="218" y="50" fill="#FCA5A5">Sensory Neuron</text>

          <rect x="470" y="80" width="140" height="22" rx="6" fill="#0F172A" stroke="#94A3B8" />
          <text x="478" y="95" fill="#E2E8F0">Spinal Cord (CNS)</text>

          <rect x="470" y="160" width="110" height="22" rx="6" fill="#0F172A" stroke="#FBBF24" />
          <text x="478" y="175" fill="#FDE68A">Relay Neuron</text>

          <rect x="220" y="270" width="115" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="228" y="285" fill="#93C5FD">Motor Neuron</text>

          <rect x="30" y="240" width="130" height="22" rx="6" fill="#0F172A" stroke="#DC2626" />
          <text x="38" y="255" fill="#FCA5A5">Effector (Muscle)</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 6. LS OF FLOWER (NCERT FIG 8.7)
// ----------------------------------------------------
function FlowerIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 360" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Receptacle and Stem */}
      <line x1="320" y1="300" x2="320" y2="350" stroke="#059669" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="320" cy="300" rx="35" ry="15" fill="#047857" />

      {/* Sepals (Green Calyx) */}
      <path d="M 290 300 Q 230 290 220 260 Q 260 270 295 295 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M 350 300 Q 410 290 420 260 Q 380 270 345 295 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />

      {/* Petals (Pink/Magenta Corolla) */}
      <path d="M 285 295 Q 160 250 180 120 Q 260 170 290 280 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" opacity="0.9" />
      <path d="M 355 295 Q 480 250 460 120 Q 380 170 350 280 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" opacity="0.9" />

      {/* Stamens (Male Anther + Filament) */}
      {/* Left Stamen */}
      <path d="M 300 280 Q 250 200 240 120" fill="none" stroke="#FDE047" strokeWidth="4" />
      <ellipse cx="240" cy="115" rx="12" ry="8" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />

      {/* Right Stamen */}
      <path d="M 340 280 Q 390 200 400 120" fill="none" stroke="#FDE047" strokeWidth="4" />
      <ellipse cx="400" cy="115" rx="12" ry="8" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />

      {/* Pistil / Carpel (Center Female Organ) */}
      {/* Ovary (Basal swollen) */}
      <ellipse cx="320" cy="270" rx="35" ry="30" fill="#84CC16" stroke="#4D7C0F" strokeWidth="3" />
      {/* Ovule Inside */}
      <ellipse cx="320" cy="270" rx="16" ry="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="320" cy="270" r="4" fill="#EA580C" />

      {/* Style Neck */}
      <line x1="320" y1="240" x2="320" y2="100" stroke="#84CC16" strokeWidth="12" />

      {/* Stigma Head */}
      <ellipse cx="320" cy="95" rx="18" ry="10" fill="#65A30D" stroke="#3F6212" strokeWidth="3" />

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <line x1="320" y1="95" x2="160" y2="95" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="70" y="83" width="90" height="22" rx="6" fill="#0F172A" stroke="#84CC16" />
          <text x="78" y="98" fill="#BEF264">1. Stigma</text>

          <line x1="320" y1="170" x2="160" y2="170" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="80" y="158" width="80" height="22" rx="6" fill="#0F172A" stroke="#84CC16" />
          <text x="88" y="173" fill="#BEF264">2. Style</text>

          <line x1="320" y1="270" x2="160" y2="270" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="80" y="258" width="80" height="22" rx="6" fill="#0F172A" stroke="#84CC16" />
          <text x="88" y="273" fill="#BEF264">3. Ovary</text>

          {/* Bracket for Carpel / Pistil */}
          <rect x="5" y="168" width="70" height="22" rx="6" fill="#064E3B" stroke="#10B981" />
          <text x="12" y="183" fill="#A7F3D0">PISTIL</text>

          {/* Right Labels (Male) */}
          <line x1="400" y1="115" x2="490" y2="115" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="490" y="103" width="85" height="22" rx="6" fill="#0F172A" stroke="#EAB308" />
          <text x="498" y="118" fill="#FDE047">Anther</text>

          <line x1="380" y1="200" x2="490" y2="200" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="490" y="188" width="90" height="22" rx="6" fill="#0F172A" stroke="#EAB308" />
          <text x="498" y="203" fill="#FDE047">Filament</text>

          <rect x="585" y="148" width="60" height="22" rx="6" fill="#78350F" stroke="#F59E0B" />
          <text x="590" y="163" fill="#FEF08A">STAMEN</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 7. CONCAVE MIRROR CASE 6 (NCERT FIG 9.4)
// ----------------------------------------------------
function RayDiagramIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 320" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Principal Axis */}
      <line x1="20" y1="180" x2="630" y2="180" stroke="#64748B" strokeWidth="2" />

      {/* Concave Mirror Arc */}
      <path d="M 400 50 C 370 130, 370 230, 400 310" fill="none" stroke="#38BDF8" strokeWidth="5" />
      {/* Silvered Hatching on back */}
      <path d="M 405 60 L 415 50 M 400 100 L 415 90 M 395 140 L 415 130 M 395 180 L 415 170 M 395 220 L 415 210 M 400 260 L 415 250" stroke="#475569" strokeWidth="2" />

      {/* Optical Points */}
      <circle cx="385" cy="180" r="4" fill="#38BDF8" /> {/* Pole P */}
      <circle cx="260" cy="180" r="4" fill="#F59E0B" /> {/* Focus F */}
      <circle cx="130" cy="180" r="4" fill="#EC4899" /> {/* Center C */}

      {/* Object AB between P and F */}
      <line x1="320" y1="180" x2="320" y2="110" stroke="#10B981" strokeWidth="5" />
      <polygon points="320,100 314,115 326,115" fill="#10B981" />

      {/* Ray 1: Parallel to axis -> reflects through F */}
      <line x1="320" y1="110" x2="388" y2="110" stroke="#EF4444" strokeWidth="2.5" />
      <polygon points="360,110 350,105 350,115" fill="#EF4444" />
      <line x1="388" y1="110" x2="160" y2="235" stroke="#EF4444" strokeWidth="2.5" />
      <polygon points="260,180 250,185 255,175" fill="#EF4444" />
      {/* Ray 1 Virtual backward extension */}
      <line x1="388" y1="110" x2="520" y2="35" stroke="#EF4444" strokeWidth="2" strokeDasharray="4" />

      {/* Ray 2: Center of curvature normal ray */}
      <line x1="130" y1="180" x2="388" y2="60" stroke="#8B5CF6" strokeWidth="2.5" />
      {/* Ray 2 Virtual backward extension */}
      <line x1="388" y1="60" x2="520" y2="0" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4" />

      {/* Virtual Enlarged Image A'B' Behind Mirror */}
      <line x1="520" y1="180" x2="520" y2="25" stroke="#38BDF8" strokeWidth="4" strokeDasharray="6" />
      <polygon points="520,15 514,30 526,30" fill="#38BDF8" />

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <text x="382" y="200" fill="#38BDF8">P</text>
          <text x="255" y="200" fill="#F59E0B">F</text>
          <text x="125" y="200" fill="#EC4899">C</text>

          <text x="312" y="95" fill="#34D399">Object (AB)</text>
          <text x="480" y="20" fill="#38BDF8">Virtual Image (A'B')</text>

          <rect x="420" y="250" width="220" height="40" rx="8" fill="#0F172A" stroke="#38BDF8" />
          <text x="430" y="267" fill="#BAE6FD">Image: Behind Mirror</text>
          <text x="430" y="282" fill="#BAE6FD">Nature: Virtual, Erect, Enlarged</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 8. MYOPIA DEFECT & CORRECTION (NCERT FIG 10.2)
// ----------------------------------------------------
function EyeDefectIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 320" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Top: Myopic Eye (Image in front of retina) */}
      <g transform="translate(40, 20)">
        <text x="250" y="15" textAnchor="middle" fill="#F87171" className="text-xs font-mono font-bold">
          (a) MYOPIC EYE (Image formed in front of retina)
        </text>
        {/* Eyeball Oval */}
        <ellipse cx="380" cy="70" rx="70" ry="50" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        {/* Eye Lens */}
        <ellipse cx="330" cy="70" rx="8" ry="25" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        {/* Parallel Rays converging prematurely */}
        <line x1="50" y1="50" x2="330" y2="50" stroke="#FCA5A5" strokeWidth="2" />
        <line x1="50" y1="90" x2="330" y2="90" stroke="#FCA5A5" strokeWidth="2" />
        <line x1="330" y1="50" x2="410" y2="70" stroke="#EF4444" strokeWidth="2.5" />
        <line x1="330" y1="90" x2="410" y2="70" stroke="#EF4444" strokeWidth="2.5" />
        <circle cx="410" cy="70" r="4" fill="#EF4444" />
        <text x="440" y="75" fill="#94A3B8" className="text-[10px] font-mono">Retina</text>
      </g>

      {/* Bottom: Corrected with Concave Lens */}
      <g transform="translate(40, 160)">
        <text x="250" y="15" textAnchor="middle" fill="#34D399" className="text-xs font-mono font-bold">
          (b) CORRECTION OF MYOPIA (Using Concave Lens)
        </text>
        {/* Eyeball Oval */}
        <ellipse cx="380" cy="80" rx="70" ry="50" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        {/* Eye Lens */}
        <ellipse cx="330" cy="80" rx="8" ry="25" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        {/* Concave Lens in Front */}
        <path d="M 230 55 C 235 80, 235 80, 230 105 L 240 105 C 235 80, 235 80, 240 55 Z" fill="#818CF8" stroke="#4F46E5" strokeWidth="2" />

        {/* Parallel rays entering concave lens and diverging */}
        <line x1="50" y1="65" x2="230" y2="65" stroke="#86EFAC" strokeWidth="2" />
        <line x1="50" y1="95" x2="230" y2="95" stroke="#86EFAC" strokeWidth="2" />
        <line x1="240" y1="65" x2="330" y2="60" stroke="#86EFAC" strokeWidth="2" />
        <line x1="240" y1="95" x2="330" y2="100" stroke="#86EFAC" strokeWidth="2" />
        {/* Focusing sharply ON Retina */}
        <line x1="330" y1="60" x2="450" y2="80" stroke="#10B981" strokeWidth="2.5" />
        <line x1="330" y1="100" x2="450" y2="80" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="450" cy="80" r="4" fill="#10B981" />
      </g>
    </svg>
  );
}

// ----------------------------------------------------
// 9. PRISM & VIBGYOR DISPERSION (NCERT FIG 10.4 & 10.5)
// ----------------------------------------------------
function PrismIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 320" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Triangular Prism Glass */}
      <polygon points="260,40 130,260 390,260" fill="#0F172A" stroke="#38BDF8" strokeWidth="4" opacity="0.85" />

      {/* Incident White Light Beam */}
      <line x1="30" y1="180" x2="180" y2="175" stroke="#F8FAFC" strokeWidth="6" strokeLinecap="round" />
      <text x="40" y="160" fill="#F8FAFC" className="text-xs font-mono font-bold">White Light Beam</text>

      {/* Dispersion Inside Glass */}
      <line x1="180" y1="175" x2="320" y2="155" stroke="#EF4444" strokeWidth="2.5" />
      <line x1="180" y1="175" x2="310" y2="200" stroke="#8B5CF6" strokeWidth="2.5" />

      {/* Emergent VIBGYOR Spectrum Band */}
      <line x1="320" y1="155" x2="520" y2="100" stroke="#EF4444" strokeWidth="4" /> {/* Red (Bends Least) */}
      <line x1="318" y1="162" x2="520" y2="120" stroke="#F97316" strokeWidth="4" /> {/* Orange */}
      <line x1="316" y1="170" x2="520" y2="140" stroke="#EAB308" strokeWidth="4" /> {/* Yellow */}
      <line x1="314" y1="178" x2="520" y2="160" stroke="#22C55E" strokeWidth="4" /> {/* Green */}
      <line x1="312" y1="185" x2="520" y2="180" stroke="#06B6D4" strokeWidth="4" /> {/* Blue */}
      <line x1="311" y1="192" x2="520" y2="200" stroke="#3B82F6" strokeWidth="4" /> {/* Indigo */}
      <line x1="310" y1="200" x2="520" y2="220" stroke="#8B5CF6" strokeWidth="4" /> {/* Violet (Bends Most) */}

      {/* White Screen on Right */}
      <rect x="520" y="80" width="12" height="160" rx="4" fill="#E2E8F0" stroke="#94A3B8" />

      {/* VIBGYOR Text Column */}
      <text x="545" y="105" fill="#EF4444" className="text-xs font-mono font-bold">R (Red - Bends Least)</text>
      <text x="545" y="125" fill="#F97316" className="text-xs font-mono font-bold">O (Orange)</text>
      <text x="545" y="145" fill="#EAB308" className="text-xs font-mono font-bold">Y (Yellow)</text>
      <text x="545" y="165" fill="#22C55E" className="text-xs font-mono font-bold">G (Green)</text>
      <text x="545" y="185" fill="#06B6D4" className="text-xs font-mono font-bold">B (Blue)</text>
      <text x="545" y="205" fill="#3B82F6" className="text-xs font-mono font-bold">I (Indigo)</text>
      <text x="545" y="225" fill="#8B5CF6" className="text-xs font-mono font-bold">V (Violet - Bends Most)</text>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <text x="255" y="30" fill="#38BDF8">A (Angle of Prism)</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 10. SOLENOID MAGNETIC FIELD (NCERT FIG 12.10)
// ----------------------------------------------------
function SolenoidIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 320" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Helical Coil Turns */}
      <g stroke="#F59E0B" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M 180 110 C 160 110, 160 210, 180 210 C 200 210, 200 110, 220 110" />
        <path d="M 220 110 C 200 110, 200 210, 220 210 C 240 210, 240 110, 260 110" />
        <path d="M 260 110 C 240 110, 240 210, 260 210 C 280 210, 280 110, 300 110" />
        <path d="M 300 110 C 280 110, 280 210, 300 210 C 320 210, 320 110, 340 110" />
        <path d="M 340 110 C 320 110, 320 210, 340 210 C 360 210, 360 110, 380 110" />
        <path d="M 380 110 C 360 110, 360 210, 380 210 C 400 210, 400 110, 420 110" />
        <path d="M 420 110 C 400 110, 400 210, 420 210 C 440 210, 440 110, 460 110" />
      </g>

      {/* Inside Uniform Parallel Field Lines */}
      <line x1="160" y1="145" x2="480" y2="145" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5" />
      <line x1="160" y1="160" x2="480" y2="160" stroke="#38BDF8" strokeWidth="3" />
      <line x1="160" y1="175" x2="480" y2="175" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="5" />

      {/* Outside Magnetic Field Loops (North to South) */}
      <path d="M 460 140 C 530 140, 520 40, 320 40 C 120 40, 110 140, 180 140" fill="none" stroke="#38BDF8" strokeWidth="2" />
      <path d="M 460 180 C 530 180, 520 280, 320 280 C 120 280, 110 180, 180 180" fill="none" stroke="#38BDF8" strokeWidth="2" />

      {/* Magnetic Poles */}
      <text x="130" y="165" fill="#EF4444" className="text-base font-mono font-black">S</text>
      <text x="490" y="165" fill="#3B82F6" className="text-base font-mono font-black">N</text>

      {/* Battery Connection */}
      <line x1="180" y1="210" x2="180" y2="290" stroke="#F59E0B" strokeWidth="3" />
      <line x1="460" y1="210" x2="460" y2="290" stroke="#F59E0B" strokeWidth="3" />
      <line x1="180" y1="290" x2="460" y2="290" stroke="#F59E0B" strokeWidth="3" />

      {/* Battery Plates */}
      <line x1="310" y1="280" x2="310" y2="300" stroke="#EF4444" strokeWidth="4" />
      <line x1="320" y1="285" x2="320" y2="295" stroke="#94A3B8" strokeWidth="3" />
      <text x="305" y="275" fill="#EF4444" className="text-[10px] font-mono font-bold">+</text>
      <text x="325" y="275" fill="#94A3B8" className="text-[10px] font-mono font-bold">-</text>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <rect x="230" y="10" width="180" height="22" rx="6" fill="#0F172A" stroke="#38BDF8" />
          <text x="240" y="25" fill="#7DD3FC">Closed Magnetic Loops</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 11. ELECTROLYSIS OF WATER (NCERT FIG 1.6)
// ----------------------------------------------------
function ElectrolysisIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 340" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Plastic Mug / Beaker */}
      <path d="M 180 80 L 180 260 C 180 270, 460 270, 460 260 L 460 80" fill="#0F172A" stroke="#64748B" strokeWidth="4" />
      {/* Water Level */}
      <rect x="185" y="120" width="270" height="140" fill="#0284C7" opacity="0.3" />

      {/* Cathode Test Tube (Left - Hydrogen 2 Volumes) */}
      <rect x="230" y="40" width="45" height="200" rx="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
      <rect x="232" y="120" width="41" height="118" fill="#0284C7" opacity="0.6" />
      <rect x="232" y="42" width="41" height="78" fill="#1E3A8A" />
      <text x="252" y="80" textAnchor="middle" fill="#60A5FA" className="text-xs font-mono font-black">2x H₂</text>

      {/* Anode Test Tube (Right - Oxygen 1 Volume) */}
      <rect x="365" y="40" width="45" height="200" rx="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
      <rect x="367" y="80" width="41" height="158" fill="#0284C7" opacity="0.6" />
      <rect x="367" y="42" width="41" height="38" fill="#991B1B" />
      <text x="387" y="65" textAnchor="middle" fill="#F87171" className="text-xs font-mono font-black">1x O₂</text>

      {/* Graphite Electrodes */}
      <rect x="247" y="160" width="12" height="110" fill="#0F172A" stroke="#000" strokeWidth="2" />
      <rect x="382" y="160" width="12" height="110" fill="#0F172A" stroke="#000" strokeWidth="2" />

      {/* 6V Battery */}
      <path d="M 253 270 L 253 310 L 388 310 L 388 270" fill="none" stroke="#F59E0B" strokeWidth="3" />
      <rect x="300" y="300" width="40" height="20" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
      <text x="308" y="314" fill="#FDE68A" className="text-[10px] font-mono font-bold">6V DC</text>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <line x1="230" y1="80" x2="110" y2="80" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="68" width="130" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="12" y="83" fill="#93C5FD">Cathode (H₂ - 2 Vol)</text>

          <line x1="410" y1="65" x2="520" y2="65" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="520" y="53" width="125" height="22" rx="6" fill="#0F172A" stroke="#EF4444" />
          <text x="528" y="68" fill="#FCA5A5">Anode (O₂ - 1 Vol)</text>
        </g>
      )}
    </svg>
  );
}

// ----------------------------------------------------
// 12. SOAP MICELLE (NCERT FIG 4.12)
// ----------------------------------------------------
function MicelleIllustration({ showLabels }: { showLabels: boolean }) {
  return (
    <svg viewBox="0 0 650 340" className="w-full max-w-[620px] h-auto font-sans select-none">
      {/* Center Oil Droplet */}
      <circle cx="320" cy="170" r="45" fill="#D97706" stroke="#B45309" strokeWidth="4" />
      <text x="320" y="174" textAnchor="middle" fill="#FEF3C7" className="text-xs font-mono font-black">OIL DIRT</text>

      {/* Radial Soap Molecules (12 around the circle) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 320 170)`}>
          {/* Hydrophobic Zigzag Tail */}
          <path d="M 320 125 L 315 110 L 325 95 L 315 80 L 320 65" fill="none" stroke="#FDE68A" strokeWidth="3" />
          {/* Hydrophilic Ionic Head */}
          <circle cx="320" cy="55" r="10" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <text x="320" y="58" textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-mono font-bold">-</text>
        </g>
      ))}

      {/* Water Molecules in surrounding medium */}
      <text x="180" y="80" fill="#60A5FA" className="text-xs font-mono font-bold">H₂O</text>
      <text x="460" y="80" fill="#60A5FA" className="text-xs font-mono font-bold">H₂O</text>
      <text x="160" y="270" fill="#60A5FA" className="text-xs font-mono font-bold">H₂O</text>
      <text x="470" y="270" fill="#60A5FA" className="text-xs font-mono font-bold">H₂O</text>

      {/* Labels */}
      {showLabels && (
        <g className="text-[11px] font-mono font-bold fill-slate-200">
          <line x1="320" y1="55" x2="160" y2="40" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="28" width="165" height="22" rx="6" fill="#0F172A" stroke="#3B82F6" />
          <text x="12" y="43" fill="#93C5FD">Hydrophilic Head (COO⁻)</text>

          <line x1="315" y1="95" x2="160" y2="120" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3" />
          <rect x="5" y="108" width="165" height="22" rx="6" fill="#0F172A" stroke="#F59E0B" />
          <text x="12" y="123" fill="#FDE68A">Hydrophobic Tail (-CH₂-)</text>
        </g>
      )}
    </svg>
  );
}
