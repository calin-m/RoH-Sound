import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AngleSelector } from './AngleSelector';

describe('AngleSelector', () => {
  it('renders all view angle pills and triggers onSelectAngle callback', () => {
    const onSelectAngleMock = vi.fn();
    render(
      <AngleSelector
        currentAngle="front"
        onSelectAngle={onSelectAngleMock}
      />
    );

    expect(screen.getByRole('button', { name: /Front/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /Perspective/i })).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(screen.getByRole('button', { name: /Perspective/i }));
    expect(onSelectAngleMock).toHaveBeenCalledWith('angle');
  });
});
