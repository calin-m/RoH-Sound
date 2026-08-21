'use client';

import { useState, useEffect } from 'react';

export interface PerformanceTierInfo {
  isLowTier: boolean;
  prefersReducedMotion: boolean;
  deviceMemory: number | null;
  hardwareConcurrency: number | null;
  saveData: boolean;
}

function readHardwareState(): PerformanceTierInfo {
  if (typeof window === 'undefined') {
    return {
      isLowTier: false,
      prefersReducedMotion: false,
      deviceMemory: null,
      hardwareConcurrency: null,
      saveData: false,
    };
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const deviceMemory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null;
  const hardwareConcurrency = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : null;
  const saveData = Boolean(nav.connection?.saveData);

  const mediaQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const prefersReducedMotion = Boolean(mediaQuery?.matches);

  const isLowTier =
    prefersReducedMotion ||
    saveData ||
    (deviceMemory !== null && deviceMemory <= 2) ||
    (hardwareConcurrency !== null && hardwareConcurrency <= 2);

  return {
    isLowTier,
    prefersReducedMotion,
    deviceMemory,
    hardwareConcurrency,
    saveData,
  };
}

export function usePerformanceTier(): PerformanceTierInfo {
  const [tierInfo, setTierInfo] = useState<PerformanceTierInfo>(readHardwareState);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionChange = (event: MediaQueryListEvent) => {
      const reducedMotion = event.matches;
      setTierInfo((prev) => ({
        ...prev,
        prefersReducedMotion: reducedMotion,
        isLowTier:
          reducedMotion ||
          prev.saveData ||
          (prev.deviceMemory !== null && prev.deviceMemory <= 2) ||
          (prev.hardwareConcurrency !== null && prev.hardwareConcurrency <= 2),
      }));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    } else if (mediaQuery.addListener) {
      // Legacy Safari / older browser fallback
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return tierInfo;
}


