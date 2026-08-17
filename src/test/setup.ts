import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from '../mocks/server';

// 1. Polyfill Browser Globals for Headless CI (Linux/macOS/Windows)
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
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
  }

  if (!window.scrollTo) {
    window.scrollTo = vi.fn();
  }

  if (!window.IntersectionObserver) {
    class MockIntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      private callback?: IntersectionObserverCallback;

      constructor(callback?: IntersectionObserverCallback) {
        this.callback = callback;
      }

      observe = vi.fn((target?: Element) => {
        if (this.callback && target) {
          this.callback(
            [{ isIntersecting: true, target, intersectionRatio: 1 } as unknown as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
          );
        }
      });
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
    }
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as unknown as typeof ResizeObserver;
  }
}

// 2. MSW Lifecycle Hooks
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
