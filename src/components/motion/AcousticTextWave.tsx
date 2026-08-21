'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface AcousticTextWaveProps {
  text: string;
  intervalMs?: number;
  triggerOnHover?: boolean;
  className?: string;
}

export const AcousticTextWave: React.FC<AcousticTextWaveProps> = ({
  text,
  intervalMs = 5200,
  triggerOnHover = true,
  className = '',
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isWavingRef = useRef(false);
  const waveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const characters = Array.from(text);
  const waveDurationMs = Math.max(800, (characters.length - 1) * 32 + 750);

  const triggerWave = useCallback(() => {
    if (isWavingRef.current) return; // Cooldown lock: prevent stutter

    isWavingRef.current = true;
    setIsWaving(true);

    if (waveTimerRef.current) {
      clearTimeout(waveTimerRef.current);
    }

    waveTimerRef.current = setTimeout(() => {
      setIsWaving(false);
      isWavingRef.current = false;
    }, waveDurationMs);
  }, [waveDurationMs]);

  // Ambient periodic trigger (only when NOT hovered)
  useEffect(() => {
    if (intervalMs <= 0 || isHovered) return;

    const timer = setInterval(() => {
      triggerWave();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, isHovered, triggerWave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (waveTimerRef.current) {
        clearTimeout(waveTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (triggerOnHover) {
      triggerWave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span
      className={`inline-flex items-center select-none transition-colors duration-300 ${
        isHovered && !isWaving ? 'text-brass-light' : ''
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
      data-testid="acoustic-text-wave"
    >
      {characters.map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`inline-block ${isWaving ? 'animate-acoustic-letter-wave' : ''}`}
          style={{
            animationDelay: isWaving ? `${index * 32}ms` : undefined,
            minWidth: char === ' ' ? '0.28em' : undefined,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
