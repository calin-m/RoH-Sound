'use client';

import React, { useEffect, useRef } from 'react';
import { useProductStore, Colorway } from '@/stores/useProductStore';
import { SectionHeader } from './SectionHeader';
import { MotionReveal } from '../motion/MotionReveal';
import { Sparkles, Check } from 'lucide-react';

const studioFinishes: {
  id: Colorway;
  title: string;
  subtitle: string;
  palette: string;
  details: string;
  material: string;
  selectedGradient: string;
  selectedTextColor: string;
  selectedBorder: string;
  dotColor: string;
}[] = [
  {
    id: 'midnight',
    title: 'Obsidian Midnight',
    subtitle: 'Deep Satin PVD Coated Alloy',
    palette: '#18181b',
    details: 'Precision-machined from aluminum alloy, bead-blasted and anodized in deep obsidian with anti-fingerprint oleophobic coating.',
    material: 'Anodized 6000-Series Aluminum',
    selectedGradient: 'bg-gradient-to-r from-[#141416] via-[#242429] to-[#141416]',
    selectedTextColor: 'text-zinc-200',
    selectedBorder: 'border-zinc-800/80',
    dotColor: '#c29a4b',
  },
  {
    id: 'silver',
    title: 'Alabaster Silver',
    subtitle: 'Pure Satin Silver Luster',
    palette: '#e4e4e7',
    details: 'Pure metallic sheen reflecting light subtly across the sculpted gimbal arc and CNC-etched outer chamfers.',
    material: 'Bead-Blasted Ceramic Matte Silver',
    selectedGradient: 'bg-gradient-to-r from-[#e4e4e7] via-[#f4f4f5] to-[#e4e4e7]',
    selectedTextColor: 'text-zinc-900',
    selectedBorder: 'border-zinc-300',
    dotColor: '#71717a',
  },
  {
    id: 'titanium',
    title: 'Champagne Titanium',
    subtitle: 'Warm Brushed Brass & Titanium',
    palette: '#d8c7a6',
    details: 'Inspired by bespoke Swiss mechanical timepieces, combining brushed warm titanium with muted champagne accents.',
    material: 'Grade-5 Titanium & PVD Brass',
    selectedGradient: 'bg-gradient-to-r from-[#ebdcc7] via-[#f6efe4] to-[#ebdcc7]',
    selectedTextColor: 'text-[#3d301f]',
    selectedBorder: 'border-[#d8c7a6]',
    dotColor: '#c29a4b',
  },
  {
    id: 'emerald',
    title: 'Forest Emerald',
    subtitle: 'Deep Alpine Ceramic Luster',
    palette: '#14382e',
    details: 'A limited atelier edition featuring rich pine emerald earcups paired with deep forest memory foam cushions.',
    material: 'Ceramic Composite & Fine Leather',
    selectedGradient: 'bg-gradient-to-r from-[#0d2820] via-[#164236] to-[#0d2820]',
    selectedTextColor: 'text-emerald-100',
    selectedBorder: 'border-emerald-800/70',
    dotColor: '#34d399',
  },
];

export const ColorStudio: React.FC = () => {
  const { selectedColor, setSelectedColor } = useProductStore();
  const cardRefs = useRef<Map<Colorway, HTMLDivElement>>(new Map());
  const userTappedRef = useRef<boolean>(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = (finishId: Colorway) => {
    userTappedRef.current = true;
    setSelectedColor(finishId);
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    tapTimeoutRef.current = setTimeout(() => {
      userTappedRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    // Only engage scroll-spy auto-selection on mobile/touch screens
    const isTouchOrMobile = typeof window !== 'undefined' && (window.innerWidth < 640 || window.matchMedia('(hover: none)').matches);
    if (!isTouchOrMobile || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (userTappedRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const finishId = entry.target.getAttribute('data-finish-id') as Colorway | null;
            if (finishId && finishId !== selectedColor) {
              setSelectedColor(finishId);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.5,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, [selectedColor, setSelectedColor]);

  return (
    <section id="studio" className="section-anchor py-24 px-4 sm:px-8 bg-white border-y border-hairline">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="04"
            eyebrow="Material Atelier"
            title="Four Iconic Finishes"
            subtitle="Each colorway is treated with specialized metallurgical coatings for exceptional scratch resistance and tactile refinement."
            className="mb-12"
          />
        </MotionReveal>

        {/* 4 Cards Grid with Cascading Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioFinishes.map((finish, idx) => {
            const isSelected = selectedColor === finish.id;

            return (
              <MotionReveal key={finish.id} direction="up" delay={idx * 75} className="flex">
                <div
                  ref={(el) => {
                    if (el) cardRefs.current.set(finish.id, el);
                    else cardRefs.current.delete(finish.id);
                  }}
                  data-finish-id={finish.id}
                  onClick={() => handleCardClick(finish.id)}
                  className={`w-full cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                    isSelected
                      ? 'bg-canvas border-brass/60 shadow-md ring-1 ring-brass/20 scale-[1.01]'
                      : 'bg-white border-hairline hover:border-black/20 hover:shadow-sm'
                  }`}
                >
                  {/* Specular Light Refraction Sheen Sweep on Selection */}
                  {isSelected && (
                    <div
                      key={finish.id}
                      className="absolute inset-0 pointer-events-none w-[60%] h-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent -top-1/2 animate-metallic-sheen"
                    />
                  )}
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
                        <span className="flex items-center gap-1 text-[11px] font-mono text-brass font-semibold">
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

                  <div
                    className={`-mx-6 -mb-6 mt-6 px-6 py-3.5 border-t text-[11px] font-mono transition-all duration-300 flex items-center justify-between gap-2 ${
                      isSelected
                        ? `${finish.selectedGradient} ${finish.selectedTextColor} ${finish.selectedBorder} font-medium shadow-inner`
                        : 'bg-zinc-50/70 text-zinc-500 border-hairline group-hover:bg-zinc-100/70'
                    }`}
                    data-testid="finish-material-dock"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 ${isSelected ? 'scale-125 shadow-xs' : 'opacity-60'}`}
                        style={{ backgroundColor: isSelected ? finish.dotColor : finish.palette }}
                      />
                      <span className="truncate">{finish.material}</span>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
