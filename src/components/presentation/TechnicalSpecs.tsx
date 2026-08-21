'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { SpecComparisonTable } from './SpecComparisonTable';
import { MotionReveal } from '@/components/motion/MotionReveal';

export type SpecCategory = 'acoustic' | 'connectivity' | 'battery' | 'physical';

export interface SpecItem {
  label: string;
  value: string;
  detail: string;
}

export const DEFAULT_SPECS_DATA: Record<SpecCategory, SpecItem[]> = {
  acoustic: [
    { label: 'Transducer Driver', value: '45mm Custom Titanium-Graphene', detail: 'Dynamic hybrid diaphragm' },
    { label: 'Frequency Response', value: '4Hz – 45,000Hz (Hi-Res Audio)', detail: 'Extends beyond human hearing range' },
    { label: 'Total Harmonic Distortion', value: '< 0.05% @ 1kHz, 100dB SPL', detail: 'Near-zero harmonic coloration' },
    { label: 'Noise Cancellation', value: 'Hybrid Adaptive Neural ANC (-48dB)', detail: 'Quad external/internal feedback mics' },
    { label: 'Spatial Engine', value: '360° Binaural Head Tracking', detail: 'Integrated 6-axis IMU sensor' },
  ],
  connectivity: [
    { label: 'Bluetooth Standard', value: 'Bluetooth 5.4 Class 1 (30m range)', detail: 'Ultra-low latency dual-link' },
    { label: 'Supported Codecs', value: 'LDAC, AAC, aptX Lossless, SBC, LC3', detail: 'Up to 24-bit/192kHz audio streaming' },
    { label: 'Wired Connection', value: 'USB-C Lossless Audio & 3.5mm Analog', detail: 'Direct DAC bypass mode included' },
    { label: 'Multipoint Pairing', value: 'Simultaneous 2-device connection', detail: 'Seamless auto-switching' },
  ],
  battery: [
    { label: 'Playback Time (ANC Off)', value: 'Up to 65 Hours', detail: 'At 50% continuous volume' },
    { label: 'Playback Time (ANC On)', value: 'Up to 50 Hours', detail: 'Continuous active cancellation' },
    { label: 'Quick Boost Charge', value: '15 Minutes = 10 Hours playback', detail: 'High-speed USB-C Power Delivery' },
    { label: 'Full Charge Time', value: '75 Minutes from 0% to 100%', detail: 'Integrated smart thermal regulation' },
  ],
  physical: [
    { label: 'Headphone Weight', value: '240 grams (8.46 oz)', detail: 'Magnesium-alloy lightweight frame' },
    { label: 'Ear Cushion Material', value: 'Memory Foam with Italian Protein Leather', detail: 'Acoustic-seal breathable contour' },
    { label: 'Water & Dust Rating', value: 'IP54 Splash & Sweat Resistant', detail: 'Hydrophobic acoustic mesh' },
    { label: 'Headband Architecture', value: 'Stainless Steel & Ergonomic Silicone Cushion', detail: 'Even weight distribution arch' },
  ],
};

export interface TechnicalSpecsProps {
  specs?: Record<SpecCategory, SpecItem[]>;
  className?: string;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({
  specs = DEFAULT_SPECS_DATA,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('acoustic');

  const categories: { id: SpecCategory; label: string }[] = [
    { id: 'acoustic', label: 'Acoustics & Transducers' },
    { id: 'connectivity', label: 'Wireless & Codecs' },
    { id: 'battery', label: 'Power & Charging' },
    { id: 'physical', label: 'Materials & Ergonomics' },
  ];

  return (
    <section id="specs" className={`py-24 px-4 sm:px-8 bg-canvas ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="05"
            eyebrow="Technical Architecture"
            title="Uncompromising Specifications"
            subtitle="Verified laboratory measurements and component tolerances engineered for demanding audiophiles and sound professionals."
            className="mb-12"
          />
        </MotionReveal>

        {/* Tab Navigation */}
        <MotionReveal direction="up" delay={100}>
          <div className="flex flex-wrap gap-2.5 mb-8 border-b border-hairline pb-4">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-zinc-950 text-white shadow-md ring-1 ring-brass/30 scale-[1.03]'
                    : 'bg-white text-zinc-600 border border-hairline hover:bg-zinc-50 hover:text-zinc-950 hover:scale-[1.01]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </MotionReveal>

        {/* Spec Matrix List */}
        <MotionReveal direction="up" delay={200}>
          <div className="bg-white rounded-3xl border border-hairline divide-y divide-hairline-subtle shadow-sm mb-16 overflow-hidden">
            {(specs[activeCategory] || []).map((spec, index) => (
              <div
                key={index}
                className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50/75 transition-all border-l-2 border-transparent hover:border-brass hover:pl-7 sm:hover:pl-9"
              >
                <div>
                  <span className="text-sm font-medium text-zinc-950">{spec.label}</span>
                  <span className="block text-xs text-zinc-400 font-light mt-0.5">{spec.detail}</span>
                </div>
                <div className="font-mono text-sm font-semibold text-zinc-900 sm:text-right">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>

        {/* Competitor Benchmark Comparison Sub-Component */}
        <MotionReveal direction="up" delay={300}>
          <SpecComparisonTable />
        </MotionReveal>
      </div>
    </section>
  );
};
