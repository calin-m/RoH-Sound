'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle } from 'lucide-react';

type SpecCategory = 'acoustic' | 'connectivity' | 'battery' | 'physical';

const specsData: Record<SpecCategory, { label: string; value: string; detail: string }[]> = {
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

const comparisonTable = [
  { feature: 'Driver Technology', roh: '45mm Titanium-Graphene', brandS: '40mm Carbon Fiber', brandB: '40mm Standard Dynamic' },
  { feature: 'Noise Cancellation', roh: '-48dB Neural Hybrid', brandS: '-38dB Standard Hybrid', brandB: '-35dB Feedforward' },
  { feature: 'Battery Life (ANC On)', roh: '50 Hours (65h Off)', brandS: '30 Hours', brandB: '24 Hours' },
  { feature: 'Lossless Codec', roh: 'LDAC + USB-C Digital (24-bit)', brandS: 'LDAC Only', brandB: 'AAC Only' },
  { feature: 'Weight', roh: '240 grams', brandS: '254 grams', brandB: '280 grams' },
  { feature: 'Price', roh: '$399', brandS: '$449', brandB: '$379' },
];

export const TechnicalSpecs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SpecCategory>('acoustic');

  const categories: { id: SpecCategory; label: string }[] = [
    { id: 'acoustic', label: 'Acoustics & Transducers' },
    { id: 'connectivity', label: 'Wireless & Codecs' },
    { id: 'battery', label: 'Power & Charging' },
    { id: 'physical', label: 'Materials & Ergonomics' },
  ];

  return (
    <section id="specs" className="py-24 px-4 sm:px-8 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto">
        {/* Step Index & Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
            05
          </span>
          <span className="h-3 w-px bg-black/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Technical Architecture
          </span>
        </div>

        <div className="max-w-xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
            Uncompromising Specifications
          </h2>
          <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
            Verified laboratory measurements and component tolerances engineered for demanding audiophiles and sound professionals.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-black/[0.06] pb-4">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeCategory === tab.id
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-black/[0.06] hover:bg-zinc-50 hover:text-zinc-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Spec Matrix List */}
        <div className="bg-white rounded-3xl border border-black/[0.06] divide-y divide-black/[0.04] shadow-sm mb-16 overflow-hidden">
          {specsData[activeCategory].map((spec, index) => (
            <div
              key={index}
              className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50/50 transition-colors"
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

        {/* Direct Competitor Benchmark Comparison */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-[#b8934a]" />
            <h3 className="text-xl font-light text-zinc-950">
              Direct Benchmark Comparison
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-black/[0.06] bg-zinc-50/50 font-mono text-xs text-zinc-500 uppercase">
                  <th className="p-5 pl-8 font-medium">Specification</th>
                  <th className="p-5 font-bold text-zinc-950 bg-[#fafaf9]">
                    <span className="inline-flex items-center gap-1.5 text-zinc-950">
                      RoH Sound <span className="text-[#b8934a]">★</span>
                    </span>
                  </th>
                  <th className="p-5 font-normal text-zinc-500">Brand S Flagship</th>
                  <th className="p-5 pr-8 font-normal text-zinc-500">Brand B Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] font-mono text-xs">
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-5 pl-8 font-sans font-medium text-zinc-900">{row.feature}</td>
                    <td className="p-5 font-bold text-zinc-950 bg-[#fafaf9] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b8934a] inline shrink-0" />
                      <span>{row.roh}</span>
                    </td>
                    <td className="p-5 text-zinc-600 font-normal">{row.brandS}</td>
                    <td className="p-5 pr-8 text-zinc-600 font-normal">{row.brandB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
