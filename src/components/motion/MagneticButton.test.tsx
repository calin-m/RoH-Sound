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

  it('updates transform on mouse interaction', () => {
    render(
      <MagneticButton>
        <button>Explore</button>
      </MagneticButton>
    );

    const container = screen.getByTestId('magnetic-button');
    fireEvent.mouseEnter(container);
    fireEvent.mouseMove(container, { clientX: 50, clientY: 50 });
    fireEvent.mouseLeave(container);
    expect(container).toHaveStyle({ transform: 'translate3d(0px, 0px, 0)' });
  });
});
