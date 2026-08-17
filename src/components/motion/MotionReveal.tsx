'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MOTION_CONFIG } from './motion-config';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface MotionRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = MOTION_CONFIG.duration,
  threshold = MOTION_CONFIG.threshold,
  once = MOTION_CONFIG.once,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimationDone(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const doneTimer = setTimeout(() => {
            setIsAnimationDone(true);
          }, duration + delay + 50);

          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
          return () => clearTimeout(doneTimer);
        } else if (!once) {
          setIsVisible(false);
          setIsAnimationDone(false);
        }
      },
      { threshold: Math.min(threshold, 0.05), rootMargin: '180px 0px 120px 0px' }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once, duration, delay]);

  // Replay animation on tab visibility change when the element is active in the viewport
  useEffect(() => {
    if (typeof window === 'undefined' || once) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport) {
          setIsVisible(false);
          setIsAnimationDone(false);
          const frame = requestAnimationFrame(() => {
            setIsVisible(true);
          });
          return () => cancelAnimationFrame(frame);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [once]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    const d = MOTION_CONFIG.distance;
    switch (direction) {
      case 'up':
        return `translate3d(0, ${d}px, 0)`;
      case 'down':
        return `translate3d(0, -${d}px, 0)`;
      case 'left':
        return `translate3d(${d}px, 0, 0)`;
      case 'right':
        return `translate3d(-${d}px, 0, 0)`;
      case 'none':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      data-testid="motion-reveal"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ${MOTION_CONFIG.easing} ${delay}ms, transform ${duration}ms ${MOTION_CONFIG.easing} ${delay}ms`,
        willChange: isAnimationDone ? 'auto' : 'opacity, transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};
