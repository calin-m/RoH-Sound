import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModelOrbitIndicator } from './ModelOrbitIndicator';

describe('ModelOrbitIndicator', () => {
  it('renders auto-orbit active state and handles pause click', () => {
    const handleToggle = vi.fn();
    render(
      <ModelOrbitIndicator
        isAutoRotating={true}
        isDragging={false}
        onToggleAutoRotate={handleToggle}
      />
    );

    expect(screen.getByText(/360° Studio View/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag to Rotate/i)).toBeInTheDocument();

    const pauseBtn = screen.getByRole('button', { name: /Pause auto-orbit/i });
    fireEvent.click(pauseBtn);
    expect(handleToggle).toHaveBeenCalled();
  });

  it('renders paused state and handles resume click', () => {
    const handleToggle = vi.fn();
    render(
      <ModelOrbitIndicator
        isAutoRotating={false}
        isDragging={false}
        onToggleAutoRotate={handleToggle}
      />
    );

    expect(screen.getByText(/Orbit Paused/i)).toBeInTheDocument();
    const resumeBtn = screen.getByRole('button', { name: /Resume auto-orbit/i });
    fireEvent.click(resumeBtn);
    expect(handleToggle).toHaveBeenCalled();
  });

  it('renders active dragging state', () => {
    render(
      <ModelOrbitIndicator
        isAutoRotating={false}
        isDragging={true}
        onToggleAutoRotate={() => {}}
      />
    );

    expect(screen.getByText(/360° Free Orbit/i)).toBeInTheDocument();
  });
});
