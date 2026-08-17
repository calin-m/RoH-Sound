import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders footer brand, copyright and exploration links', () => {
    render(<Footer />);
    expect(screen.getAllByText(/RoH/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pure Acoustic Architecture/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Titanium Transducers/i })).toHaveAttribute('href', '#acoustic');
    expect(screen.getByRole('link', { name: /RoH Sound Laboratories AG/i })).toHaveAttribute(
      'href',
      'https://github.com/calin-m/RoH-Sound'
    );
  });

  it('shows floating Back to Top button on scroll down and triggers smooth scroll', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    render(<Footer />);

    // Initially not visible before scroll
    expect(screen.queryByRole('button', { name: /Back to top/i })).not.toBeInTheDocument();

    // Trigger scroll event past threshold
    window.scrollY = 600;
    fireEvent.scroll(window);

    // Assert floating Back to Top appears and functions
    const topBtn = screen.getByRole('button', { name: /Back to top/i });
    expect(topBtn).toBeInTheDocument();
    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
