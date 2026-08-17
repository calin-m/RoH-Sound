import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpatialRadar } from './SpatialRadar';

describe('SpatialRadar', () => {
  it('renders HRTF soundstage canvas, Left/Right speakers, and virtual emitter', () => {
    render(<SpatialRadar angle={90} isSpatialActive={true} />);
    expect(screen.getByTestId('spatial-radar')).toBeInTheDocument();
    expect(screen.getByTestId('left-speaker')).toBeInTheDocument();
    expect(screen.getByTestId('right-speaker')).toBeInTheDocument();
    expect(screen.getByTestId('spatial-emitter')).toBeInTheDocument();
    expect(screen.getByTestId('binaural-rays')).toBeInTheDocument();
    expect(screen.getByText(/Direct Right \(90°\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Binaural HRTF Soundstage/i)).toBeInTheDocument();
  });

  it('updates soundstage sector and panning for different azimuth angles', () => {
    const { rerender } = render(<SpatialRadar angle={0} isSpatialActive={true} />);
    expect(screen.getByText(/Front Center/i)).toBeInTheDocument();

    rerender(<SpatialRadar angle={180} isSpatialActive={false} />);
    expect(screen.getByText(/Direct Rear \(180°\)/i)).toBeInTheDocument();
    expect(screen.queryByTestId('binaural-rays')).not.toBeInTheDocument();

    rerender(<SpatialRadar angle={270} isSpatialActive={true} />);
    expect(screen.getByText(/Direct Left \(270°\)/i)).toBeInTheDocument();
  });
});
