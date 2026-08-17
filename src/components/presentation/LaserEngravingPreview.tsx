import React from 'react';

export interface LaserEngravingPreviewProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export const LaserEngravingPreview: React.FC<LaserEngravingPreviewProps> = ({
  value,
  onChange,
  maxLength = 20,
  className = '',
}) => {
  return (
    <div className={className} data-testid="laser-engraving-preview">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-mono uppercase text-zinc-500">
          Laser Engraving (Complimentary)
        </label>
        <span className="text-[10px] font-mono text-zinc-400">
          {value.length}/{maxLength} chars
        </span>
      </div>

      <input
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. MASTERING LAB 01"
        className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
      />

      {value && (
        <div className="mt-2.5 p-2.5 bg-gradient-to-b from-[#fafaf9] to-white rounded-xl border border-[#b8934a]/30 text-center shadow-2xs relative overflow-hidden">
          <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">CNC Laser Etch Preview:</span>
          <div className="inline-flex items-center justify-center">
            <span className="text-xs font-mono font-bold tracking-widest text-[#b8934a]">
              &ldquo;{value.toUpperCase()}&rdquo;
            </span>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-spark-glow ml-1.5"
              title="Laser Focal Beam"
            />
          </div>
        </div>
      )}
    </div>
  );
};
