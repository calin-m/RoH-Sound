'use client';

import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { setDrawerOpen, selectedColor } = useProductStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled down past hero
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white border-t border-black/[0.06] pt-16 pb-28 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col justify-between gap-12">
          <MotionReveal direction="up">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white font-mono text-xs font-bold">
                    R
                  </div>
                  <span className="font-sans text-sm font-semibold tracking-[0.2em] text-zinc-950 uppercase">
                    RoH<span className="text-[#b8934a] font-normal ml-0.5">·</span>SOUND
                  </span>
                </div>
                <p className="mt-4 text-xs text-zinc-500 font-light max-w-sm leading-relaxed">
                  Pure Acoustic Architecture. Dedicated to uncompromising electroacoustic engineering, zero-distortion transducers, and timeless minimalist aesthetics.
                </p>
              </div>

              <div className="md:col-span-3">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  Exploration
                </div>
                <ul className="space-y-2 text-xs text-zinc-600 font-light">
                  <li><a href="#experience" className="hover:text-zinc-950 transition-colors">Acoustic Sound Lab</a></li>
                  <li><a href="#engineering" className="hover:text-zinc-950 transition-colors">Titanium Transducers</a></li>
                  <li><a href="#studio" className="hover:text-zinc-950 transition-colors">Metallurgical Finishes</a></li>
                  <li><a href="#specs" className="hover:text-zinc-950 transition-colors">Laboratory Metrics</a></li>
                </ul>
              </div>

              <div className="md:col-span-3">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  Concierge & Legal
                </div>
                <ul className="space-y-2 text-xs text-zinc-600 font-light">
                  <li><a href="#faq" className="hover:text-zinc-950 transition-colors">30-Day Audition Policy</a></li>
                  <li><a href="#faq" className="hover:text-zinc-950 transition-colors">3-Year Platinum Warranty</a></li>
                  <li><a href="mailto:concierge@rohsound.example" className="hover:text-zinc-950 transition-colors">Acoustic Support Desk</a></li>
                  <li><span className="text-zinc-400">Zurich • Tokyo • San Francisco</span></li>
                </ul>
              </div>
            </div>
          </MotionReveal>

          <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
            <div>
              © {new Date().getFullYear()} RoH Sound Laboratories AG. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <span>Pure Acoustic Architecture</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Purchase Bar */}
      {showStickyBar && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-8 z-40 animate-in slide-in-from-bottom-6 duration-300">
          <div className="glass-crystal rounded-full p-2 pl-5 pr-2 flex items-center justify-between gap-4 sm:gap-6 shadow-2xl border border-black/[0.08]">
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-zinc-950">RoH Sound Flagship</span>
              <span className="text-[10px] font-mono text-zinc-500 capitalize">
                {selectedColor} • $399
              </span>
            </div>

            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Pre-Order</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
