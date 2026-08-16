import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpatialRadar } from './SpatialRadar';

describe('SpatialRadar', () => {
  it('renders radar canvas and rotational emitter', () => {
    render(<SpatialRadar angle={90} isSpatialActive={true} />);
    expect(screen.getByTestId('spatial-radar')).toBeInTheDocument();
    expect(screen.getByText(/Virtual Emitter/i)).toBeInTheDocument();
    expect(screen.getByText(/Binaural Soundstage/i)).toBeInTheDocument();
  });

  it('applies rotation transform based on angle prop', () => {
    render(<SpatialRadar angle={180} isSpatialActive={false} />);
    const emitter = screen.getByTestId('spatial-emitter');
    expect(emitter).toHaveStyle({ transform: 'rotate(180deg)' });
  });
});
