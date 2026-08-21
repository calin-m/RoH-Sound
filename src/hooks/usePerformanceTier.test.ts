import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePerformanceTier } from './usePerformanceTier';

describe('usePerformanceTier', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Reset navigator properties
    Object.defineProperty(navigator, 'deviceMemory', { value: 8, configurable: true });
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 8, configurable: true });
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: false },
      configurable: true,
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('detects high-performance device tier by default', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());

    expect(result.current.isLowTier).toBe(false);
    expect(result.current.prefersReducedMotion).toBe(false);
    expect(result.current.deviceMemory).toBe(8);
    expect(result.current.hardwareConcurrency).toBe(8);
    expect(result.current.saveData).toBe(false);
  });

  it('flags low tier when deviceMemory is <= 2GB', () => {
    Object.defineProperty(navigator, 'deviceMemory', { value: 2, configurable: true });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.isLowTier).toBe(true);
    expect(result.current.deviceMemory).toBe(2);
  });

  it('flags low tier when hardwareConcurrency is <= 2 cores', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 2, configurable: true });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.isLowTier).toBe(true);
    expect(result.current.hardwareConcurrency).toBe(2);
  });

  it('flags low tier when user enabled Save Data', () => {
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true },
      configurable: true,
    });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.isLowTier).toBe(true);
    expect(result.current.saveData).toBe(true);
  });

  it('flags low tier and reduced motion when prefers-reduced-motion is active', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.isLowTier).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(true);
  });

  it('responds dynamically to media query change events', () => {
    let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn().mockImplementation((event: string, cb: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') changeHandler = cb;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePerformanceTier());
    expect(result.current.prefersReducedMotion).toBe(false);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current.prefersReducedMotion).toBe(true);
    expect(result.current.isLowTier).toBe(true);
  });

  it('supports legacy addListener and removeListener media query APIs', () => {
    const addListenerMock = vi.fn();
    const removeListenerMock = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: addListenerMock,
      removeListener: removeListenerMock,
      dispatchEvent: vi.fn(),
    }));

    const { unmount } = renderHook(() => usePerformanceTier());
    expect(addListenerMock).toHaveBeenCalled();

    unmount();
    expect(removeListenerMock).toHaveBeenCalled();
  });
});

