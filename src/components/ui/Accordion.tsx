import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  className = '',
}) => {
  return (
    <div
      className={`border-b border-black/[0.06] transition-colors ${className}`}
      data-testid={`accordion-item-${id}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
        className="w-full py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-hidden"
      >
        <span
          className={`text-base sm:text-lg font-light transition-colors ${
            isOpen ? 'text-zinc-950 font-normal' : 'text-zinc-700 group-hover:text-zinc-950'
          }`}
        >
          {title}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? 'bg-zinc-950 text-white border-zinc-950 rotate-180'
              : 'bg-white text-zinc-400 border-black/[0.06] group-hover:border-black/[0.15] group-hover:text-zinc-950'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden text-sm font-light text-zinc-600 leading-relaxed pr-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className = '' }) => {
  return (
    <div className={`divide-y divide-black/[0.06] ${className}`} data-testid="accordion">
      {children}
    </div>
  );
};
