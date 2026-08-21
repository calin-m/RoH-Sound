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

  describe('Soundstage Azimuth Sectors', () => {
    const sectors = [
      { angle: 0, label: 'Front Center' },
      { angle: 45, label: 'Front-Right Stage' },
      { angle: 90, label: 'Direct Right (90°)' },
      { angle: 135, label: 'Rear-Right Stage' },
      { angle: 180, label: 'Direct Rear (180°)' },
      { angle: 225, label: 'Rear-Left Stage' },
      { angle: 270, label: 'Direct Left (270°)' },
      { angle: 315, label: 'Front-Left Stage' },
    ];

    sectors.forEach(({ angle, label }) => {
      it(`resolves ${angle}° to "${label}" sector readout`, () => {
        render(<SpatialRadar angle={angle} isSpatialActive={true} />);
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  describe('Pointer Drag & Touch Interaction', () => {
    it('manages full pointer drag cycle (pointerdown, pointermove, pointerup)', () => {
      const onAngleChangeMock = vi.fn();
      render(<SpatialRadar angle={0} isSpatialActive={true} onAngleChange={onAngleChangeMock} />);

      const svg = screen.getByLabelText(/360 Degree Spatial Audio Soundstage Radar/i);

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

      const setPointerCaptureMock = vi.fn();
      const releasePointerCaptureMock = vi.fn();

      // 1. Pointer Down
      fireEvent.pointerDown(svg, {
        clientX: 230,
        clientY: 110,
        pointerId: 1,
        currentTarget: { setPointerCapture: setPointerCaptureMock },
      });
      expect(onAngleChangeMock).toHaveBeenCalled();

      // 2. Pointer Move while dragging
      fireEvent.pointerMove(svg, {
        clientX: 150,
        clientY: 200,
        pointerId: 1,
      });
      expect(onAngleChangeMock).toHaveBeenCalledTimes(2);

      // 3. Pointer Up
      fireEvent.pointerUp(svg, {
        pointerId: 1,
        currentTarget: { releasePointerCapture: releasePointerCaptureMock },
      });

      // 4. Pointer Move after drag ended -> should NOT trigger onAngleChange
      fireEvent.pointerMove(svg, {
        clientX: 100,
        clientY: 50,
        pointerId: 1,
      });
      expect(onAngleChangeMock).toHaveBeenCalledTimes(2);
    });

    it('handles interaction safely when onAngleChange is omitted', () => {
      render(<SpatialRadar angle={90} isSpatialActive={true} />);
      const svg = screen.getByLabelText(/360 Degree Spatial Audio Soundstage Radar/i);

      expect(() => {
        fireEvent.pointerDown(svg, { clientX: 200, clientY: 100, pointerId: 1 });
        fireEvent.pointerMove(svg, { clientX: 210, clientY: 110, pointerId: 1 });
        fireEvent.pointerUp(svg, { pointerId: 1 });
      }).not.toThrow();
    });

    it('correctly maps and wraps angles across all four planar quadrants', () => {
      const onAngleChangeMock = vi.fn();
      render(<SpatialRadar angle={0} isSpatialActive={true} onAngleChange={onAngleChangeMock} />);
      const svg = screen.getByLabelText(/360 Degree Spatial Audio Soundstage Radar/i);

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

      // Top-Left Quadrant (triggers negative atan2 angle wrapping: deg < 0 -> deg += 360)
      fireEvent.pointerDown(svg, { clientX: 50, clientY: 50, pointerId: 1 });
      expect(onAngleChangeMock).toHaveBeenCalled();

      // Top-Right Quadrant
      fireEvent.pointerMove(svg, { clientX: 250, clientY: 50, pointerId: 1 });
      expect(onAngleChangeMock).toHaveBeenCalled();

      // Bottom-Left Quadrant
      fireEvent.pointerMove(svg, { clientX: 50, clientY: 180, pointerId: 1 });
      expect(onAngleChangeMock).toHaveBeenCalled();

      fireEvent.pointerUp(svg, { pointerId: 1 });
    });
  });

  describe('Binaural Ray & Panning Visualization', () => {
    it('hides binaural vector rays when spatial audio is deactivated', () => {
      const { rerender } = render(<SpatialRadar angle={90} isSpatialActive={true} />);
      expect(screen.getByTestId('binaural-rays')).toBeInTheDocument();

      rerender(<SpatialRadar angle={90} isSpatialActive={false} />);
      expect(screen.queryByTestId('binaural-rays')).not.toBeInTheDocument();
    });
  });
});
