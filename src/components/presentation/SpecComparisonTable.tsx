import React from 'react';
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
  return (
    <div className={`mt-16 ${className}`} data-testid="spec-comparison-table">
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
