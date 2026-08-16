'use client';

import React from 'react';

export interface AcousticRippleProps {
  active?: boolean;
  className?: string;
}

export const AcousticRipple: React.FC<AcousticRippleProps> = ({
  active = false,
  className = '',
}) => {
  if (!active) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
      data-testid="acoustic-ripple"
    >
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[#b8934a]/30 animate-ripple-1" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[#b8934a]/20 animate-ripple-2" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-[#b8934a]/10 animate-ripple-3" />
    </div>
  );
};
