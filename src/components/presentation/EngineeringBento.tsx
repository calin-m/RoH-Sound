'use client';

import React from 'react';
import { Cpu, BatteryCharging, Zap, Feather, Waves, Bluetooth } from 'lucide-react';

export const EngineeringBento: React.FC = () => {
  return (
    <section id="engineering" className="py-24 px-4 sm:px-8 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto">
        {/* Step Index & Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
            03
          </span>
          <span className="h-3 w-px bg-black/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Acoustic Engineering
          </span>
        </div>

        <div className="max-w-xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
            Engineered Down to the Micron
          </h2>
          <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
            Every component is crafted from aerospace-grade materials to eliminate unwanted resonance and reproduce music precisely as recorded.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 45mm Custom Driver (Large 8-col) */}
          <div className="md:col-span-8 bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
                  <Waves className="w-3 h-3 text-[#b8934a]" /> Diaphragm Matrix
                </span>
                <h3 className="text-2xl font-light text-zinc-950 mt-4">
                  45mm Custom Graphene Driver
                </h3>
                <p className="text-zinc-600 font-light text-sm mt-2 max-w-md">
                  Ultralight graphene vapor-deposited on a titanium substrate delivers lightning-fast transient response and near-zero harmonic distortion (&lt; 0.05% THD).
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-black/[0.06] flex items-center justify-center text-zinc-900 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-[#b8934a]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-black/[0.06]">
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-medium text-zinc-950">4Hz – 45kHz</span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase">Frequency Range</span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-medium text-zinc-950">&lt; 0.05%</span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase">Total Distortion</span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-medium text-zinc-950">32 Ω</span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase">Impedance</span>
              </div>
            </div>
          </div>

          {/* Card 2: Neural DSP H1 (4-col) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
                <Cpu className="w-3 h-3 text-[#b8934a]" /> Silicon Architecture
              </span>
              <h3 className="text-xl font-light text-zinc-950 mt-4">
                H1 Neural DSP
              </h3>
              <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
                Dedicated dual-core digital signal processor sampling acoustic environmental feedback 50,000 times per second with ultra-low 24ms gaming latency.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Sampling Rate</span>
              <span className="font-semibold text-zinc-900">50 kHz Adaptive</span>
            </div>
          </div>

          {/* Card 3: 65-Hour Battery (4-col) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
                <BatteryCharging className="w-3 h-3 text-emerald-600" /> Endurance
              </span>
              <h3 className="text-xl font-light text-zinc-950 mt-4">
                65 Hours Playback
              </h3>
              <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
                High-density lithium-polymer battery with USB-C QuickBoost. 15 minutes of charging provides 10 hours of uninterrupted playback.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Fast Charge</span>
              <span className="font-semibold text-emerald-600">15 min = 10 hrs</span>
            </div>
          </div>

          {/* Card 4: Wireless Codec LDAC (4-col) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
                <Bluetooth className="w-3 h-3 text-blue-600" /> Transmission
              </span>
              <h3 className="text-xl font-light text-zinc-950 mt-4">
                Bluetooth 5.4 LDAC
              </h3>
              <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
                Certified Hi-Res Wireless transmitting 3x more data than standard Bluetooth (990 kbps / 24-bit 192kHz) for zero compression loss.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Bitrate</span>
              <span className="font-semibold text-zinc-900">990 kbps (Lossless)</span>
            </div>
          </div>

          {/* Card 5: Ergonomics & Weight (4-col) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
                <Feather className="w-3 h-3 text-[#b8934a]" /> Ergonomics
              </span>
              <h3 className="text-xl font-light text-zinc-950 mt-4">
                240g Featherweight
              </h3>
              <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2">
                Die-cast magnesium frame wrapped in breathable Italian protein leather memory foam cushions for fatigue-free all-day listening.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Chassis Weight</span>
              <span className="font-semibold text-zinc-900">240 grams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
