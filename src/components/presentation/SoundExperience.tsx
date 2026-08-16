'use client';

import React from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { SectionHeader } from './SectionHeader';
import { AcousticWaveform } from './AcousticWaveform';
import { SpatialRadar } from './SpatialRadar';
import { AncModeSelector, ancModesList } from './AncModeSelector';
import { SpatialAudioController } from './SpatialAudioController';
import { MotionReveal } from '../motion/MotionReveal';
import { Sliders, Compass, Radio } from 'lucide-react';

export const SoundExperience: React.FC = () => {
  const {
    ancMode,
    setAncMode,
    spatialAngle,
    setSpatialAngle,
    isSpatialActive,
    toggleSpatial,
  } = useProductStore();

  const activeAnc = ancModesList.find((m) => m.id === ancMode);

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 bg-white border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Reveal */}
        <MotionReveal direction="up">
          <SectionHeader
            step="02"
            eyebrow="Interactive Sound Lab"
            title="Acoustic Isolation & Soundstage"
            subtitle="Test RoH Sound's adaptive neural cancellation curves and calibrate the 360-degree binaural spatial audio engine in real time."
            className="pb-10 border-b border-black/[0.06]"
          >
            <div className="flex items-center gap-2 bg-[#fafaf9] px-4 py-2 rounded-full border border-black/[0.06] text-xs font-mono text-zinc-600">
              <Radio className="w-3.5 h-3.5 text-[#b8934a] animate-pulse" />
              <span>Neural DSP Engine: Active (24ms)</span>
            </div>
          </SectionHeader>
        </MotionReveal>

        {/* Two Interactive Modules Grid with Staggered Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Module 1: ANC Simulator */}
          <MotionReveal direction="up" delay={100} className="lg:col-span-6 flex">
            <div className="w-full bg-[#fafaf9] rounded-3xl p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm tracking-wide">
                    <Sliders className="w-4 h-4 text-[#b8934a]" />
                    <span>Active Noise Cancellation Matrix</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">
                    {activeAnc?.reduction}
                  </span>
                </div>

                {/* Dynamic Waveform Sub-Component */}
                <AcousticWaveform mode={ancMode} className="mb-6" />

                {/* Modular ANC Mode Selector */}
                <AncModeSelector currentMode={ancMode} onSelectMode={setAncMode} />
              </div>
            </div>
          </MotionReveal>

          {/* Module 2: 360° Spatial Audio Soundstage */}
          <MotionReveal direction="up" delay={200} className="lg:col-span-6 flex">
            <div className="w-full bg-[#fafaf9] rounded-3xl p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm tracking-wide">
                    <Compass className="w-4 h-4 text-[#b8934a]" />
                    <span>360° Spatial Audio Orbit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-500 font-semibold">
                      {spatialAngle}° Azimuth
                    </span>
                  </div>
                </div>

                {/* Orbital Radar Sub-Component */}
                <SpatialRadar
                  angle={spatialAngle}
                  isSpatialActive={isSpatialActive}
                  className="mb-6"
                />

                {/* Modular Spatial Audio Controller */}
                <SpatialAudioController
                  isActive={isSpatialActive}
                  angle={spatialAngle}
                  onToggle={toggleSpatial}
                  onAngleChange={setSpatialAngle}
                />
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};
