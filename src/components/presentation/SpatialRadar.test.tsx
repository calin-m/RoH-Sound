import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText(/HRTF Engine/i)).toBeInTheDocument();
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

  it('triggers onAngleChange during pointer interaction on SVG stage', () => {
    const onAngleChangeMock = vi.fn();
    render(<SpatialRadar angle={0} isSpatialActive={true} onAngleChange={onAngleChangeMock} />);

    const svg = screen.getByLabelText(/360 Degree Spatial Audio Soundstage Radar/i);

    // Mock getBoundingClientRect
    vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 300,
      height: 220,
      right: 300,
      bottom: 220,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Pointer down to the right (e.g., x=230, y=110 -> 90 deg)
    fireEvent.pointerDown(svg, {
      clientX: 230,
      clientY: 110,
      pointerId: 1,
      currentTarget: { setPointerCapture: vi.fn() },
    });

    expect(onAngleChangeMock).toHaveBeenCalled();
  });
});
