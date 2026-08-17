'use client';

import React, { useEffect, useRef } from 'react';
import { AncMode } from '@/stores/useProductStore';

export interface AcousticWaveformProps {
  mode: AncMode;
  className?: string;
}

export const AcousticWaveform: React.FC<AcousticWaveformProps> = ({
  mode,
  className = '',
}) => {
  const soundPathRef = useRef<SVGPathElement>(null);
  const cancelPathRef = useRef<SVGPathElement>(null);
  const modeRef = useRef<AncMode>(mode);

  // Keep modeRef synchronized with props
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    let animId: number;
    let lastTimestamp = performance.now();
    let time = 0;
    let currentAmplitude = modeRef.current === 'transparency' ? 34 : modeRef.current === 'balanced' ? 22 : 12;

    const points = 80;
    const width = 400;
    const height = 100;
    const midY = height / 2;
    const cycles = 2.5;

    const renderFrame = (timestamp: number) => {
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      // Advance traveling wave phase
      time = (time + delta * 3.4) % (Math.PI * 200);

      // Target amplitude based on active mode
      const targetAmplitude =
        modeRef.current === 'transparency' ? 34 : modeRef.current === 'balanced' ? 22 : 12;

      // Smoothly interpolate amplitude when switching tabs
      currentAmplitude += (targetAmplitude - currentAmplitude) * (delta * 8);

      let soundD = '';
      let cancelD = '';

      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const phase = (i / points) * Math.PI * 2 * cycles - time;

        const soundY = midY - Math.sin(phase) * currentAmplitude;
        const cancelY = midY + Math.sin(phase) * currentAmplitude;

        if (i === 0) {
          soundD = `M ${x.toFixed(1)} ${soundY.toFixed(1)}`;
          cancelD = `M ${x.toFixed(1)} ${cancelY.toFixed(1)}`;
        } else {
          soundD += ` L ${x.toFixed(1)} ${soundY.toFixed(1)}`;
          cancelD += ` L ${x.toFixed(1)} ${cancelY.toFixed(1)}`;
        }
      }

      // Direct DOM attribute mutation for uninterrupted 60fps performance
      if (soundPathRef.current) {
        soundPathRef.current.setAttribute('d', soundD);
      }
      if (cancelPathRef.current) {
        cancelPathRef.current.setAttribute('d', cancelD);
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`h-32 bg-white rounded-2xl border border-black/[0.06] p-4 flex items-center justify-center relative overflow-hidden shadow-inner ${className}`}
    >
      {/* Center Zero Reference Line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-zinc-200" />

      {/* Autonomous 60fps Traveling Sinusoidal Oscilloscope */}
      <svg
        viewBox="0 0 400 100"
        className="w-full h-full relative z-10"
        data-testid="waveform-svg"
        preserveAspectRatio="none"
      >
        {/* Animated 180° Anti-Phase Inverted Sinewave (Gold Dashed Vector) */}
        <path
          ref={cancelPathRef}
          d="M 0 50 L 400 50"
          fill="none"
          stroke="#b8934a"
          strokeWidth="1.75"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />

        {/* Animated Primary Audio Sinewave (Solid Obsidian Vector) */}
        <path
          ref={soundPathRef}
          d="M 0 50 L 400 50"
          fill="none"
          stroke="#18181b"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Frequency Diagnostic Label */}
      <div className="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-400">
        Frequency: 20Hz – 40kHz
      </div>
    </div>
  );
};
