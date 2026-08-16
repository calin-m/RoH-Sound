'use client';

import React from 'react';
import { useProductStore, Colorway } from '@/stores/useProductStore';
import { Sparkles, Check } from 'lucide-react';

const studioFinishes: {
  id: Colorway;
  title: string;
  subtitle: string;
  palette: string;
  details: string;
  material: string;
}[] = [
  {
    id: 'midnight',
    title: 'Obsidian Midnight',
    subtitle: 'Deep Satin PVD Coated Alloy',
    palette: '#18181b',
    details: 'Precision-machined from aluminum alloy, bead-blasted and anodized in deep obsidian with anti-fingerprint oleophobic coating.',
    material: 'Anodized 6000-Series Aluminum',
  },
  {
    id: 'silver',
    title: 'Alabaster Silver',
    subtitle: 'Pure Satin Silver Luster',
    palette: '#e4e4e7',
    details: 'Pure metallic sheen reflecting light subtly across the sculpted gimbal arc and CNC-etched outer chamfers.',
    material: 'Bead-Blasted Ceramic Matte Silver',
  },
  {
    id: 'titanium',
    title: 'Champagne Titanium',
    subtitle: 'Warm Brushed Brass & Titanium',
    palette: '#d8c7a6',
    details: 'Inspired by bespoke Swiss mechanical timepieces, combining brushed warm titanium with muted champagne accents.',
    material: 'Grade-5 Titanium & PVD Brass',
  },
  {
    id: 'emerald',
    title: 'Forest Emerald',
    subtitle: 'Deep Alpine Ceramic Luster',
    palette: '#14382e',
    details: 'A limited atelier edition featuring rich pine emerald earcups paired with deep forest memory foam cushions.',
    material: 'Ceramic Composite & Fine Leather',
  },
];

export const ColorStudio: React.FC = () => {
  const { selectedColor, setSelectedColor } = useProductStore();

  return (
    <section id="studio" className="py-24 px-4 sm:px-8 bg-white border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Step Index & Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
            04
          </span>
          <span className="h-3 w-px bg-black/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Material Atelier
          </span>
        </div>

        <div className="max-w-xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
            Four Iconic Finishes
          </h2>
          <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
            Each colorway is treated with specialized metallurgical coatings for exceptional scratch resistance and tactile luxury.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioFinishes.map((finish) => {
            const isSelected = selectedColor === finish.id;

            return (
              <div
                key={finish.id}
                onClick={() => setSelectedColor(finish.id)}
                className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#fafaf9] border-zinc-950 shadow-md ring-1 ring-zinc-950/10'
                    : 'bg-white border-black/[0.06] hover:border-black/20 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Swatch & Checkmark */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-10 h-10 rounded-full shadow-inner border border-black/10 flex items-center justify-center"
                      style={{ backgroundColor: finish.palette }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#b8934a] font-semibold">
                        <Sparkles className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-medium text-zinc-950">{finish.title}</h3>
                  <div className="text-xs text-zinc-500 font-mono mt-1">{finish.subtitle}</div>
                  <p className="text-xs text-zinc-600 font-light mt-3 leading-relaxed">
                    {finish.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] text-[11px] font-mono text-zinc-400">
                  {finish.material}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
