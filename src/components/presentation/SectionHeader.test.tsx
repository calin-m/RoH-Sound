import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders step number and eyebrow label', () => {
    render(<SectionHeader step="03" eyebrow="Engineering Architecture" />);
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('Engineering Architecture')).toBeInTheDocument();
  });

  it('renders title, subtitle, and custom children', () => {
    render(
      <SectionHeader
        step="01"
        eyebrow="Acoustics"
        title="Pure Sound Precision"
        subtitle="Zero distortion acoustic design"
      >
        <span data-testid="custom-child">Badge</span>
      </SectionHeader>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Pure Sound Precision');
    expect(screen.getByText('Zero distortion acoustic design')).toBeInTheDocument();
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });
});
