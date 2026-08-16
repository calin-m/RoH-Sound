import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorStudio } from './ColorStudio';
import { useProductStore } from '@/stores/useProductStore';

describe('ColorStudio', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders color studio header and finish options', () => {
    render(<ColorStudio />);
    expect(screen.getByText(/Four Iconic Finishes/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Obsidian Midnight/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Alabaster Silver/i)).toBeInTheDocument();
  });

  it('switches colorway on card selection', () => {
    render(<ColorStudio />);
    const silverCard = screen.getByText(/Alabaster Silver/i);
    fireEvent.click(silverCard);
    expect(useProductStore.getState().selectedColor).toBe('silver');
  });
});
