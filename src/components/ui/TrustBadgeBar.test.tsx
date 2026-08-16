import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustBadgeBar } from './TrustBadgeBar';

describe('TrustBadgeBar', () => {
  it('renders default trust badges correctly', () => {
    render(<TrustBadgeBar />);
    expect(screen.getByText(/4.9 \/ 5.0 Global Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/3-Year Extended Warranty/i)).toBeInTheDocument();
    expect(screen.getByText(/30-Day Risk-Free Audition/i)).toBeInTheDocument();
  });

  it('renders custom badge items', () => {
    render(
      <TrustBadgeBar
        items={[
          { label: 'Free Priority Shipping' },
          { label: 'Lossless Audio Certified' },
        ]}
      />
    );
    expect(screen.getByText('Free Priority Shipping')).toBeInTheDocument();
    expect(screen.getByText('Lossless Audio Certified')).toBeInTheDocument();
  });
});
