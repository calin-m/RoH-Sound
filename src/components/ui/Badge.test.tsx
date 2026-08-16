import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge primitive', () => {
  it('renders badge text correctly', () => {
    render(<Badge>Production</Badge>);
    expect(screen.getByText('Production')).toBeInTheDocument();
  });

  it('renders different badge variants', () => {
    const { rerender } = render(<Badge variant="success">Online</Badge>);
    expect(screen.getByText('Online')).toHaveClass('bg-emerald-100');

    rerender(<Badge variant="destructive">Critical</Badge>);
    expect(screen.getByText('Critical')).toHaveClass('bg-red-100');

    rerender(<Badge variant="warning">Degraded</Badge>);
    expect(screen.getByText('Degraded')).toHaveClass('bg-amber-100');
  });
});
