import React from 'react';
import { Volume2 } from 'lucide-react';

export interface SpatialRadarProps {
  angle: number;
  isSpatialActive?: boolean;
  className?: string;
}

export const SpatialRadar: React.FC<SpatialRadarProps> = ({
  angle,
  isSpatialActive = true,
  className = '',
}) => {
  return (
    <div
      className={`h-44 bg-white rounded-2xl border border-black/[0.06] relative flex items-center justify-center overflow-hidden shadow-inner ${className}`}
      data-testid="spatial-radar"
    >
      {/* Concentric Radar Rings */}
      <div className="absolute w-36 h-36 rounded-full border border-black/[0.06]" />
      <div className="absolute w-24 h-24 rounded-full border border-black/[0.08]" />
      <div className="absolute w-12 h-12 rounded-full border border-black/[0.1] bg-zinc-100/50" />

      {/* Listener Head Center */}
      <div className="relative z-10 w-6 h-6 rounded-full bg-zinc-950 flex items-center justify-center text-white text-[9px] font-bold shadow-xs">
        ▲
      </div>

      {/* Rotating Virtual Audio Emitter */}
      <div
        className={`absolute w-full h-full flex items-center justify-center transition-transform duration-200 ${
          isSpatialActive ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ transform: `rotate(${angle}deg)` }}
        data-testid="spatial-emitter"
      >
        <div className="absolute top-4 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-[#b8934a] shadow-md border-2 border-white flex items-center justify-center">
            <Volume2 className="w-2 h-2 text-white" />
          </div>
          <span className="text-[9px] font-mono text-zinc-500 font-bold mt-1 bg-white px-1.5 py-0.5 rounded-full border border-black/[0.08] shadow-xs">
            Virtual Emitter
          </span>
        </div>
      </div>

      <div className="absolute top-2 left-3 font-mono text-[10px] text-zinc-400 uppercase">
        Binaural Soundstage
      </div>
    </div>
  );
};
