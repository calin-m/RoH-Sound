'use client';

import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setDrawerOpen } = useProductStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Acoustic Engineering', href: '#engineering' },
    { name: 'Finishes', href: '#studio' },
    { name: 'Tech Specs', href: '#specs' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3.5 px-4 sm:px-8 flex justify-center`}
    >
      <div
        className={`w-full max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-5 sm:px-7 py-2.5 ${
          isScrolled
            ? 'glass-crystal shadow-[0_12px_30px_rgba(0,0,0,0.04)] border border-black/[0.06]'
            : 'bg-white/60 backdrop-blur-md border border-black/[0.04]'
        }`}
      >
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-white font-mono text-xs font-bold tracking-widest transition-transform duration-300 group-hover:scale-105 shadow-sm">
            R
          </div>
          <span className="font-sans text-sm font-semibold tracking-[0.2em] text-zinc-900 uppercase">
            RoH<span className="text-[#b8934a] font-normal ml-0.5">·</span>SOUND
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-200 hover:shadow-md active:scale-98"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>Pre-Order • $399</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-16 bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-wider text-zinc-600 hover:text-zinc-950 py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-black/[0.06]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDrawerOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-zinc-950 text-white rounded-full py-3 text-xs font-medium uppercase tracking-widest shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pre-Order RoH Sound ($399)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
