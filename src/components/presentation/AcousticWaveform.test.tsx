import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AcousticWaveform } from './AcousticWaveform';

describe('AcousticWaveform', () => {
  it('renders SVG waveform and frequency labels across all modes', () => {
    const { rerender } = render(<AcousticWaveform mode="transparency" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();
    expect(screen.getByText(/20Hz – 40kHz/i)).toBeInTheDocument();

    rerender(<AcousticWaveform mode="balanced" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();

    rerender(<AcousticWaveform mode="ultra" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();
  });

  it('cleans up animation frame upon unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<AcousticWaveform mode="ultra" />);
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });
});
