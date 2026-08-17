import React from 'react';
import { ANCMode } from '@/stores/useProductStore';

export interface AncModeOption {
  id: ANCMode;
  name: string;
  reduction: string;
  desc: string;
}

export const ancModesList: AncModeOption[] = [
  {
    id: 'transparency',
    name: 'Natural Transparency',
    reduction: '0dB (Binaural Pass-Through)',
    desc: 'Microphones feed ambient speech and acoustics naturally into the soundstage.',
  },
  {
    id: 'balanced',
    name: 'Balanced Studio',
    reduction: '-25dB Attenuation',
    desc: 'Ideal for creative studio environments, filtering HVAC and low-frequency drone.',
  },
  {
    id: 'ultra',
    name: 'Ultra Hybrid ANC',
    reduction: '-48dB Neural Cancellation',
    desc: 'Quad-feedforward microphones completely isolate engine and transit rumble.',
  },
];

export interface AncModeSelectorProps {
  currentMode: ANCMode;
  onSelectMode: (mode: ANCMode) => void;
  className?: string;
}

export const AncModeSelector: React.FC<AncModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`} data-testid="anc-mode-selector">
      {ancModesList.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onSelectMode(mode.id)}
          className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between cursor-pointer ${
            currentMode === mode.id
              ? 'bg-white border-zinc-950 shadow-xs ring-1 ring-zinc-950/10'
              : 'bg-white/50 border-black/[0.04] hover:bg-white hover:border-black/[0.08]'
          }`}
          aria-pressed={currentMode === mode.id}
        >
          <div>
            <div className="text-xs font-semibold text-zinc-900">{mode.name}</div>
            <div className="text-xs text-zinc-500 font-light mt-0.5">{mode.desc}</div>
          </div>
          <div className="relative shrink-0 ml-2">
            {currentMode === mode.id && (
              <span className="absolute -inset-0.5 rounded-lg bg-[#b8934a]/25 animate-ping pointer-events-none" />
            )}
            <span
              className={`relative font-mono text-[11px] px-2.5 py-0.5 rounded-md transition-all duration-300 ${
                currentMode === mode.id
                  ? 'bg-zinc-950 text-white font-medium shadow-xs border border-[#b8934a]/40'
                  : 'bg-zinc-100 text-zinc-600'
              }`}
            >
              {mode.id === 'ultra' ? '-48dB' : mode.id === 'balanced' ? '-25dB' : '0dB'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
