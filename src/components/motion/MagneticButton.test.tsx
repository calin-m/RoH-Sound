import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MagneticButton } from './MagneticButton';

describe('MagneticButton', () => {
  it('renders children and forwards clicks', () => {
    const handleClick = vi.fn();
    render(
      <MagneticButton onClick={handleClick}>
        <button>Pre-Order Now</button>
      </MagneticButton>
    );

    const button = screen.getByRole('button', { name: /Pre-Order Now/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('runs multi-directional acoustic dance by default and dampens to 0.35x on hover without interrupting animation', () => {
    render(
      <MagneticButton enableDance={true}>
        <button>Explore</button>
      </MagneticButton>
    );

    const danceLayer = screen.getByTestId('magnetic-button-dance');
    expect(danceLayer).toHaveClass('animate-acoustic-dance');
    expect(danceLayer).not.toHaveClass('dance-dampened');

    const container = screen.getByTestId('magnetic-button');
    fireEvent.mouseEnter(container);
    expect(danceLayer).toHaveClass('animate-acoustic-dance');
    expect(danceLayer).toHaveClass('dance-dampened');

    fireEvent.mouseMove(container, { clientX: 50, clientY: 50 });
    fireEvent.mouseLeave(container);
    expect(danceLayer).toHaveClass('animate-acoustic-dance');
    expect(danceLayer).not.toHaveClass('dance-dampened');
    expect(container).toHaveStyle({ transform: 'translate3d(0px, 0px, 0)' });
  });

  it('supports disabling acoustic dance', () => {
    render(
      <MagneticButton enableDance={false}>
        <button>Explore</button>
      </MagneticButton>
    );

    const danceLayer = screen.getByTestId('magnetic-button-dance');
    expect(danceLayer).not.toHaveClass('animate-acoustic-dance');
  });
});
