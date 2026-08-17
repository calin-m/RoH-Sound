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

  it('defaults to 360° auto-orbit on load and toggles pause/resume', () => {
    render(
      <HeadphoneVisualizer
        color="titanium"
        angle="front"
        isPlayingDemo={false}
      />
    );

    // Initial state is auto-orbiting
    expect(screen.getByText(/360° Studio View/i)).toBeInTheDocument();
    const pauseBtn = screen.getByRole('button', { name: /Pause auto-orbit/i });
    expect(pauseBtn).toBeInTheDocument();

    // Pause orbit
    fireEvent.click(pauseBtn);
    expect(screen.getByText(/Orbit Paused/i)).toBeInTheDocument();
    const resumeBtn = screen.getByRole('button', { name: /Resume auto-orbit/i });
    expect(resumeBtn).toBeInTheDocument();

    // Resume orbit
    fireEvent.click(resumeBtn);
    expect(screen.getByText(/360° Studio View/i)).toBeInTheDocument();
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
