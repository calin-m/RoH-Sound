import React from 'react';
import { Compass } from 'lucide-react';

export interface SpatialAudioControllerProps {
  isActive: boolean;
  angle: number;
  onToggle: () => void;
  onAngleChange: (angle: number) => void;
  className?: string;
}

export const SpatialAudioController: React.FC<SpatialAudioControllerProps> = ({
  isActive,
  angle,
  onToggle,
  onAngleChange,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`} data-testid="spatial-audio-controller">
      {/* Toggle Bar */}
      <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-hairline">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-brass" />
          <div>
            <div className="text-xs font-semibold text-zinc-900">Dynamic Head Tracking</div>
            <div className="text-[11px] text-zinc-500 font-light">
              Gyroscopic binaural localization
            </div>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            isActive ? 'bg-zinc-950' : 'bg-zinc-200'
          }`}
          aria-label="Toggle Dynamic Head Tracking"
          aria-pressed={isActive}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              isActive ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Manual Radial Angle Slider */}
      <div className="p-4 bg-white rounded-2xl border border-hairline space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">Virtual Emitter Position</span>
          <span className="text-zinc-950 font-bold">{angle}° Azimuth</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => onAngleChange(Number(e.target.value))}
          className="w-full accent-zinc-950 cursor-pointer"
          aria-label="Virtual Emitter Angle"
        />
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>0° (Front)</span>
          <span>90° (Right)</span>
          <span>180° (Rear)</span>
          <span>270° (Left)</span>
          <span>360°</span>
        </div>
      </div>
    </div>
  );
};
