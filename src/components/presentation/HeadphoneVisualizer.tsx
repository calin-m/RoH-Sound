'use client';

import React from 'react';
import { Colorway, ViewAngle } from '@/stores/useProductStore';

interface HeadphoneVisualizerProps {
  color: Colorway;
  angle: ViewAngle;
  isPlayingDemo: boolean;
}

const colorThemes: Record<
  Colorway,
  {
    cupPrimary: string;
    cupSecondary: string;
    accent: string;
    cushion: string;
    metal: string;
    glow: string;
  }
> = {
  midnight: {
    cupPrimary: '#18181b',
    cupSecondary: '#27272a',
    accent: '#a1a1aa',
    cushion: '#09090b',
    metal: '#71717a',
    glow: 'rgba(24, 24, 27, 0.08)',
  },
  silver: {
    cupPrimary: '#e4e4e7',
    cupSecondary: '#f4f4f5',
    accent: '#d4d4d8',
    cushion: '#71717a',
    metal: '#a1a1aa',
    glow: 'rgba(228, 228, 231, 0.25)',
  },
  titanium: {
    cupPrimary: '#d8c7a6',
    cupSecondary: '#ecdcc0',
    accent: '#b8934a',
    cushion: '#3f3f46',
    metal: '#d4af37',
    glow: 'rgba(216, 199, 166, 0.2)',
  },
  emerald: {
    cupPrimary: '#14382e',
    cupSecondary: '#1f5344',
    accent: '#34d399',
    cushion: '#062019',
    metal: '#10b981',
    glow: 'rgba(20, 56, 46, 0.15)',
  },
};

