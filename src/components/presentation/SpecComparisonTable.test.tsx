import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpecComparisonTable } from './SpecComparisonTable';

describe('SpecComparisonTable', () => {
  it('renders table headers, comparison rows, and RoH Sound highlights', () => {
    render(<SpecComparisonTable />);
    expect(screen.getByTestId('spec-comparison-table')).toBeInTheDocument();
    expect(screen.getByText(/Direct Benchmark Comparison/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RoH Sound/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Brand S Flagship/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Brand B Studio/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/45mm Titanium-Graphene/i).length).toBeGreaterThan(0);
  });

  it('switches competitor selection when clicking mobile switcher tabs', () => {
    render(<SpecComparisonTable />);
    
    const brandBBtn = screen.getByRole('button', { name: /vs\. Brand B Studio/i });
    expect(brandBBtn).toBeInTheDocument();

    // Click Brand B
    fireEvent.click(brandBBtn);
    expect(screen.getAllByText(/Brand B/i).length).toBeGreaterThan(0);

    // Click back to Brand S
    const brandSBtn = screen.getByRole('button', { name: /vs\. Brand S Flagship/i });
    fireEvent.click(brandSBtn);
    expect(screen.getAllByText(/Brand S/i).length).toBeGreaterThan(0);
  });
});
