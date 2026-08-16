import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpatialAudioController } from './SpatialAudioController';

describe('SpatialAudioController', () => {
  it('renders toggle switch and angle slider, handling updates', () => {
    const onToggleMock = vi.fn();
    const onAngleChangeMock = vi.fn();

    render(
      <SpatialAudioController
        isActive={true}
        angle={120}
        onToggle={onToggleMock}
        onAngleChange={onAngleChangeMock}
      />
    );

    expect(screen.getByText('120° Azimuth')).toBeInTheDocument();

    const toggleBtn = screen.getByRole('button', { name: /Toggle Dynamic Head Tracking/i });
    fireEvent.click(toggleBtn);
    expect(onToggleMock).toHaveBeenCalled();

    const slider = screen.getByLabelText(/Virtual Emitter Angle/i);
    fireEvent.change(slider, { target: { value: '180' } });
    expect(onAngleChangeMock).toHaveBeenCalledWith(180);
  });
});
