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

    const connectivityTab = screen.getByRole('button', { name: /Wireless & Codecs/i });
    fireEvent.click(connectivityTab);
    expect(screen.getByText(/Bluetooth 5\.4 Class 1/i)).toBeInTheDocument();

    const materialsTab = screen.getByRole('button', { name: /Materials & Ergonomics/i });
    fireEvent.click(materialsTab);
    expect(screen.getByText(/Memory Foam with Italian Protein Leather/i)).toBeInTheDocument();

    const acousticsTab = screen.getByRole('button', { name: /Acoustics & Transducers/i });
    fireEvent.click(acousticsTab);
    expect(screen.getByText(/45mm Custom Titanium-Graphene/i)).toBeInTheDocument();
  });

  it('renders benchmark comparison matrix with RoH Sound acoustic advantages', () => {
    render(<TechnicalSpecs />);
    expect(screen.getByText(/Direct Benchmark Comparison/i)).toBeInTheDocument();
    expect(screen.getAllByText(/LDAC \+ USB-C Digital \(24-bit\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/-48dB Neural Hybrid/i).length).toBeGreaterThan(0);
  });

  it('renders custom specifications data when passed as prop', () => {
    const customSpecs = {
      acoustic: [{ label: 'Custom Driver', value: '50mm Planar Magnetic', detail: 'Ultra-thin film' }],
      connectivity: [],
      battery: [],
      physical: [],
    };
    render(<TechnicalSpecs specs={customSpecs} />);
    expect(screen.getByText('50mm Planar Magnetic')).toBeInTheDocument();
    expect(screen.getByText('Custom Driver')).toBeInTheDocument();
  });
});
