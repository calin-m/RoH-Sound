import React from 'react';

export interface SectionHeaderProps {
  step: string;
  eyebrow: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  step,
  eyebrow,
  title,
  subtitle,
  className = '',
  children,
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Step Badge & Eyebrow */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold tracking-widest text-brass">
          {step}
        </span>
        <span className="h-3 w-px bg-black/10" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {eyebrow}
        </span>
      </div>

      {/* Optional Title & Subtitle */}
      {(title || subtitle || children) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      )}
    </div>
  );
};
