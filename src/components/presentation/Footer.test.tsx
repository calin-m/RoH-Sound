import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';
import { useProductStore } from '@/stores/useProductStore';

describe('Footer', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders footer brand, copyright and links', () => {
    render(<Footer />);
    expect(screen.getAllByText(/RoH/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pure Acoustic Architecture/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Back to top/i })).toBeInTheDocument();
  });

  it('scrolls back to top when static footer button is clicked', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    render(<Footer />);
    const topBtn = screen.getByRole('button', { name: /Back to top/i });
    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('shows floating Back to Top and sticky Pre-Order bar on scroll down and triggers actions', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    render(<Footer />);

    // Trigger scroll event past hero threshold
    window.scrollY = 600;
    fireEvent.scroll(window);

    // Assert floating Back to Top exists and works
    const floatingTopBtns = screen.getAllByRole('button', { name: /Back to top/i });
    expect(floatingTopBtns.length).toBeGreaterThan(1);
    fireEvent.click(floatingTopBtns[1]);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    // Assert Pre-Order button opens drawer
    const preorderBtn = screen.getByRole('button', { name: /Pre-Order/i });
    fireEvent.click(preorderBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(true);
  });
});
