import React from 'react';
import { AncMode } from '@/stores/useProductStore';

export interface AcousticWaveformProps {
  mode: AncMode;
  className?: string;
}

export const AcousticWaveform: React.FC<AcousticWaveformProps> = ({
  mode,
  className = '',
}) => {
  return (
    <div
      className={`h-32 bg-white rounded-2xl border border-black/[0.06] p-4 flex items-center justify-center relative overflow-hidden shadow-inner ${className}`}
    >
      {/* Center Zero Line */}
      <div className="absolute inset-x-0 h-px bg-zinc-200" />

      {/* Animated Frequency Wave SVG */}
      <svg viewBox="0 0 400 100" className="w-full h-full relative z-10" data-testid="waveform-svg">
        <path
          d={
            mode === 'transparency'
              ? 'M 0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50'
              : mode === 'balanced'
              ? 'M 0 50 Q 50 30 100 50 T 200 50 T 300 50 T 400 50'
              : 'M 0 50 Q 50 45 100 50 T 200 50 T 300 50 T 400 50'
          }
          fill="none"
          stroke="#18181b"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />
        <path
          d={
            mode === 'transparency'
              ? 'M 0 50 Q 50 85 100 50 T 200 50 T 300 50 T 400 50'
              : mode === 'balanced'
              ? 'M 0 50 Q 50 68 100 50 T 200 50 T 300 50 T 400 50'
              : 'M 0 50 Q 50 54 100 50 T 200 50 T 300 50 T 400 50'
          }
          fill="none"
          stroke="#b8934a"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-400">
        Frequency: 20Hz – 40kHz
      </div>
    </div>
  );
};
