import React from 'react';
import { Colorway } from '@/stores/useProductStore';

export interface ColorwayItem {
  id: Colorway;
  label: string;
  hex: string;
  desc?: string;
}

export const COLORWAYS_LIST: ColorwayItem[] = [
  { id: 'midnight', label: 'Obsidian Midnight', hex: '#18181b', desc: 'Anodized PVD Matte' },
  { id: 'silver', label: 'Alabaster Silver', hex: '#e4e4e7', desc: 'Bead-Blasted Alloy' },
  { id: 'titanium', label: 'Champagne Titanium', hex: '#d8c7a6', desc: 'Satin Brass Luster' },
  { id: 'emerald', label: 'Forest Emerald', hex: '#14382e', desc: 'Deep Alpine Ceramic' },
];

export interface ColorwaySelectorProps {
  selectedColor: Colorway;
  onSelectColor: (color: Colorway) => void;
  variant?: 'swatch' | 'pill';
  className?: string;
}

export const ColorwaySelector: React.FC<ColorwaySelectorProps> = ({
  selectedColor,
  onSelectColor,
  variant = 'swatch',
  className = '',
}) => {
  if (variant === 'pill') {
    return (
      <div className={`grid grid-cols-2 gap-2 ${className}`}>
        {COLORWAYS_LIST.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectColor(c.id)}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
              selectedColor === c.id
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                : 'bg-white text-zinc-700 border-hairline hover:bg-zinc-50'
            }`}
            aria-label={`Switch to ${c.label}`}
          >
            <span
              className="w-4 h-4 rounded-full border border-white/20 shrink-0"
              style={{ backgroundColor: c.hex }}
            />
            <span className="truncate">{c.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {COLORWAYS_LIST.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelectColor(item.id)}
          className={`group relative p-1 rounded-full transition-all duration-300 cursor-pointer ${
            selectedColor === item.id
              ? 'ring-2 ring-zinc-950 ring-offset-2 ring-offset-canvas'
              : 'hover:ring-1 hover:ring-zinc-400 ring-offset-1 ring-offset-canvas'
          }`}
          aria-label={`Select ${item.label}`}
        >
          <span
            className="block w-7 h-7 rounded-full shadow-inner border border-black/10 transition-transform group-hover:scale-105"
            style={{ backgroundColor: item.hex }}
          />
        </button>
      ))}
    </div>
  );
};
