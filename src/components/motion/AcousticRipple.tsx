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
      <div className="absolute w-72 h-72 rounded-full bg-radial from-[#b8934a]/15 via-[#d4af37]/05 to-transparent blur-2xl animate-ambient-breathe" />

      {/* Pure Hardware-Accelerated Acoustic Wavefront Rings (Zero Box-Shadow Overhead) */}
      <div className="absolute w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#b8934a]/40 animate-ripple-1" />
      <div className="absolute w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#b8934a]/30 animate-ripple-2" />
      <div className="hidden sm:block absolute w-[360px] h-[360px] rounded-full border border-[#b8934a]/20 animate-ripple-3" />
      <div className="hidden sm:block absolute w-[360px] h-[360px] rounded-full border border-[#b8934a]/15 animate-ripple-4" />
    </div>
  );
};
