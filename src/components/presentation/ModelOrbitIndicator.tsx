'use client';

import React from 'react';
import { RotateCw, Pause, Play, MoveHorizontal } from 'lucide-react';

export interface ModelOrbitIndicatorProps {
  isAutoRotating: boolean;
  isDragging?: boolean;
  onToggleAutoRotate: () => void;
  className?: string;
}

export const ModelOrbitIndicator: React.FC<ModelOrbitIndicatorProps> = ({
  isAutoRotating,
  isDragging = false,
  onToggleAutoRotate,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/[0.06] shadow-xs select-none ${className}`}
      data-testid="model-orbit-indicator"
    >
      {/* 3D Interaction Status */}
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-600">
        {isDragging ? (
          <>
            <MoveHorizontal className="w-3.5 h-3.5 text-[#b8934a] animate-pulse" />
            <span className="text-zinc-950 font-medium tracking-wide">360° Free Orbit</span>
          </>
        ) : (
          <>
            <RotateCw
              className={`w-3.5 h-3.5 text-[#b8934a] ${
                isAutoRotating ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            />
            <span className="tracking-wide">
              {isAutoRotating ? '360° Studio View' : 'Orbit Paused'}
            </span>
            <span className="text-zinc-400 text-[10px] hidden sm:inline">• Drag to Rotate</span>
          </>
        )}
      </div>

      {/* Vertical Hairline Divider */}
      <div className="w-[1px] h-3.5 bg-black/[0.08]" aria-hidden="true" />

      {/* Orbit Pause/Play Toggle Button */}
      <button
        type="button"
        onClick={onToggleAutoRotate}
        aria-label={isAutoRotating ? 'Pause auto-orbit' : 'Resume auto-orbit'}
        className="flex items-center gap-1 text-[11px] font-mono tracking-wider text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 px-2.5 py-0.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
      >
        {isAutoRotating ? (
          <>
            <Pause className="w-2.5 h-2.5 text-zinc-700" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-2.5 h-2.5 text-[#b8934a] fill-[#b8934a]" />
            <span>Orbit</span>
          </>
        )}
      </button>
    </div>
  );
};
