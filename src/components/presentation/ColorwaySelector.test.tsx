import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorwaySelector } from './ColorwaySelector';

describe('ColorwaySelector', () => {
  it('renders circular swatches and triggers selection callback', () => {
    const handleSelect = vi.fn();
    render(<ColorwaySelector selectedColor="midnight" onSelectColor={handleSelect} variant="swatch" />);

    const emeraldBtn = screen.getByRole('button', { name: /Select Forest Emerald/i });
    fireEvent.click(emeraldBtn);
    expect(handleSelect).toHaveBeenCalledWith('emerald');
  });

  it('renders pill buttons in drawer mode and triggers callback', () => {
    const handleSelect = vi.fn();
    render(<ColorwaySelector selectedColor="midnight" onSelectColor={handleSelect} variant="pill" />);

    const silverBtn = screen.getByRole('button', { name: /Switch to Alabaster Silver/i });
    fireEvent.click(silverBtn);
    expect(handleSelect).toHaveBeenCalledWith('silver');
  });
});
