'use client';

import React from 'react';
import { SectionHeader } from './SectionHeader';
import { BentoCard } from './BentoCard';
import { MotionReveal } from '../motion/MotionReveal';
import { Cpu, BatteryCharging, Zap, Feather, Waves, Bluetooth } from 'lucide-react';

export const AcousticBento: React.FC = () => {
  return (
    <section id="acoustic" className="section-anchor py-24 px-4 sm:px-8 bg-canvas">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="03"
            eyebrow="Acoustic"
            title="Engineered Down to the Micron"
            subtitle="Every component is crafted from aerospace-grade materials to eliminate unwanted resonance and reproduce music precisely as recorded."
            className="mb-12"
          />
        </MotionReveal>

        {/* Bento Grid with Cascading Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 45mm Custom Driver (Large 8-col) */}
          <MotionReveal direction="up" delay={50} className="md:col-span-8 flex">
            <BentoCard
              badgeIcon={<Waves className="w-3 h-3 text-brass" />}
              badgeText="Diaphragm Matrix"
              title="45mm Custom Graphene Driver"
              description="Ultralight graphene vapor-deposited on a titanium substrate delivers lightning-fast transient response and near-zero harmonic distortion (< 0.05% THD)."
              topRightIcon={<Zap className="w-5 h-5 text-brass" />}
              stats={[
                { value: '4Hz – 45kHz', label: 'Frequency Range' },
                { value: '< 0.05%', label: 'Total Distortion' },
                { value: '32 Ω', label: 'Impedance' },
              ]}
            />
          </MotionReveal>

          {/* Card 2: Neural DSP H1 (4-col) */}
          <MotionReveal direction="up" delay={100} className="md:col-span-4 flex">
            <BentoCard
              badgeIcon={<Cpu className="w-3 h-3 text-brass" />}
              badgeText="Silicon Architecture"
              title="H1 Neural DSP"
              description="Dedicated dual-core digital signal processor sampling acoustic environmental feedback 50,000 times per second with ultra-low 24ms gaming latency."
              footer={
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Sampling Rate</span>
                  <span className="font-semibold text-zinc-900">50 kHz Adaptive</span>
                </div>
              }
            />
          </MotionReveal>

          {/* Card 3: 65-Hour Battery (4-col) */}
          <MotionReveal direction="up" delay={150} className="md:col-span-4 flex">
            <BentoCard
              badgeIcon={<BatteryCharging className="w-3 h-3 text-emerald-600" />}
              badgeText="Endurance"
              title="65 Hours Playback"
              description="High-density lithium-polymer battery with USB-C QuickBoost. 15 minutes of charging provides 10 hours of uninterrupted playback."
              footer={
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Fast Charge</span>
                  <span className="font-semibold text-emerald-600">15 min = 10 hrs</span>
                </div>
              }
            />
          </MotionReveal>

          {/* Card 4: Wireless Codec LDAC (4-col) */}
          <MotionReveal direction="up" delay={200} className="md:col-span-4 flex">
            <BentoCard
              badgeIcon={<Bluetooth className="w-3 h-3 text-blue-600" />}
              badgeText="Transmission"
              title="Bluetooth 5.4 LDAC"
              description="Certified Hi-Res Wireless transmitting 3x more data than standard Bluetooth (990 kbps / 24-bit 192kHz) for zero compression loss."
              footer={
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Bitrate</span>
                  <span className="font-semibold text-zinc-900">990 kbps (Lossless)</span>
                </div>
              }
            />
          </MotionReveal>

          {/* Card 5: Ergonomics & Weight (4-col) */}
          <MotionReveal direction="up" delay={250} className="md:col-span-4 flex">
            <BentoCard
              badgeIcon={<Feather className="w-3 h-3 text-brass" />}
              badgeText="Ergonomics"
              title="240g Featherweight"
              description="Die-cast magnesium frame wrapped in breathable Italian protein leather memory foam cushions for fatigue-free all-day listening."
              footer={
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Chassis Weight</span>
                  <span className="font-semibold text-zinc-900">240 grams</span>
                </div>
              }
            />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};
