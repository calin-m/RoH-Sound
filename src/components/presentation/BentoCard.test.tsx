import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BentoCard } from './BentoCard';

describe('BentoCard', () => {
  it('renders badge, title, description, stats, and footer', () => {
    render(
      <BentoCard
        badgeText="Diaphragm Matrix"
        title="45mm Custom Graphene Driver"
        description="Ultralight graphene vapor-deposited on titanium substrate."
        stats={[
          { value: '4Hz - 45kHz', label: 'Frequency Range' },
          { value: '< 0.05%', label: 'Distortion' },
        ]}
        footer={<div data-testid="bento-footer">Footer Content</div>}
      />
    );

    expect(screen.getByText('Diaphragm Matrix')).toBeInTheDocument();
    expect(screen.getByText('45mm Custom Graphene Driver')).toBeInTheDocument();
    expect(screen.getByText(/Ultralight graphene/i)).toBeInTheDocument();
    expect(screen.getByText('4Hz - 45kHz')).toBeInTheDocument();
    expect(screen.getByText('Frequency Range')).toBeInTheDocument();
    expect(screen.getByTestId('bento-footer')).toBeInTheDocument();
  });
});
