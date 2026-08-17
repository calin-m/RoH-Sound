'use client';

import React from 'react';

export interface AcousticRippleProps {
  active?: boolean;
  className?: string;
}

export const AcousticRipple: React.FC<AcousticRippleProps> = ({
  active = true,
  className = '',
}) => {
  if (!active) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible -z-10 ${className}`}
      data-testid="acoustic-ripple"
    >
      {/* Pure Circular Sub-Bass Transducer Pressure Glow (3s Ambient Breathe) */}
      <div className="absolute w-72 h-72 rounded-full bg-radial from-[#b8934a]/20 via-[#d4af37]/08 to-transparent blur-2xl animate-ambient-breathe" />

      {/* 4 Staggered Circular Acoustic Soundwave Radiation Rings (0.7x Intensity) */}
      <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-[#b8934a]/42 animate-ripple-1" />
      <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-[#b8934a]/35 animate-ripple-2" />
      <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-[#b8934a]/28 animate-ripple-3" />
      <div className="absolute w-[360px] h-[360px] rounded-full border-2 border-[#b8934a]/20 animate-ripple-4" />
    </div>
  );
};
