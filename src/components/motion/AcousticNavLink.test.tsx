import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AcousticNavLink } from './AcousticNavLink';

describe('AcousticNavLink', () => {
  it('renders link with aria-label and splits letters', () => {
    render(<AcousticNavLink href="#experience">Experience</AcousticNavLink>);
    const link = screen.getByRole('link', { name: /Experience/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#experience');
  });

  it('forwards onClick callback', () => {
    const handleClick = vi.fn();
    render(
      <AcousticNavLink href="#acoustic" onClick={handleClick}>
        Acoustic
      </AcousticNavLink>
    );

    const link = screen.getByRole('link', { name: /^Acoustic$/i });
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalled();
  });
});
