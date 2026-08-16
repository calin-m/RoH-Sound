import React from 'react';

export interface BentoStat {
  value: string;
  label: string;
}

export interface BentoCardProps {
  badgeIcon?: React.ReactNode;
  badgeText: string;
  title: string;
  description: string;
  topRightIcon?: React.ReactNode;
  stats?: BentoStat[];
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  badgeIcon,
  badgeText,
  title,
  description,
  topRightIcon,
  stats,
  footer,
  className = '',
  children,
}) => {
  return (
    <div
      className={`w-full bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow ${className}`}
      data-testid="bento-card"
    >
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700">
              {badgeIcon}
              <span>{badgeText}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-zinc-950 mt-4">
              {title}
            </h3>
            <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2 max-w-md">
              {description}
            </p>
          </div>

          {topRightIcon && (
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-black/[0.06] flex items-center justify-center text-zinc-900 group-hover:scale-105 transition-transform shrink-0 ml-4">
              {topRightIcon}
            </div>
          )}
        </div>

        {children}
      </div>

      {stats && stats.length > 0 && (
        <div className={`grid grid-cols-${stats.length} gap-4 mt-8 pt-6 border-t border-black/[0.06]`}>
          {stats.map((stat, i) => (
            <div key={i}>
              <span className="block font-mono text-xl sm:text-2xl font-medium text-zinc-950">
                {stat.value}
              </span>
              <span className="text-[11px] text-zinc-400 font-mono uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {footer && (
        <div className="mt-6 pt-4 border-t border-black/[0.06]">
          {footer}
        </div>
      )}
    </div>
  );
};
