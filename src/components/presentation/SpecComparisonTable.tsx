'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  roh: string;
  brandS: string;
  brandB: string;
}

export const DEFAULT_COMPARISON_DATA: ComparisonRow[] = [
  { feature: 'Driver Technology', roh: '45mm Titanium-Graphene', brandS: '40mm Carbon Fiber', brandB: '40mm Standard Dynamic' },
  { feature: 'Noise Cancellation', roh: '-48dB Neural Hybrid', brandS: '-38dB Standard Hybrid', brandB: '-35dB Feedforward' },
  { feature: 'Battery Life (ANC On)', roh: '50 Hours (65h Off)', brandS: '30 Hours', brandB: '24 Hours' },
  { feature: 'Lossless Codec', roh: 'LDAC + USB-C Digital (24-bit)', brandS: 'LDAC Only', brandB: 'AAC Only' },
  { feature: 'Weight', roh: '240 grams', brandS: '254 grams', brandB: '280 grams' },
  { feature: 'Price', roh: '$399', brandS: '$449', brandB: '$379' },
];

export interface SpecComparisonTableProps {
  rows?: ComparisonRow[];
  className?: string;
}

export const SpecComparisonTable: React.FC<SpecComparisonTableProps> = ({
  rows = DEFAULT_COMPARISON_DATA,
  className = '',
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<'brandS' | 'brandB'>('brandS');

  return (
    <div className={`mt-16 ${className}`} data-testid="spec-comparison-table">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="w-4 h-4 text-[#b8934a]" />
        <h3 className="text-xl font-light text-zinc-950">
          Direct Benchmark Comparison
        </h3>
      </div>

      {/* Mobile Interactive Versus Switcher (< md) */}
      <div className="block md:hidden">
        {/* Segmented Competitor Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100/90 rounded-2xl mb-4 text-xs font-mono">
          <button
            onClick={() => setSelectedCompetitor('brandS')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all font-medium cursor-pointer ${
              selectedCompetitor === 'brandS'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            vs. Brand S Flagship
          </button>
          <button
            onClick={() => setSelectedCompetitor('brandB')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all font-medium cursor-pointer ${
              selectedCompetitor === 'brandB'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            vs. Brand B Studio
          </button>
        </div>

        {/* Stacked Benchmark Cards */}
        <div className="space-y-3">
          {rows.map((row, idx) => {
            const competitorValue = selectedCompetitor === 'brandS' ? row.brandS : row.brandB;
            const competitorLabel = selectedCompetitor === 'brandS' ? 'Brand S' : 'Brand B';

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-xs flex flex-col gap-2.5"
              >
                <div className="text-xs font-medium text-zinc-500 font-sans tracking-wide">
                  {row.feature}
                </div>

                {/* RoH Sound Advantage Highlight */}
                <div className="flex items-center justify-between bg-zinc-50/90 rounded-xl px-3.5 py-2.5 border border-black/[0.04]">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-950">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b8934a] shrink-0" />
                    RoH Sound
                  </span>
                  <span className="text-xs font-bold text-zinc-950 font-mono">
                    {row.roh}
                  </span>
                </div>

                {/* Competitor Row */}
                <div className="flex items-center justify-between px-3.5 py-1 text-xs text-zinc-500 font-mono">
                  <span className="text-zinc-400">{competitorLabel}</span>
                  <span className="text-zinc-600 font-medium">{competitorValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop 4-Column Matrix (>= md) */}
      <div className="hidden md:block bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-x-auto">
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
            {rows.map((row, idx) => (
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
  );
};
