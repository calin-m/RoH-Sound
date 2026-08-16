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
});