export const HeadphoneVisualizer: React.FC<HeadphoneVisualizerProps> = ({
  color,
  angle,
  isPlayingDemo,
}) => {
  const theme = colorThemes[color] || colorThemes.midnight;

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center select-none group">
      {/* Studio Floor Soft Ambient Shadow */}
      <div
        className="absolute bottom-6 w-3/4 h-8 rounded-full blur-xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.03) 60%, transparent 80%)`,
          transform: isPlayingDemo ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      {/* Dynamic Ambient Color Halo */}
      <div
        className="absolute inset-4 rounded-full blur-3xl transition-colors duration-700 pointer-events-none opacity-80"
        style={{ backgroundColor: theme.glow }}
      />

      {/* Studio Lighting SVG Vector Model */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full relative z-10 transition-transform duration-500 ease-out drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Headband Gradient */}
          <linearGradient id="headbandLightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4d4d8" />
            <stop offset="25%" stopColor="#f4f4f5" />
            <stop offset="50%" stopColor="#e4e4e7" />
            <stop offset="75%" stopColor="#f4f4f5" />
            <stop offset="100%" stopColor="#d4d4d8" />
          </linearGradient>

          {/* Metal Hinge Gradient */}
          <linearGradient id="metalHingeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f4f4f5" />
            <stop offset="50%" stopColor="#a1a1aa" />
            <stop offset="100%" stopColor="#71717a" />
          </linearGradient>

          {/* Earcup Dynamic Gradient */}
          <radialGradient id="earcupGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={theme.cupSecondary} />
            <stop offset="70%" stopColor={theme.cupPrimary} />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>

          {/* Specular Bevel Reflection */}
          <linearGradient id="bevelSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </linearGradient>
        </defs>

        {/* ================= Front View Angle ================= */}
        {angle === 'front' && (
          <g className="transition-all duration-500">
            {/* Outer Headband Arch */}
            <path
              d="M 100 210 C 100 95 300 95 300 210"
              stroke="url(#headbandLightGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Inner Headband Cushion */}
            <path
              d="M 115 190 C 115 115 285 115 285 190"
              stroke="#27272a"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Left Earcup Fork & Hinge */}
            <path d="M 98 190 L 98 225" stroke="url(#metalHingeGrad)" strokeWidth="6" strokeLinecap="round" />
            <rect x="94" y="215" width="8" height="18" rx="3" fill="#71717a" />

            {/* Left Cushion */}
            <ellipse cx="98" cy="255" rx="20" ry="46" fill={theme.cushion} stroke="#27272a" strokeWidth="2" />
            {/* Left Earcup Shell */}
            <rect x="74" y="214" width="34" height="82" rx="17" fill="url(#earcupGrad)" />
            <rect x="74" y="214" width="34" height="82" rx="17" stroke="url(#bevelSpecular)" strokeWidth="1.5" />

            {/* Right Earcup Fork & Hinge */}
            <path d="M 302 190 L 302 225" stroke="url(#metalHingeGrad)" strokeWidth="6" strokeLinecap="round" />
            <rect x="298" y="215" width="8" height="18" rx="3" fill="#71717a" />

            {/* Right Cushion */}
            <ellipse cx="302" cy="255" rx="20" ry="46" fill={theme.cushion} stroke="#27272a" strokeWidth="2" />
            {/* Right Earcup Shell */}
            <rect x="292" y="214" width="34" height="82" rx="17" fill="url(#earcupGrad)" />
            <rect x="292" y="214" width="34" height="82" rx="17" stroke="url(#bevelSpecular)" strokeWidth="1.5" />

            {/* Monogram Detail */}
            <circle cx="91" cy="255" r="5" fill="#ffffff" opacity="0.6" />
            <circle cx="309" cy="255" r="5" fill="#ffffff" opacity="0.6" />
          </g>
        )}

        {/* ================= 45° Angle View ================= */}
        {angle === 'angle' && (
          <g className="transition-all duration-500">
            {/* Tilted Headband */}
            <path
              d="M 120 220 C 110 80 290 85 315 190"
              stroke="url(#headbandLightGrad)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 135 205 C 128 105 275 105 298 180"
              stroke="#27272a"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Background Ear Cup */}
            <ellipse cx="305" cy="220" rx="22" ry="42" fill={theme.cushion} />
            <rect x="296" y="185" width="28" height="70" rx="14" fill="url(#earcupGrad)" opacity="0.9" />

            {/* Foreground Main Ear Cup */}
            <path d="M 130 190 L 130 225" stroke="url(#metalHingeGrad)" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="140" cy="265" rx="38" ry="58" fill={theme.cushion} />
            <ellipse cx="150" cy="265" rx="42" ry="60" fill="url(#earcupGrad)" />
            <ellipse cx="150" cy="265" rx="42" ry="60" stroke="url(#bevelSpecular)" strokeWidth="2" />
            
            {/* Center Acoustic Cap */}
            <circle cx="150" cy="265" r="16" fill="#18181b" stroke={theme.accent} strokeWidth="1.5" />
            <circle cx="150" cy="265" r="4" fill="#ffffff" opacity="0.8" />
          </g>
        )}

        {/* ================= Side View Angle ================= */}
        {angle === 'side' && (
          <g className="transition-all duration-500">
            {/* Headband Single Side Arch */}
            <path
              d="M 200 80 C 240 80 245 130 245 180"
              stroke="url(#headbandLightGrad)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Gimbal Arm */}
            <path d="M 245 170 L 245 220" stroke="url(#metalHingeGrad)" strokeWidth="10" strokeLinecap="round" />

            {/* Circular Cushion Ring */}
            <circle cx="200" cy="255" r="75" fill={theme.cushion} stroke="#27272a" strokeWidth="3" />
            {/* Precision Aluminum Cup Profile */}
            <circle cx="200" cy="255" r="66" fill="url(#earcupGrad)" />
            <circle cx="200" cy="255" r="66" stroke="url(#bevelSpecular)" strokeWidth="2.5" />

            {/* Outer Concentric Acoustic Wave Rings */}
            <circle cx="200" cy="255" r="45" stroke={theme.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="200" cy="255" r="28" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />

            {/* Monogram Brand Core */}
            <text
              x="200"
              y="260"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="2"
            >
              RoH
            </text>
          </g>
        )}

        {/* Live Audio Playback Soundwaves */}
        {isPlayingDemo && (
          <g className="transition-opacity duration-300">
            <circle cx="200" cy="255" r="100" stroke="#b8934a" strokeWidth="1" opacity="0.3" className="animate-ping" />
            <circle cx="200" cy="255" r="125" stroke="#d4af37" strokeWidth="0.75" opacity="0.2" className="animate-pulse" />
          </g>
        )}
      </svg>
    </div>
  );
};
