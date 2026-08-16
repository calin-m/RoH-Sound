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
        <div className="mt-2 p-2 bg-white rounded-lg border border-black/[0.06] text-center">
          <span className="text-[10px] font-mono text-zinc-400 block">Preview on Gimbal:</span>
          <span className="text-xs font-mono font-bold tracking-widest text-[#b8934a]">
            &ldquo;{value.toUpperCase()}&rdquo;
          </span>
        </div>
      )}
    </div>
  );
};
