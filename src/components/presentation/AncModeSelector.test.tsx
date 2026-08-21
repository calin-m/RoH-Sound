import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AncModeSelector } from './AncModeSelector';

describe('AncModeSelector', () => {
  it('renders all 3 ANC mode cards and handles selection', () => {
    const onSelectModeMock = vi.fn();
    render(
      <AncModeSelector
        currentMode="balanced"
        onSelectMode={onSelectModeMock}
      />
    );

    expect(screen.getByText('Natural Transparency')).toBeInTheDocument();
    expect(screen.getByText('Balanced Studio')).toBeInTheDocument();
    expect(screen.getByText('Ultra Hybrid ANC')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Ultra Hybrid ANC'));
    expect(onSelectModeMock).toHaveBeenCalledWith('ultra');
  });

  it('triggers onSelectMode for all individual ANC modes', () => {
    const onSelectModeMock = vi.fn();
    render(
      <AncModeSelector
        currentMode="ultra"
        onSelectMode={onSelectModeMock}
      />
    );

    fireEvent.click(screen.getByText('Natural Transparency'));
    expect(onSelectModeMock).toHaveBeenCalledWith('transparency');

    fireEvent.click(screen.getByText('Balanced Studio'));
    expect(onSelectModeMock).toHaveBeenCalledWith('balanced');
  });

  it('displays active attenuation decibel badge for active mode', () => {
    render(
      <AncModeSelector
        currentMode="ultra"
        onSelectMode={vi.fn()}
      />
    );

    expect(screen.getByText('-48dB')).toBeInTheDocument();
    expect(screen.getByText('-25dB')).toBeInTheDocument();
    expect(screen.getByText('0dB')).toBeInTheDocument();
  });
});
