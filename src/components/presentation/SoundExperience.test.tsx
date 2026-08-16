import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SoundExperience } from './SoundExperience';
import { useProductStore } from '@/stores/useProductStore';

describe('SoundExperience', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders ANC lab and Spatial Audio controls', () => {
    render(<SoundExperience />);
    expect(screen.getByText(/Interactive Sound Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Noise Cancellation Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/360° Spatial Audio Orbit/i)).toBeInTheDocument();
  });

  it('switches ANC modes when button is clicked', () => {
    render(<SoundExperience />);
    const transparencyBtn = screen.getByRole('button', { name: /Natural Transparency/i });
    fireEvent.click(transparencyBtn);
    expect(useProductStore.getState().ancMode).toBe('transparency');
  });

  it('toggles spatial audio and handles rotation slider', () => {
    render(<SoundExperience />);
    const spatialBtn = screen.getByRole('button', { name: /Spatial ON/i });
    fireEvent.click(spatialBtn);
    expect(useProductStore.getState().isSpatialActive).toBe(false);

    const slider = screen.getByLabelText(/Spatial audio angle slider/i);
    fireEvent.change(slider, { target: { value: '180' } });
    expect(useProductStore.getState().spatialAngle).toBe(180);
  });
});
