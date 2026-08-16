import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechnicalSpecs } from './TechnicalSpecs';
import { useProductStore } from '@/stores/useProductStore';

describe('TechnicalSpecs', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders technical specs tabs and comparison table', () => {
    render(<TechnicalSpecs />);
    expect(screen.getByText(/Technical Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/45mm Custom Titanium-Graphene/i)).toBeInTheDocument();
    expect(screen.getByText(/Direct Benchmark Comparison/i)).toBeInTheDocument();
  });

  it('switches specification tab when clicked', () => {
    render(<TechnicalSpecs />);
    const batteryTab = screen.getByRole('button', { name: /Power & Charging/i });
    fireEvent.click(batteryTab);
    expect(screen.getByText(/Up to 65 Hours/i)).toBeInTheDocument();
  });
});
