import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { useProductStore } from '@/stores/useProductStore';

describe('Navbar', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders RoH Sound brand and navigation links with speaker transducer animation', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/RoH/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /^RoH$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Acoustic$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Specs$/i })).toBeInTheDocument();

    const monogram = screen.getByTestId('brand-monogram');
    expect(monogram).toHaveClass('animate-speaker-pulse');
  });

  it('triggers drawer opening when pre-order CTA is clicked', () => {
    render(<Navbar />);
    const preorderBtn = screen.getByRole('button', { name: /Pre-Order • \$399/i });
    fireEvent.click(preorderBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(true);
  });

  it('toggles mobile menu on button click and interacts with links and pre-order button', () => {
    render(<Navbar />);
    const menuToggle = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuToggle);

    const mobilePreorderBtn = screen.getByRole('button', { name: /Pre-Order RoH Sound \(\$399\)/i });
    expect(mobilePreorderBtn).toBeInTheDocument();

    fireEvent.click(mobilePreorderBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(true);
  });

  it('closes mobile menu when clicking the backdrop overlay', () => {
    render(<Navbar />);
    const menuToggle = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuToggle);

    const backdrop = screen.getByTestId('mobile-menu-backdrop');
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop);
    expect(screen.queryByTestId('mobile-menu-backdrop')).not.toBeInTheDocument();
  });

  it('closes mobile menu when pressing Escape key', () => {
    render(<Navbar />);
    const menuToggle = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuToggle);

    expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
  });

  it('closes mobile menu when clicking the close button inside drawer', () => {
    render(<Navbar />);
    const menuToggle = screen.getByRole('button', { name: /Toggle menu/i });
    fireEvent.click(menuToggle);

    const closeBtn = screen.getByRole('button', { name: /Close navigation menu/i });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('mobile-menu-drawer')).not.toBeInTheDocument();
  });

  it('handles scroll event without throwing', () => {
    render(<Navbar />);
    window.scrollY = 100;
    fireEvent.scroll(window);
  });
});
