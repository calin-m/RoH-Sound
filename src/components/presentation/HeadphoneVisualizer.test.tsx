import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HeadphoneVisualizer } from './HeadphoneVisualizer';

describe('HeadphoneVisualizer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with 3D canvas viewport and default front angle', () => {
    const { unmount } = render(
      <HeadphoneVisualizer
        color="midnight"
        angle="front"
        isPlayingDemo={false}
      />
    );

    const visualizer = screen.getByTestId('headphone-visualizer');
    expect(visualizer).toBeInTheDocument();

    const viewport = screen.getByTestId('turntable-viewport');
    expect(viewport).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    unmount();
  });

  it('toggles 360° auto-orbit rotation mode', () => {
    render(
      <HeadphoneVisualizer
        color="titanium"
        angle="front"
        isPlayingDemo={false}
      />
    );

    const orbitBtn = screen.getByRole('button', { name: /360° Orbit/i });
    expect(orbitBtn).toBeInTheDocument();

    fireEvent.click(orbitBtn);
    expect(screen.getByRole('button', { name: /Auto-Orbiting/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Auto-Orbiting/i }));
    expect(screen.getByRole('button', { name: /360° Orbit/i })).toBeInTheDocument();
  });

  it('handles pointer drag interaction and calls onAngleChange on release', () => {
    const onAngleChangeMock = vi.fn();
    render(
      <HeadphoneVisualizer
        color="emerald"
        angle="front"
        isPlayingDemo={false}
        onAngleChange={onAngleChangeMock}
      />
    );

    const viewport = screen.getByTestId('turntable-viewport');

    // Pointer down
    fireEvent.pointerDown(viewport, {
      clientX: 100,
      pointerId: 1,
      target: { setPointerCapture: vi.fn() },
    });

    // Pointer move (drag ~70px)
    fireEvent.pointerMove(viewport, {
      clientX: 170,
      pointerId: 1,
    });

    // Pointer up
    fireEvent.pointerUp(viewport, {
      pointerId: 1,
      target: { releasePointerCapture: vi.fn() },
    });

    expect(onAngleChangeMock).toHaveBeenCalled();
  });

  it('renders all colorways correctly and updates angle prop', () => {
    const { rerender } = render(
      <HeadphoneVisualizer color="midnight" angle="front" isPlayingDemo={false} />
    );
    expect(screen.getByTestId('headphone-visualizer')).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="silver" angle="angle" isPlayingDemo={false} />);
    expect(screen.getByTestId('headphone-visualizer')).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="titanium" angle="side" isPlayingDemo={false} />);
    expect(screen.getByTestId('headphone-visualizer')).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="emerald" angle="front" isPlayingDemo={true} />);
    expect(screen.getByTestId('headphone-visualizer')).toBeInTheDocument();
  });
});
