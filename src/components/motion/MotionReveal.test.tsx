import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MotionReveal } from './MotionReveal';

describe('MotionReveal', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children with transition styles and handles all directions', () => {
    const { rerender } = render(
      <MotionReveal direction="up" delay={100} duration={600}>
        <span>Up Text</span>
      </MotionReveal>
    );
    expect(screen.getByText('Up Text')).toBeInTheDocument();

    rerender(
      <MotionReveal direction="down" delay={0}>
        <span>Down Text</span>
      </MotionReveal>
    );
    expect(screen.getByText('Down Text')).toBeInTheDocument();

    rerender(
      <MotionReveal direction="left">
        <span>Left Text</span>
      </MotionReveal>
    );
    expect(screen.getByText('Left Text')).toBeInTheDocument();

    rerender(
      <MotionReveal direction="right">
        <span>Right Text</span>
      </MotionReveal>
    );
    expect(screen.getByText('Right Text')).toBeInTheDocument();

    rerender(
      <MotionReveal direction="none">
        <span>None Text</span>
      </MotionReveal>
    );
    expect(screen.getByText('None Text')).toBeInTheDocument();
  });

  it('observes element when IntersectionObserver is supported and unobserves on intersect when once=true', () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    const observeMock = vi.fn();
    const unobserveMock = vi.fn();

    class MockObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = vi.fn();
      takeRecords = () => [];
    }

    vi.stubGlobal('IntersectionObserver', MockObserver);

    const { unmount } = render(
      <MotionReveal direction="up" once={true}>
        <span>Observed Content</span>
      </MotionReveal>
    );

    expect(observeMock).toHaveBeenCalled();

    // Trigger intersection
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        new MockObserver(() => {})
      );
    });

    expect(unobserveMock).toHaveBeenCalled();

    unmount();
  });

  it('toggles visibility repeatedly when once=false and element exits/enters viewport', () => {
    let observerCallback: IntersectionObserverCallback = () => {};
    const observeMock = vi.fn();
    const unobserveMock = vi.fn();

    class MockObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = vi.fn();
      takeRecords = () => [];
    }

    vi.stubGlobal('IntersectionObserver', MockObserver);

    render(
      <MotionReveal direction="up" once={false}>
        <span>Repeating Content</span>
      </MotionReveal>
    );

    // Enter viewport
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        new MockObserver(() => {})
      );
    });
    expect(unobserveMock).not.toHaveBeenCalled();

    // Exit viewport
    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        new MockObserver(() => {})
      );
    });
    expect(unobserveMock).not.toHaveBeenCalled();
  });

  it('re-animates on visibilitychange when tab returns to visible', () => {
    vi.stubGlobal('IntersectionObserver', class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    });

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 100,
      bottom: 200,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
    });

    render(
      <MotionReveal direction="up">
        <span>Tab Switching Content</span>
      </MotionReveal>
    );

    // Trigger tab return
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      configurable: true,
    });

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(screen.getByText('Tab Switching Content')).toBeInTheDocument();
  });
});
