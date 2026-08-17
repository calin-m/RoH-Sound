'use client';

import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { AcousticNavLink } from '../motion/AcousticNavLink';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setDrawerOpen } = useProductStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'RoH', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Acoustic', href: '#acoustic' },
    { name: 'Finishes', href: '#studio' },
    { name: 'Specs', href: '#specs' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3.5 px-4 sm:px-8 flex justify-center`}
      >
        <div
          className={`w-full max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-5 sm:px-7 py-2.5 ${
            isScrolled
              ? 'glass-crystal shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-hairline'
              : 'bg-white/60 backdrop-blur-md border border-hairline-subtle'
          }`}
        >
          {/* Brand Monogram */}
          <a href="#" className="flex items-center gap-2 group" aria-label="RoH Sound Homepage">
            <div className="relative flex items-center justify-center">
              {/* Ambient Acoustic Wave Ring */}
              <div
                className="absolute -inset-1 rounded-full border border-brass/30 animate-ping opacity-20 pointer-events-none"
                style={{ animationDuration: '3.2s' }}
              />
              {/* Vibrating Speaker Transducer Cone */}
              <div
                data-testid="brand-monogram"
                className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white font-mono text-xs font-bold tracking-widest animate-speaker-pulse shadow-xs"
              >
                R
              </div>
            </div>
            <span className="font-sans text-sm font-semibold tracking-[0.2em] text-zinc-900 uppercase">
              RoH<span className="text-brass font-normal ml-0.5">·</span>SOUND
            </span>
          </a>

          {/* Desktop Links (lg: >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <AcousticNavLink key={link.name} href={link.href}>
                {link.name}
              </AcousticNavLink>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Pre-Order • $399"
              className="flex items-center gap-1.5 sm:gap-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-200 hover:shadow-md active:scale-98 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 text-brass-light shrink-0" />
              <span>
                Pre-Order<span className="hidden sm:inline"> • $399</span>
              </span>
            </button>

            {/* Mobile Menu Toggle (Visible below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Toggle menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay (Tap/Click outside to dismiss) */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/25 backdrop-blur-xs z-40 transition-opacity duration-300 animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Dropdown with Animated Transitions */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-4 top-18 bg-white/95 backdrop-blur-2xl rounded-3xl border border-hairline-strong p-6 shadow-2xl z-50 transition-all duration-300 animate-in fade-in zoom-in-95 slide-in-from-top-3"
        >
          {/* Mobile Drawer Header with Close & ESC Indicator */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-hairline">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-950 text-[11px] font-mono transition-all cursor-pointer group active:scale-95"
            >
              <span>Close</span>
              <kbd className="text-[9px] bg-white px-1.5 py-0.5 rounded border border-black/10 text-zinc-400 group-hover:text-zinc-700">ESC</kbd>
              <X className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-950" />
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-zinc-600 hover:text-zinc-950 py-1.5 px-2 rounded-xl hover:bg-zinc-100/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-hairline">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-900 text-white rounded-full py-3 text-xs font-medium uppercase tracking-widest shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-Order RoH Sound ($399)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
