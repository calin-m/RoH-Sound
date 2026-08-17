'use client';

import React, { useRef, useState } from 'react';

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // base pull multiplier
  enableAmbientGroove?: boolean; // backwards-compatible alias
  enableDance?: boolean; // optional multi-directional acoustic dance (default false)
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.12,
  enableAmbientGroove = false,
  enableDance = false,
  className = '',
  onClick,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const isDanceActive = enableDance && enableAmbientGroove;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = buttonRef.current;
    if (!elem) return;

    const rect = elem.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Precision magnetic pull (tightly clamped for steady clicking precision)
    const precisionStrength = strength * 0.35;
    const deltaX = Math.max(-5, Math.min(5, (e.clientX - centerX) * precisionStrength));
    const deltaY = Math.max(-4, Math.min(4, (e.clientY - centerY) * precisionStrength));

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
      data-testid="magnetic-button"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 120ms ease-out'
          : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform',
      }}
    >
      {/* Continuous Multi-Directional Acoustic Dance Layer (0.35x when hovered) */}
      <div
        className={`w-full h-full ${
          isDanceActive
            ? `animate-acoustic-dance ${isHovered ? 'dance-dampened' : ''}`
            : ''
        }`}
        data-testid="magnetic-button-dance"
        style={
          isDanceActive
            ? ({
                '--dance-scale': isHovered ? 0.35 : 1,
              } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};
