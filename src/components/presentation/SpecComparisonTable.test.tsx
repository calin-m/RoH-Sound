import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpecComparisonTable } from './SpecComparisonTable';

describe('SpecComparisonTable', () => {
  it('renders table headers, comparison rows, and RoH Sound highlights', () => {
    render(<SpecComparisonTable />);
    expect(screen.getByTestId('spec-comparison-table')).toBeInTheDocument();
    expect(screen.getByText(/Direct Benchmark Comparison/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RoH Sound/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Brand S Flagship/i)).toBeInTheDocument();
    expect(screen.getByText(/Brand B Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/45mm Titanium-Graphene/i)).toBeInTheDocument();
  });
});
