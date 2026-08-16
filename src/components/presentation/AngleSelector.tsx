import React from 'react';
import { ViewAngle } from '@/stores/useProductStore';

export interface AngleSelectorProps {
  currentAngle: ViewAngle;
  onSelectAngle: (angle: ViewAngle) => void;
  className?: string;
}

const angles: { id: ViewAngle; label: string; degrees: string }[] = [
  { id: 'front', label: 'Front', degrees: '0°' },
  { id: 'angle', label: 'Perspective', degrees: '45°' },
  { id: 'side', label: 'Profile', degrees: '90°' },
];

export const AngleSelector: React.FC<AngleSelectorProps> = ({
  currentAngle,
  onSelectAngle,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex p-1 bg-white/80 backdrop-blur-md rounded-full border border-black/[0.06] shadow-xs gap-1 ${className}`}
      data-testid="angle-selector"
    >
      {angles.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelectAngle(a.id)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
            currentAngle === a.id
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-950'
          }`}
          aria-pressed={currentAngle === a.id}
          title={`View at ${a.degrees}`}
        >
          <span>{a.label}</span>
          <span className="ml-1 text-[10px] opacity-60">({a.degrees})</span>
        </button>
      ))}
    </div>
  );
};
