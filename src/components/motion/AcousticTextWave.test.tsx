import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AcousticTextWave } from './AcousticTextWave';

describe('AcousticTextWave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with accessibility aria-label and splits letters into aria-hidden spans', () => {
    render(<AcousticTextWave text="Pre-Order RoH Sound" />);
    const root = screen.getByTestId('acoustic-text-wave');
    expect(root).toHaveAttribute('aria-label', 'Pre-Order RoH Sound');

    const letters = root.querySelectorAll('span[aria-hidden="true"]');
    expect(letters.length).toBe('Pre-Order RoH Sound'.length);
  });

  it('triggers wave periodically on interval and resets after completion', () => {
    render(<AcousticTextWave text="Sound" intervalMs={3000} />);
    const root = screen.getByTestId('acoustic-text-wave');
    expect(root).toBeInTheDocument();

    // Trigger interval
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const activeLetters = root.querySelectorAll('.animate-acoustic-letter-wave');
    expect(activeLetters.length).toBe(5);

    // Advance past wave completion duration
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const idleLetters = root.querySelectorAll('.animate-acoustic-letter-wave');
    expect(idleLetters.length).toBe(0);
  });

  it('triggers wave on hover, locks during wave, and pauses interval while hovered', () => {
    render(<AcousticTextWave text="Pre-Order" intervalMs={3000} triggerOnHover={true} />);
    const root = screen.getByTestId('acoustic-text-wave');

    // Hover enters
    fireEvent.mouseEnter(root);

    let activeLetters = root.querySelectorAll('.animate-acoustic-letter-wave');
    expect(activeLetters.length).toBe('Pre-Order'.length);

    // Rapid second hover / micro-movement while already waving does not stutter
    fireEvent.mouseEnter(root);
    activeLetters = root.querySelectorAll('.animate-acoustic-letter-wave');
    expect(activeLetters.length).toBe('Pre-Order'.length);

    // Complete wave while still hovering -> enters settled hover state
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(root).toHaveClass('text-brass-light');

    // Interval should NOT fire while hovering
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Leave hover
    fireEvent.mouseLeave(root);
    expect(root).not.toHaveClass('text-brass-light');
  });
});
