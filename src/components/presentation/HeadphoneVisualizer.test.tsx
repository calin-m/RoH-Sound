import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HeadphoneVisualizer } from './HeadphoneVisualizer';

describe('HeadphoneVisualizer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with vector SVG viewport and default front angle', () => {
    const { unmount } = render(
      <HeadphoneVisualizer
        color="midnight"
        angle="front"
        isPlayingDemo={false}
      />
    );

    const visualizer = screen.getByTestId('headphone-visualizer');
    expect(visualizer).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Front Symmetrical Perspective/i })).toBeInTheDocument();

    unmount();
  });

  it('allows selecting perspectives and calls onAngleChange callback', () => {
    const onAngleChangeMock = vi.fn();
    render(
      <HeadphoneVisualizer
        color="titanium"
        angle="front"
        isPlayingDemo={false}
        onAngleChange={onAngleChangeMock}
      />
    );

    // Click Controls angle
    const controlsBtn = screen.getByRole('button', { name: /^Controls$/i });
    fireEvent.click(controlsBtn);
    expect(onAngleChangeMock).toHaveBeenCalledWith('controls');

    // Click Profile
    const profileBtn = screen.getByRole('button', { name: /^Profile$/i });
    fireEvent.click(profileBtn);
    expect(onAngleChangeMock).toHaveBeenCalledWith('side');

    // Click Anatomy
    const anatomyBtn = screen.getByRole('button', { name: /^Anatomy$/i });
    fireEvent.click(anatomyBtn);
    expect(onAngleChangeMock).toHaveBeenCalledWith('exploded');
  });

  it('toggles automated studio perspective tour', () => {
    vi.useFakeTimers();
    const onAngleChangeMock = vi.fn();

    render(
      <HeadphoneVisualizer
        color="emerald"
        angle="front"
        isPlayingDemo={false}
        onAngleChange={onAngleChangeMock}
      />
    );

    const tourBtn = screen.getByRole('button', { name: /Start studio perspective tour/i });
    fireEvent.click(tourBtn);

    // Advance timer by 3800ms
    act(() => {
      vi.advanceTimersByTime(3800);
    });

    expect(onAngleChangeMock).toHaveBeenCalledWith('controls');

    // Pause tour
    const pauseBtn = screen.getByRole('button', { name: /Pause studio tour/i });
    fireEvent.click(pauseBtn);

    vi.useRealTimers();
  });

  it('renders passive visualizer viewport without touch event interceptors', () => {
    const onAngleChangeMock = vi.fn();
    const { container } = render(
      <HeadphoneVisualizer
        color="silver"
        isPlayingDemo={false}
        onAngleChange={onAngleChangeMock}
      />
    );

    const viewportArea = container.querySelector('[class*="h-[320px]"]');
    expect(viewportArea).toBeTruthy();
  });

  it('renders all colorways and perspectives with live demo soundwaves', () => {
    const { rerender } = render(
      <HeadphoneVisualizer color="midnight" angle="front" isPlayingDemo={false} />
    );
    expect(screen.getByTestId('headphone-visualizer')).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="silver" angle="controls" isPlayingDemo={false} />);
    expect(screen.getByRole('img', { name: /Tactile Controls and Ports Perspective/i })).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="titanium" angle="side" isPlayingDemo={false} />);
    expect(screen.getByRole('img', { name: /90 Degree Profile View/i })).toBeInTheDocument();

    rerender(<HeadphoneVisualizer color="emerald" angle="exploded" isPlayingDemo={true} />);
    expect(screen.getByRole('img', { name: /Anatomy/i })).toBeInTheDocument();
  });
});
