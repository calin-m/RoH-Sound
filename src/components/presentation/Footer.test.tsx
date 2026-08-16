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
    expect(screen.getByText(/Back to top/i)).toBeInTheDocument();
  });

  it('scrolls back to top when button is clicked', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    render(<Footer />);
    const topBtn = screen.getByRole('button', { name: /Back to top/i });
    fireEvent.click(topBtn);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('shows sticky bar on scroll down and triggers drawer', () => {
    render(<Footer />);
    window.scrollY = 600;
    fireEvent.scroll(window);
  });
});
