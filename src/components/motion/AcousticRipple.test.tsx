import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AcousticRipple } from './AcousticRipple';

describe('AcousticRipple', () => {
  it('renders nothing when active is false', () => {
    const { container } = render(<AcousticRipple active={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders concentric ripple rings when active is true', () => {
    render(<AcousticRipple active={true} />);
    expect(screen.getByTestId('acoustic-ripple')).toBeInTheDocument();
  });
});
