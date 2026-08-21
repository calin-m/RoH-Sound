'use client';

import React, { useState, useEffect } from 'react';
import { ViewAngle, ProductColorway } from '@/stores/useProductStore';
import { Layers, Eye, SlidersHorizontal, Disc, Play, Pause } from 'lucide-react';

export interface HeadphoneVisualizerProps {
  color: ProductColorway;
  angle?: ViewAngle;
  onAngleChange?: (angle: ViewAngle) => void;
  isPlayingDemo?: boolean;
  className?: string;
}

interface ColorPalette {
  cupGradStart: string;
  cupGradEnd: string;
  metalBase: string;
  metalHighlight: string;
  accentGold: string;
  cushionFill: string;
  cushionStroke: string;
  headbandFill: string;
  headbandStroke: string;
  coreDisc: string;
  glowColor: string;
}

const colorThemes: Record<ProductColorway, ColorPalette> = {
  midnight: {
    cupGradStart: '#27272a',
    cupGradEnd: '#18181b',
    metalBase: '#3f3f46',
    metalHighlight: '#71717a',
    accentGold: '#b8934a',
    cushionFill: '#1f1f23',
    cushionStroke: '#27272a',
    headbandFill: '#18181b',
    headbandStroke: '#3f3f46',
    coreDisc: '#09090b',
    glowColor: 'rgba(184, 147, 74, 0.18)',
  },
  silver: {
    cupGradStart: '#f4f4f5',
    cupGradEnd: '#e4e4e7',
    metalBase: '#d4d4d8',
    metalHighlight: '#ffffff',
    accentGold: '#a1a1aa',
    cushionFill: '#fafafa',
    cushionStroke: '#e4e4e7',
    headbandFill: '#e4e4e7',
    headbandStroke: '#a1a1aa',
    coreDisc: '#f4f4f5',
    glowColor: 'rgba(161, 161, 170, 0.22)',
  },
  titanium: {
    cupGradStart: '#e7dcbf',
    cupGradEnd: '#d8c7a6',
    metalBase: '#b39e78',
    metalHighlight: '#f3ebd4',
    accentGold: '#d4af37',
    cushionFill: '#ede5d0',
    cushionStroke: '#d8c7a6',
    headbandFill: '#8c7d6b',
    headbandStroke: '#b39e78',
    coreDisc: '#c4b18c',
    glowColor: 'rgba(212, 175, 55, 0.22)',
  },
  emerald: {
    cupGradStart: '#1c4b3e',
    cupGradEnd: '#14382e',
    metalBase: '#2a6b5a',
    metalHighlight: '#4e9a85',
    accentGold: '#d4af37',
    cushionFill: '#0f2922',
    cushionStroke: '#1c4b3e',
    headbandFill: '#14382e',
    headbandStroke: '#2a6b5a',
    coreDisc: '#0a1d17',
    glowColor: 'rgba(20, 56, 46, 0.28)',
  },
};

const PERSPECTIVES: { id: ViewAngle; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'front', label: 'Front', icon: Eye },
  { id: 'controls', label: 'Controls', icon: SlidersHorizontal },
  { id: 'side', label: 'Profile', icon: Disc },
  { id: 'exploded', label: 'Anatomy', icon: Layers },
];

