'use client';

import React from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { SectionHeader } from './SectionHeader';
import { ColorwaySelector, COLORWAYS_LIST } from './ColorwaySelector';
import { HeadphoneVisualizer } from './HeadphoneVisualizer';
import { MotionReveal } from '../motion/MotionReveal';
import { MagneticButton } from '../motion/MagneticButton';
import { AcousticRipple } from '../motion/AcousticRipple';
import { AcousticTextWave } from '../motion/AcousticTextWave';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    selectedColor,
    setSelectedColor,
    viewAngle,
    setViewAngle,
    setDrawerOpen,
  } = useProductStore();

  const activeColorDesc = COLORWAYS_LIST.find((c) => c.id === selectedColor)?.desc;

  return (
    <section id="hero" className="section-anchor relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden radial-glow-subtle">
      {/* Background Decorative Hairline Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-hairline-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-hairline-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header & Rating Badge */}
        <MotionReveal direction="down" duration={600}>
          <SectionHeader step="01" eyebrow="Acoustic Architecture" className="!mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-hairline text-xs font-medium text-zinc-600 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>4.9 / 5.0 Rating • 1,240+ Sound Engineers</span>
            </div>
          </SectionHeader>
        </MotionReveal>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Selection */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <MotionReveal direction="up" delay={100} duration={700}>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-zinc-950 leading-[1.08]">
                Pure Acoustic Precision.{' '}
                <span className="font-normal block text-zinc-900">Zero Distortion.</span>
              </h1>
            </MotionReveal>

            <MotionReveal direction="up" delay={200} duration={700}>
              <p className="mt-5 text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-lg">
                Engineered with 45mm custom Titanium-Graphene drivers, neural-active 48dB hybrid cancellation, and uncompressed 24-bit/192kHz LDAC wireless audio.
              </p>
            </MotionReveal>

            {/* Colorway Switcher */}
            <MotionReveal direction="up" delay={300} duration={700}>
              <div className="mt-8 pt-6 border-t border-hairline">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
                    Finish: <strong className="text-zinc-950 capitalize">{selectedColor}</strong>
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {activeColorDesc}
                  </span>
                </div>

                <ColorwaySelector
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                  variant="swatch"
                />
              </div>
            </MotionReveal>

            {/* Primary Pre-Order Hero CTA */}
            <MotionReveal direction="up" delay={400} duration={700}>
              <div className="mt-9 flex items-center">
                <MagneticButton strength={0.15}>
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-900 text-white rounded-full px-7 sm:px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-[0_10px_28px_var(--color-brass)/20] border border-white/10 hover:border-brass/40 active:scale-98 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-brass-light" />
                    <AcousticTextWave text="Pre-Order RoH Sound • $399" />
                  </button>
                </MagneticButton>
              </div>
            </MotionReveal>

            {/* Reassurance Micro-Copy */}
            <MotionReveal direction="up" delay={500} duration={700}>
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" /> 3-Year Precision Warranty
                </span>
                <span className="text-zinc-300 hidden sm:inline">•</span>
                <span>30-Day In-Home Audition</span>
                <span className="text-zinc-300 hidden sm:inline">•</span>
                <span>Free Express Shipping</span>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Studio Lighting Vector Showcase with Ambient Soundwaves */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Permanent Ambient Acoustic Soundwave Backing */}
            <AcousticRipple active={true} />

            {/* Dynamic Headphone Visualizer with Atelier 360° Turntable Indicator */}
            <MotionReveal direction="none" delay={200} duration={800} className="w-full flex justify-center py-4 relative z-10">
              <HeadphoneVisualizer
                color={selectedColor}
                angle={viewAngle}
                onAngleChange={setViewAngle}
                isPlayingDemo={false}
              />
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
