import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AcousticWaveform } from './AcousticWaveform';

describe('AcousticWaveform', () => {
  it('renders SVG waveform and frequency labels', () => {
    render(<AcousticWaveform mode="ultra" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();
    expect(screen.getByText(/20Hz – 40kHz/i)).toBeInTheDocument();
  });

  it('renders correctly across transparency and balanced modes', () => {
    const { rerender } = render(<AcousticWaveform mode="transparency" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();

    rerender(<AcousticWaveform mode="balanced" />);
    expect(screen.getByTestId('waveform-svg')).toBeInTheDocument();
  });
});
