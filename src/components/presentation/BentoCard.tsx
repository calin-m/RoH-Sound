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
      className={`w-full bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between group hover:border-[#b8934a]/30 hover:shadow-md transition-all duration-300 relative overflow-hidden ${className}`}
      data-testid="bento-card"
    >
      {/* Subtle corner light refraction on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b8934a]/[0.06] to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200/80 transition-colors">
              {badgeIcon}
              <span>{badgeText}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-zinc-950 mt-4 group-hover:text-black transition-colors">
              {title}
            </h3>
            <p className="text-zinc-600 font-light text-xs sm:text-sm mt-2 max-w-md">
              {description}
            </p>
          </div>

          {topRightIcon && (
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-black/[0.06] flex items-center justify-center text-zinc-900 group-hover:scale-110 group-hover:border-[#b8934a]/40 group-hover:bg-[#b8934a]/[0.05] group-hover:text-[#b8934a] transition-all duration-300 shrink-0 ml-4 shadow-2xs">
              {topRightIcon}
            </div>
          )}
        </div>

        {children}
      </div>

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 pt-6 border-t border-black/[0.06]">
          {stats.map((stat, i) => (
            <div key={i}>
              <span className="block font-mono text-base sm:text-2xl font-medium text-zinc-950">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono uppercase block mt-0.5">
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
