import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('activates colorway via IntersectionObserver on mobile viewport', () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    const observeMock = vi.fn();
    const disconnectMock = vi.fn();

    // Mock mobile window width
    window.innerWidth = 390;

    window.IntersectionObserver = vi.fn(function (cb: IntersectionObserverCallback) {
      observerCallback = cb;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: vi.fn(),
        takeRecords: () => [],
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        thresholds: [0.5],
      };
    }) as unknown as typeof IntersectionObserver;

    const { unmount } = render(<ColorStudio />);

    // Simulate Forest Emerald intersecting optical center
    const emeraldElement = document.querySelector('[data-finish-id="emerald"]');
    expect(emeraldElement).toBeInTheDocument();
    expect(observeMock).toHaveBeenCalledWith(emeraldElement);

    act(() => {
      observerCallback(
        [
          {
            target: emeraldElement as Element,
            isIntersecting: true,
            intersectionRatio: 0.6,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: 100,
          },
        ],
        {} as IntersectionObserver
      );
    });

    expect(useProductStore.getState().selectedColor).toBe('emerald');

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('renders all 4 metallurgical material spec docks and highlights the selected gradient', () => {
    render(<ColorStudio />);
    expect(screen.getByText('Anodized 6000-Series Aluminum')).toBeInTheDocument();
    expect(screen.getByText('Bead-Blasted Ceramic Matte Silver')).toBeInTheDocument();
    expect(screen.getByText('Grade-5 Titanium & PVD Brass')).toBeInTheDocument();
    expect(screen.getByText('Ceramic Composite & Fine Leather')).toBeInTheDocument();

    const docks = screen.getAllByTestId('finish-material-dock');
    expect(docks.length).toBe(4);
    // Obsidian Midnight is selected by default and should have the Spec badge
    expect(screen.getByText('Spec')).toBeInTheDocument();
  });
});
