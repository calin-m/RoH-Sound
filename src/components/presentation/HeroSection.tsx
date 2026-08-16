'use client';

import React from 'react';
import { useProductStore, Colorway, ViewAngle } from '@/stores/useProductStore';
import { HeadphoneVisualizer } from './HeadphoneVisualizer';
import { Play, Pause, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const colorways: { id: Colorway; label: string; hex: string; desc: string }[] = [
  { id: 'midnight', label: 'Obsidian Midnight', hex: '#18181b', desc: 'Anodized PVD Matte' },
  { id: 'silver', label: 'Alabaster Silver', hex: '#e4e4e7', desc: 'Bead-Blasted Alloy' },
  { id: 'titanium', label: 'Champagne Titanium', hex: '#d8c7a6', desc: 'Satin Brass Luster' },
  { id: 'emerald', label: 'Forest Emerald', hex: '#14382e', desc: 'Deep Alpine Ceramic' },
];

export const HeroSection: React.FC = () => {
  const {
    selectedColor,
    setSelectedColor,
    viewAngle,
    setViewAngle,
    isPlayingDemo,
    toggleDemoPlayback,
    setDrawerOpen,
  } = useProductStore();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden radial-glow-subtle">
      {/* Background Decorative Hairline Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Step Index & Eyebrow Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
              01
            </span>
            <span className="h-3 w-px bg-black/10" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Acoustic Architecture
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-black/[0.06] text-xs font-medium text-zinc-600 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>4.9 / 5.0 Rating • 1,240+ Sound Engineers</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Selection */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-zinc-950 leading-[1.08]">
              Pure Acoustic Precision.{' '}
              <span className="font-normal block text-zinc-900">Zero Distortion.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-lg">
              Engineered with 45mm custom Titanium-Graphene drivers, neural-active 48dB hybrid cancellation, and uncompressed 24-bit/192kHz LDAC wireless audio.
            </p>

            {/* Colorway Switcher */}
            <div className="mt-8 pt-6 border-t border-black/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
                  Finish: <strong className="text-zinc-950 capitalize">{selectedColor}</strong>
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {colorways.find((c) => c.id === selectedColor)?.desc}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {colorways.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedColor(item.id)}
                    className={`group relative p-1 rounded-full transition-all duration-300 ${
                      selectedColor === item.id
                        ? 'ring-2 ring-zinc-950 ring-offset-2 ring-offset-[#fafaf9]'
                        : 'hover:ring-1 hover:ring-zinc-400 ring-offset-1 ring-offset-[#fafaf9]'
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
            </div>

            {/* CTA Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-xl active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Pre-Order RoH Sound • $399</span>
              </button>

              <button
                onClick={toggleDemoPlayback}
                className="flex items-center gap-2.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-black/[0.08] rounded-full px-5 py-3.5 text-xs font-medium tracking-wider uppercase transition-all shadow-sm hover:shadow"
              >
                {isPlayingDemo ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#b8934a]" />
                    <span>Pause Audiophile Demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#b8934a] fill-[#b8934a]" />
                    <span>Listen to Sound Stage Demo</span>
                  </>
                )}
              </button>
            </div>

            {/* Reassurance Micro-Copy */}
            <div className="mt-7 flex items-center gap-6 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" /> 3-Year Precision Warranty
              </span>
              <span>•</span>
              <span>30-Day In-Home Audition</span>
              <span>•</span>
              <span>Free Express Shipping</span>
            </div>
          </div>

          {/* Right Column: Studio Lighting Vector Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* View Angle Pill Switcher */}
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md p-1 rounded-full border border-black/[0.06] shadow-sm mb-4">
              {(['front', 'angle', 'side'] as ViewAngle[]).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className={`px-4 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all duration-200 ${
                    viewAngle === angle
                      ? 'bg-zinc-950 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-950'
                  }`}
                >
                  {angle}
                </button>
              ))}
            </div>

            {/* Dynamic Headphone Visualizer */}
            <div className="w-full flex justify-center py-4">
              <HeadphoneVisualizer
                color={selectedColor}
                angle={viewAngle}
                isPlayingDemo={isPlayingDemo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
