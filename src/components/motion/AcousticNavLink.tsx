import React from 'react';

export interface AcousticNavLinkProps {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
}

export const AcousticNavLink: React.FC<AcousticNavLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
}) => {
  const letters = Array.from(children);

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group/navlink relative inline-flex items-center text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 hover:text-zinc-950 transition-colors duration-200 py-1 ${className}`}
      data-testid="acoustic-nav-link"
    >
      {/* Letter Visualizer Wave */}
      <span className="inline-flex overflow-visible" aria-label={children}>
        {letters.map((char, index) => {
          const isSpace = char === ' ';
          return (
            <span
              key={index}
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-[var(--ease-spring)] group-hover/navlink:-translate-y-[3.5px] group-hover/navlink:text-zinc-950 will-change-transform"
              style={{
                transitionDelay: `${index * 24}ms`,
              }}
            >
              {isSpace ? '\u00A0' : char}
            </span>
          );
        })}
      </span>

      {/* Acoustic Hairline Sweep Underline */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover/navlink:w-full bg-[#b8934a] transition-all duration-300 ease-[var(--ease-smooth)] rounded-full pointer-events-none opacity-80"
      />
    </a>
  );
};