export const HeadphoneVisualizer: React.FC<HeadphoneVisualizerProps> = ({
  color,
  angle,
  onAngleChange,
  isPlayingDemo = false,
  className = '',
}) => {
  const [uncontrolledAngle, setUncontrolledAngle] = useState<ViewAngle>('front');
  const [isAutoTour, setIsAutoTour] = useState(false);

  const currentAngle = angle !== undefined ? angle : uncontrolledAngle;
  const theme = colorThemes[color] || colorThemes.midnight;

  // Optional Automated Studio Perspective Tour
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      const order: ViewAngle[] = ['front', 'controls', 'side', 'exploded'];
      const currentIndex = order.indexOf(currentAngle === 'angle' ? 'controls' : currentAngle);
      const nextIndex = (currentIndex + 1) % order.length;
      const nextAngle = order[nextIndex];
      setUncontrolledAngle(nextAngle);
      onAngleChange?.(nextAngle);
    }, 3800);

    return () => clearInterval(interval);
  }, [isAutoTour, currentAngle, onAngleChange]);

  const handleSelectAngle = (newAngle: ViewAngle) => {
    setIsAutoTour(false);
    setUncontrolledAngle(newAngle);
    onAngleChange?.(newAngle);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full max-w-[460px] select-none ${className}`}
      data-testid="headphone-visualizer"
    >
      {/* Visualizer Canvas Viewport */}
      <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center overflow-visible">
        {/* Soft Ambient Radial Glow matched to finish (3s Calm Breathing) */}
        <div
          className="absolute w-[270px] h-[270px] sm:w-[310px] sm:h-[310px] pointer-events-none rounded-full blur-2xl opacity-60 transition-all duration-700 animate-ambient-breathe"
          style={{ background: theme.glowColor }}
        />

        {/* Dynamic Acoustic Soundwave Emitters on Live Demo */}
        {isPlayingDemo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 rounded-full border border-brass/30 animate-ping" />
            <div className="w-72 h-72 rounded-full border border-brass/20 animate-ambient-breathe" />
          </div>
        )}

        {/* 1. FRONT SYMMETRICAL VIEW (0°) */}
        {currentAngle === 'front' && (
          <svg
            viewBox="0 0 400 340"
            className="w-full h-full max-h-[340px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-500"
            role="img"
            aria-label={`RoH Sound in ${color} - Front Symmetrical Perspective`}
          >
            <defs>
              <linearGradient id={`cupGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.cupGradStart} />
                <stop offset="100%" stopColor={theme.cupGradEnd} />
              </linearGradient>
              <linearGradient id={`accentGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={theme.accentGold} />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor={theme.accentGold} />
              </linearGradient>
              <linearGradient id={`metalGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme.metalHighlight} />
                <stop offset="100%" stopColor={theme.metalBase} />
              </linearGradient>
            </defs>

            {/* Stainless Steel Outer Headband Arch */}
            <path
              d="M 100 200 C 100 80, 300 80, 300 200"
              fill="none"
              stroke={theme.headbandStroke}
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Inner Ergonomic Headband Cushion Pad */}
            <path
              d="M 125 180 C 125 105, 275 105, 275 180"
              fill="none"
              stroke={theme.headbandFill}
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Left Gimbal Yoke Fork */}
            <g transform="translate(68, 175)">
              <rect x="18" y="0" width="8" height="36" rx="4" fill={`url(#metalGrad-${color})`} />
              <path d="M 12 30 C 12 55, 32 55, 32 30" fill="none" stroke={theme.metalBase} strokeWidth="6" />
            </g>

            {/* Right Gimbal Yoke Fork */}
            <g transform="translate(288, 175)">
              <rect x="18" y="0" width="8" height="36" rx="4" fill={`url(#metalGrad-${color})`} />
              <path d="M 12 30 C 12 55, 32 55, 32 30" fill="none" stroke={theme.metalBase} strokeWidth="6" />
            </g>

            {/* Left Earcup Assembly */}
            <g transform="translate(60, 195)">
              {/* Outer Shell */}
              <rect x="8" y="0" width="46" height="88" rx="23" fill={`url(#cupGrad-${color})`} stroke={theme.headbandStroke} strokeWidth="2" />
              {/* Acoustic Accent Ring */}
              <rect x="38" y="6" width="6" height="76" rx="3" fill={`url(#accentGrad-${color})`} />
              {/* Inner Memory Foam Cushion */}
              <rect x="42" y="10" width="22" height="68" rx="11" fill={theme.cushionFill} stroke={theme.cushionStroke} strokeWidth="2" />
              {/* CNC Chamfer Rim */}
              <ellipse cx="26" cy="44" rx="14" ry="28" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />
            </g>

            {/* Right Earcup Assembly */}
            <g transform="translate(264, 195)">
              {/* Outer Shell */}
              <rect x="26" y="0" width="46" height="88" rx="23" fill={`url(#cupGrad-${color})`} stroke={theme.headbandStroke} strokeWidth="2" />
              {/* Acoustic Accent Ring */}
              <rect x="36" y="6" width="6" height="76" rx="3" fill={`url(#accentGrad-${color})`} />
              {/* Inner Memory Foam Cushion */}
              <rect x="16" y="10" width="22" height="68" rx="11" fill={theme.cushionFill} stroke={theme.cushionStroke} strokeWidth="2" />
              {/* CNC Chamfer Rim */}
              <ellipse cx="54" cy="44" rx="14" ry="28" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />
            </g>

            {/* Central Precision Pivot Fastener Accent */}
            <circle cx="200" cy="85" r="3.5" fill={theme.accentGold} opacity="0.7" />
          </svg>
        )}

        {/* 2. TACTILE CONTROLS & PORTS PERSPECTIVE */}
        {(currentAngle === 'controls' || currentAngle === 'angle') && (
          <svg
            viewBox="0 0 400 340"
            className="w-full h-full max-h-[340px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-500"
            role="img"
            aria-label={`RoH Sound in ${color} - Tactile Controls and Ports Perspective`}
          >
            <defs>
              <linearGradient id={`controlsCupGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.cupGradStart} />
                <stop offset="100%" stopColor={theme.cupGradEnd} />
              </linearGradient>
            </defs>

            {/* Rear-Facing Memory Foam Cushion (Circular Contour behind Cup) */}
            <circle cx="136" cy="148" r="80" fill={theme.cushionFill} stroke={theme.cushionStroke} strokeWidth="2.5" />

            {/* Main Round Anodized Aluminum Earcup Shell */}
            <circle cx="160" cy="148" r="78" fill={`url(#controlsCupGrad-${color})`} stroke={theme.headbandStroke} strokeWidth="2.5" />

            {/* Machined Chamfer Outer Bezel & Lathe Accent Rings */}
            <circle cx="160" cy="148" r="72" fill="none" stroke={theme.accentGold} strokeWidth="2" />
            <circle cx="160" cy="148" r="58" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="160" cy="148" r="44" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.3" />

            {/* Central Precision Machined Core Medallion */}
            <circle cx="160" cy="148" r="22" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1.5" />

            {/* 1. Precision Knurled Digital Crown (Rotated -32° on Top-Right Rim) */}
            <g transform="translate(226, 107) rotate(-32)">
              {/* Machined Bezel Housing */}
              <rect x="-6" y="-14" width="18" height="28" rx="3" fill={theme.metalBase} stroke={theme.accentGold} strokeWidth="1.2" />
              {/* Knurled Rotary Dial */}
              <rect x="0" y="-12" width="13" height="24" rx="2.5" fill={theme.cupGradEnd} stroke={theme.metalHighlight} strokeWidth="1" />
              {/* Tactile Ridges */}
              {[-8, -4, 0, 4, 8].map((y) => (
                <line key={y} x1="2" y1={y} x2="11" y2={y} stroke={theme.accentGold} strokeWidth="1.2" />
              ))}
            </g>
            {/* Crown Callout Leader */}
            <line x1="240" y1="98" x2="278" y2="85" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="278" cy="85" r="2" fill={theme.accentGold} />
            <text x="284" y="88" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Digital Crown (Vol/Scrub)</text>

            {/* 2. Multi-Function ANC / Spatial Action Button (Equator Rim at 0°) */}
            <g transform="translate(236, 148)">
              {/* Machined Socket */}
              <rect x="-4" y="-12" width="11" height="24" rx="3" fill={theme.coreDisc} stroke={theme.metalHighlight} strokeWidth="1" />
              {/* Tactile Button Body */}
              <rect x="-2" y="-10" width="8" height="20" rx="2" fill={theme.cupGradStart} stroke={theme.accentGold} strokeWidth="1.2" />
              {/* Active Center Dot */}
              <circle cx="2" cy="0" r="1.8" fill={theme.accentGold} />
            </g>
            {/* ANC Callout Leader */}
            <line x1="246" y1="148" x2="278" y2="148" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="278" cy="148" r="2" fill={theme.accentGold} />
            <text x="284" y="151" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">ANC & Spatial Mode Key</text>

            {/* 3. Multi-State Power & Bluetooth 5.4 Slider (Rotated +32° on Lower-Right Rim) */}
            <g transform="translate(226, 189) rotate(32)">
              {/* Recessed Slider Track */}
              <rect x="-4" y="-12" width="9" height="24" rx="2.5" fill={theme.coreDisc} stroke={theme.metalHighlight} strokeWidth="1" />
              {/* Toggle Switch Head */}
              <rect x="-3" y="-3" width="7" height="8" rx="1.5" fill={theme.accentGold} />
            </g>
            {/* Power Callout Leader */}
            <line x1="240" y1="198" x2="278" y2="208" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="278" cy="208" r="2" fill={theme.accentGold} />
            <text x="284" y="211" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Power / Pairing Switch</text>

            {/* 4. Multi-Color LED Status Dot & Beamforming Voice Mics (Bottom-Right Curve) */}
            <g transform="translate(199, 215) rotate(60)">
              {/* Status LED */}
              <circle cx="-4" cy="-4" r="2.5" fill="#10b981" className="animate-pulse" />
              <circle cx="-4" cy="-4" r="4.5" fill="#10b981" opacity="0.3" />
              {/* Dual Mic Micro-Ports */}
              <circle cx="-4" cy="4" r="1.2" fill={theme.coreDisc} />
              <circle cx="-4" cy="9" r="1.2" fill={theme.coreDisc} />
            </g>
            {/* Status LED Callout Leader */}
            <line x1="208" y1="223" x2="278" y2="252" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="278" cy="252" r="2" fill={theme.accentGold} />
            <text x="284" y="255" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Status LED & Mic Array</text>

            {/* 5. Lossless USB-C & 3.5mm Port (Recessed into Bottom Apex Rim) */}
            <g transform="translate(160, 224)">
              {/* Machined Port Bezel Plate */}
              <rect x="-26" y="-3" width="52" height="11" rx="3.5" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1" />
              {/* USB-C Slot */}
              <rect x="-20" y="-1" width="18" height="7" rx="3" fill="#18181b" stroke={theme.metalHighlight} strokeWidth="0.8" />
              <rect x="-16" y="1" width="10" height="3" rx="1" fill="#d4af37" />

              {/* 3.5mm Gold-Plated Audio Jack */}
              <circle cx="12" cy="2.5" r="4.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="1.2" />
              <circle cx="12" cy="2.5" r="2.5" fill="#b8934a" />
            </g>
            {/* USB-C Port Callout Leader */}
            <line x1="160" y1="234" x2="160" y2="280" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="160" cy="280" r="2" fill={theme.accentGold} />
            <text x="160" y="295" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Lossless USB-C & 3.5mm Analog Jack</text>
          </svg>
        )}

        {/* 3. 90° SIDE PROFILE VIEW */}
        {currentAngle === 'side' && (
          <svg
            viewBox="0 0 400 340"
            className="w-full h-full max-h-[340px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-500"
            role="img"
            aria-label={`RoH Sound in ${color} - 90 Degree Profile View`}
          >
            <defs>
              <linearGradient id={`sideCupGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.cupGradStart} />
                <stop offset="100%" stopColor={theme.cupGradEnd} />
              </linearGradient>
            </defs>

            {/* Profile Headband Arch (Curving down naturally from head crown) */}
            <path
              d="M 160 45 C 185 55, 200 90, 200 135"
              fill="none"
              stroke={theme.headbandStroke}
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Inner Headband Padding Strip */}
            <path
              d="M 170 58 C 188 68, 196 95, 196 130"
              fill="none"
              stroke={theme.headbandFill}
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Telescopic Adjustment Slider Sleeve */}
            <g transform="translate(193, 125)">
              <rect x="0" y="0" width="14" height="34" rx="3" fill={theme.metalBase} stroke={theme.metalHighlight} strokeWidth="1" />
              {/* Laser-Etched Calibration Graduation Ticks */}
              <line x1="3" y1="8" x2="11" y2="8" stroke={theme.accentGold} strokeWidth="1" />
              <line x1="3" y1="14" x2="11" y2="14" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
              <line x1="3" y1="20" x2="11" y2="20" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
              <line x1="3" y1="26" x2="11" y2="26" stroke={theme.accentGold} strokeWidth="1" />
            </g>

            {/* Machined U-Yoke Gimbal Fork (Embracing Earcup from both sides) */}
            <path
              d="M 200 155 C 200 175, 136 185, 136 215"
              fill="none"
              stroke={theme.metalBase}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 200 155 C 200 175, 264 185, 264 215"
              fill="none"
              stroke={theme.metalBase}
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Memory Foam Cushion (Contoured Behind Cup Shell) */}
            <rect x="156" y="155" width="88" height="120" rx="44" fill={theme.cushionFill} stroke={theme.cushionStroke} strokeWidth="2" />
            {/* Cushion Inner Acoustic Depth */}
            <ellipse cx="200" cy="215" rx="32" ry="46" fill="#09090b" opacity="0.15" />

            {/* Main Anodized Aluminum Outer Plate */}
            <circle cx="200" cy="215" r="58" fill={`url(#sideCupGrad-${color})`} stroke={theme.headbandStroke} strokeWidth="2.5" />

            {/* Concentric Precision Lathe Rings */}
            <circle cx="200" cy="215" r="48" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="200" cy="215" r="38" fill="none" stroke={theme.accentGold} strokeWidth="2" />
            <circle cx="200" cy="215" r="28" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />

            {/* Peripheral Acoustic Mic Ports (8 Micro Vents) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const vx = 200 + 43 * Math.cos(rad);
              const vy = 215 + 43 * Math.sin(rad);
              return <circle key={i} cx={vx} cy={vy} r="1.8" fill={theme.coreDisc} />;
            })}

            {/* Center Precision Machined Core Medallion */}
            <circle cx="200" cy="215" r="20" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1.5" />

            {/* Left & Right Yoke Pivot Pin Fasteners */}
            <circle cx="136" cy="215" r="4.5" fill={theme.accentGold} stroke={theme.metalBase} strokeWidth="1" />
            <circle cx="264" cy="215" r="4.5" fill={theme.accentGold} stroke={theme.metalBase} strokeWidth="1" />
          </svg>
        )}

        {/* 4. EXPLODED ACOUSTIC LAYERS ANATOMY */}
        {currentAngle === 'exploded' && (
          <svg
            viewBox="0 0 400 340"
            className="w-full h-full max-h-[340px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-500"
            role="img"
            aria-label={`RoH Sound in ${color} - Exploded Acoustic Transducer Anatomy`}
          >
            {/* Horizontal Acoustic Axis Guide Line */}
            <line x1="30" y1="160" x2="370" y2="160" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

            {/* Layer 01: Outer CNC Anodized Aluminum Cup Shell */}
            <g transform="translate(56, 160)">
              {/* Outer Shell Rim */}
              <ellipse cx="0" cy="0" rx="18" ry="52" fill={`url(#cupGrad-${color})`} stroke={theme.headbandStroke} strokeWidth="2.5" />
              {/* Machined Gold Chamfer Accent */}
              <ellipse cx="0" cy="0" rx="15" ry="46" fill="none" stroke={theme.accentGold} strokeWidth="1.5" />
              {/* Inner Lathe Milling Reflection */}
              <ellipse cx="-2" cy="0" rx="11" ry="36" fill="none" stroke={theme.metalHighlight} strokeWidth="1" strokeOpacity="0.4" />
              {/* Central Machined Core */}
              <ellipse cx="0" cy="0" rx="5" ry="12" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1" />

              {/* Callout Leader (ABOVE) */}
              <line x1="0" y1="-56" x2="0" y2="-82" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="0" cy="-82" r="2" fill={theme.accentGold} />
              {/* Number Pill Badge */}
              <rect x="-14" y="-102" width="28" height="15" rx="7.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="0.8" />
              <text x="0" y="-91" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="monospace" fontWeight="bold">01</text>
              {/* Typography */}
              <text x="0" y="-112" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Cup Shell</text>
              <text x="0" y="-121" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">CNC ALLOY</text>
            </g>

            {/* Layer 02: Resonant Brass Damping Ring */}
            <g transform="translate(126, 160)">
              {/* Solid Brass Ring */}
              <ellipse cx="0" cy="0" rx="13" ry="44" fill="none" stroke={theme.accentGold} strokeWidth="4.5" />
              {/* Inner Polished Chamfer */}
              <ellipse cx="0" cy="0" rx="9" ry="34" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />
              {/* Laser-Tuned Peripheral Damping Notches */}
              {[-24, -14, -4, 6, 16, 26].map((y) => (
                <line key={y} x1="-2.5" y1={y} x2="2.5" y2={y} stroke="#856404" strokeWidth="1.2" />
              ))}

              {/* Callout Leader (BELOW) */}
              <line x1="0" y1="48" x2="0" y2="75" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="0" cy="75" r="2" fill={theme.accentGold} />
              {/* Number Pill Badge */}
              <rect x="-14" y="80" width="28" height="15" rx="7.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="0.8" />
              <text x="0" y="91" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="monospace" fontWeight="bold">02</text>
              {/* Typography */}
              <text x="0" y="106" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Resonant Ring</text>
              <text x="0" y="115" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">BRASS DAMPING</text>
            </g>

            {/* Layer 03: 45mm Titanium-Graphene Transducer Diaphragm (Acoustic Core) */}
            <g transform="translate(198, 160)">
              {/* Transducer Frame */}
              <ellipse cx="0" cy="0" rx="17" ry="50" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="2" />
              {/* Micro-Ribbed Graphene Damping Matrix */}
              <ellipse cx="0" cy="0" rx="13" ry="40" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="3 2" />
              <ellipse cx="0" cy="0" rx="8" ry="26" fill="none" stroke="#eab308" strokeWidth="1" />
              {/* Gold Voice-Coil Dome */}
              <ellipse cx="0" cy="0" rx="4" ry="12" fill="#d4af37" stroke="#ffffff" strokeWidth="1" />

              {/* Callout Leader (ABOVE) */}
              <line x1="0" y1="-54" x2="0" y2="-82" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="0" cy="-82" r="2" fill={theme.accentGold} />
              {/* Number Pill Badge */}
              <rect x="-14" y="-102" width="28" height="15" rx="7.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="0.8" />
              <text x="0" y="-91" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="monospace" fontWeight="bold">03</text>
              {/* Typography */}
              <text x="0" y="-112" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">45mm Driver</text>
              <text x="0" y="-121" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">TI-GRAPHENE</text>
            </g>

            {/* Layer 04: Dual Neodymium N52 Magnetic Flux Array */}
            <g transform="translate(270, 160)">
              {/* Magnetic Housing */}
              <ellipse cx="0" cy="0" rx="13" ry="42" fill={theme.metalBase} stroke={theme.metalHighlight} strokeWidth="1.8" />
              {/* Dual Magnetic Pole Pieces */}
              <ellipse cx="0" cy="-14" rx="9" ry="14" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1" />
              <ellipse cx="0" cy="14" rx="9" ry="14" fill={theme.coreDisc} stroke={theme.accentGold} strokeWidth="1" />
              {/* High-Flux Center Gap */}
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#d4af37" strokeWidth="2" />

              {/* Callout Leader (BELOW) */}
              <line x1="0" y1="46" x2="0" y2="75" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="0" cy="75" r="2" fill={theme.accentGold} />
              {/* Number Pill Badge */}
              <rect x="-14" y="80" width="28" height="15" rx="7.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="0.8" />
              <text x="0" y="91" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="monospace" fontWeight="bold">04</text>
              {/* Typography */}
              <text x="0" y="106" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Dual N52 Magnet</text>
              <text x="0" y="115" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">1.5 TESLA FLUX</text>
            </g>

            {/* Layer 05: Protein Leather Acoustic Cushion */}
            <g transform="translate(340, 160)">
              {/* Ergonomic Cushion Contour */}
              <ellipse cx="0" cy="0" rx="18" ry="52" fill={theme.cushionFill} stroke={theme.cushionStroke} strokeWidth="2.5" />
              {/* Acoustic Ear Cavity */}
              <ellipse cx="0" cy="0" rx="10" ry="34" fill="#09090b" opacity="0.35" />
              {/* Acoustically Transparent Micro-Mesh */}
              <ellipse cx="0" cy="0" rx="6" ry="20" fill="none" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />

              {/* Callout Leader (ABOVE) */}
              <line x1="0" y1="-56" x2="0" y2="-82" stroke={theme.accentGold} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="0" cy="-82" r="2" fill={theme.accentGold} />
              {/* Number Pill Badge */}
              <rect x="-14" y="-102" width="28" height="15" rx="7.5" fill="#18181b" stroke={theme.accentGold} strokeWidth="0.8" />
              <text x="0" y="-91" textAnchor="middle" fill="#d4af37" fontSize="8" fontFamily="monospace" fontWeight="bold">05</text>
              {/* Typography */}
              <text x="0" y="-112" textAnchor="middle" fill="#18181b" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Ear Cushion</text>
              <text x="0" y="-121" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">MEMORY FOAM</text>
            </g>
          </svg>
        )}
      </div>

      {/* Modern Minimalistic Perspective Selector Bar */}
      <div className="w-full flex flex-col items-center gap-2 mt-4 px-1 sm:px-2">
        {/* Responsive 4-Column Grid-Aligned Segmented Switcher */}
        <div className="w-full grid grid-cols-4 gap-1 p-1 bg-zinc-100/90 backdrop-blur-md rounded-full border border-hairline-subtle shadow-2xs">
          {PERSPECTIVES.map((tab) => {
            const Icon = tab.icon;
            const isSelected = currentAngle === tab.id || (tab.id === 'controls' && currentAngle === 'angle');

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectAngle(tab.id)}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-xs font-medium'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isSelected ? 'text-brass-light' : 'text-zinc-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Auto-Tour Mode Sub-Pill */}
        <button
          type="button"
          onClick={() => setIsAutoTour(!isAutoTour)}
          aria-label={isAutoTour ? 'Pause studio tour' : 'Start studio perspective tour'}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-all cursor-pointer active:scale-95 ${
            isAutoTour
              ? 'bg-canvas border-brass/60 text-zinc-950 shadow-xs'
              : 'bg-white/80 border-hairline text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
          }`}
        >
          {isAutoTour ? (
            <>
              <Pause className="w-3 h-3 text-brass" />
              <span>Pause Tour</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-brass fill-brass" />
              <span>Auto-Tour</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
