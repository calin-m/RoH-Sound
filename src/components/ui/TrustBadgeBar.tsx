import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export interface TrustBadgeItem {
  icon?: React.ReactNode;
  label: string;
}

export interface TrustBadgeBarProps {
  items?: TrustBadgeItem[];
  className?: string;
}

const defaultTrustBadges: TrustBadgeItem[] = [
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    label: '4.9 / 5.0 Global Rating',
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-zinc-800" />,
    label: '3-Year Extended Warranty',
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    label: '30-Day Risk-Free Audition',
  },
];

export const TrustBadgeBar: React.FC<TrustBadgeBarProps> = ({
  items = defaultTrustBadges,
  className = '',
}) => {
  return (
    <div
      className={`p-6 bg-canvas rounded-2xl border border-hairline flex flex-wrap items-center justify-around gap-6 text-xs text-zinc-600 font-mono ${className}`}
      data-testid="trust-badge-bar"
    >
      {items.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {badge.icon}
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};
