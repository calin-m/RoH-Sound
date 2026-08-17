'use client';

import React, { useState, useEffect } from 'react';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show Back to Top button once scrolled down past hero section
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white border-t border-black/[0.06] pt-16 pb-20 px-4 sm:px-8">
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
                  <li><a href="#acoustic" className="hover:text-zinc-950 transition-colors">Titanium Transducers</a></li>
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
              © {new Date().getFullYear()}{' '}
              <a
                href="https://github.com/calin-m"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-950 transition-colors underline decoration-black/20 underline-offset-4"
              >
                Calin M
              </a>
              . All rights reserved.
            </div>

            <div>
              <span>Pure Acoustic Architecture</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 sm:right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/95 hover:bg-white text-zinc-700 hover:text-zinc-950 text-xs font-mono rounded-full border border-black/[0.08] shadow-xl backdrop-blur-md transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
          >
            <ArrowUp className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-950 transition-transform group-hover:-translate-y-0.5 duration-200" />
            <span>Back to top</span>
          </button>
        </div>
      )}
    </>
  );
};
