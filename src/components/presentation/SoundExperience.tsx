'use client';

import React from 'react';
import { useProductStore, ANCMode } from '@/stores/useProductStore';
import { SectionHeader } from './SectionHeader';
import { AcousticWaveform } from './AcousticWaveform';
import { SpatialRadar } from './SpatialRadar';
import { Sliders, Compass, Radio } from 'lucide-react';

const ancModes: {
  id: ANCMode;
  name: string;
  reduction: string;
  desc: string;
}[] = [
  {
    id: 'transparency',
    name: 'Natural Transparency',
    reduction: '0dB (Binaural Pass-Through)',
    desc: 'Microphones feed ambient speech and acoustics naturally into the soundstage.',
  },
  {
    id: 'balanced',
    name: 'Balanced Studio',
    reduction: '-25dB Attenuation',
    desc: 'Ideal for creative studio environments, filtering HVAC and low-frequency drone.',
  },
  {
    id: 'ultra',
    name: 'Ultra Hybrid ANC',
    reduction: '-48dB Neural Cancellation',
    desc: 'Quad-feedforward microphones completely isolate engine and transit rumble.',
  },
];

export const SoundExperience: React.FC = () => {
  const {
    ancMode,
    setAncMode,
    spatialAngle,
    setSpatialAngle,
    isSpatialActive,
    toggleSpatial,
  } = useProductStore();

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 bg-white border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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

        {/* Two Interactive Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Module 1: ANC Simulator */}
          <div className="lg:col-span-6 bg-[#fafaf9] rounded-3xl p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm tracking-wide">
                  <Sliders className="w-4 h-4 text-[#b8934a]" />
                  <span>Active Noise Cancellation Matrix</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  {ancModes.find((m) => m.id === ancMode)?.reduction}
                </span>
              </div>

              {/* Dynamic Waveform Sub-Component */}
              <AcousticWaveform mode={ancMode} className="mb-6" />

              {/* Mode Selectors */}
              <div className="flex flex-col gap-2.5">
                {ancModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setAncMode(mode.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between cursor-pointer ${
                      ancMode === mode.id
                        ? 'bg-white border-zinc-950 shadow-sm ring-1 ring-zinc-950/10'
                        : 'bg-white/50 border-black/[0.04] hover:bg-white hover:border-black/[0.08]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-zinc-900">{mode.name}</div>
                      <div className="text-xs text-zinc-500 font-light mt-0.5">{mode.desc}</div>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                        ancMode === mode.id
                          ? 'bg-zinc-950 text-white'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {mode.id === 'ultra' ? '-48dB' : mode.id === 'balanced' ? '-25dB' : '0dB'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module 2: 360° Spatial Audio Soundstage */}
          <div className="lg:col-span-6 bg-[#fafaf9] rounded-3xl p-6 sm:p-8 border border-black/[0.06] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-zinc-900 font-medium text-sm tracking-wide">
                  <Compass className="w-4 h-4 text-[#b8934a]" />
                  <span>360° Spatial Audio Orbit</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSpatial}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer ${
                      isSpatialActive
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {isSpatialActive ? 'Spatial ON' : 'Spatial OFF'}
                  </button>
                  <span className="font-mono text-xs text-zinc-500 font-semibold">
                    {spatialAngle}°
                  </span>
                </div>
              </div>

              {/* Orbital Radar Sub-Component */}
              <SpatialRadar
                angle={spatialAngle}
                isSpatialActive={isSpatialActive}
                className="mb-6"
              />

              {/* Interactive Angle Slider */}
              <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
                <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span>Rotate Position</span>
                  <span>{spatialAngle}° / 360°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={spatialAngle}
                  onChange={(e) => setSpatialAngle(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-zinc-950"
                  aria-label="Spatial audio angle slider"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
                  <span>0° Front</span>
                  <span>90° Right</span>
                  <span>180° Rear</span>
                  <span>270° Left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
