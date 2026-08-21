import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LaserEngravingPreview } from './LaserEngravingPreview';

describe('LaserEngravingPreview', () => {
  it('renders input, character counter, and updates value on input', () => {
    const handleChange = vi.fn();
    render(<LaserEngravingPreview value="STUDIO 01" onChange={handleChange} maxLength={20} />);

    expect(screen.getByText('9/20 chars')).toBeInTheDocument();
    expect(screen.getByText('“STUDIO 01”')).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/e\.g\. MASTERING LAB 01/i);
    fireEvent.change(input, { target: { value: 'AUDIO LAB' } });
    expect(handleChange).toHaveBeenCalledWith('AUDIO LAB');
  });

  it('renders input placeholder and hides etch preview when no text is provided', () => {
    render(<LaserEngravingPreview value="" onChange={vi.fn()} maxLength={20} />);
    expect(screen.getByPlaceholderText(/e\.g\. MASTERING LAB 01/i)).toBeInTheDocument();
    expect(screen.getByText('0/20 chars')).toBeInTheDocument();
    expect(screen.queryByText(/CNC Laser Etch Preview/i)).not.toBeInTheDocument();
  });
});
