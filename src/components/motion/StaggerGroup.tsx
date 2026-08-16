'use client';

import React from 'react';
import { MotionReveal, RevealDirection } from './MotionReveal';
import { MOTION_CONFIG } from './motion-config';

export interface StaggerGroupProps {
  children: React.ReactNode;
  staggerInterval?: number; // in ms, default from MOTION_CONFIG.staggerInterval
  baseDelay?: number; // in ms, default 0ms
  direction?: RevealDirection;
  once?: boolean;
  className?: string;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  staggerInterval = MOTION_CONFIG.staggerInterval,
  baseDelay = 0,
  direction = 'up',
  once = MOTION_CONFIG.once,
  className = '',
}) => {
  const items = React.Children.toArray(children);

  return (
    <div className={className} data-testid="stagger-group">
      {items.map((child, index) => (
        <MotionReveal
          key={index}
          direction={direction}
          delay={baseDelay + index * staggerInterval}
          duration={MOTION_CONFIG.duration}
          once={once}
        >
          {child}
        </MotionReveal>
      ))}
    </div>
  );
};
