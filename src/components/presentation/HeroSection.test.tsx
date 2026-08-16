import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { useProductStore } from '@/stores/useProductStore';

describe('HeroSection', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders headline, price, and specs badges', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Pure Acoustic Precision/i);
    expect(screen.getAllByText(/48dB/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RoH Sound/i).length).toBeGreaterThan(0);
  });

  it('switches colorway when swatch is clicked', () => {
    render(<HeroSection />);
    const emeraldSwatch = screen.getByRole('button', { name: /Select Forest Emerald/i });
    fireEvent.click(emeraldSwatch);
    expect(useProductStore.getState().selectedColor).toBe('emerald');
  });

  it('toggles audio preview demo mode on CTA click', () => {
    render(<HeroSection />);
    const demoBtn = screen.getByRole('button', { name: /Listen to Sound Stage Demo/i });
    fireEvent.click(demoBtn);
    expect(useProductStore.getState().isPlayingDemo).toBe(true);
  });

  it('opens checkout drawer when pre-order is clicked', () => {
    render(<HeroSection />);
    const buyBtn = screen.getByRole('button', { name: /Pre-Order RoH Sound • \$399/i });
    fireEvent.click(buyBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(true);
  });
});
