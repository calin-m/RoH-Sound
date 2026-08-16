'use client';

import React from 'react';
import { MotionReveal, RevealDirection } from './MotionReveal';

export interface StaggerGroupProps {
  children: React.ReactNode;
  staggerInterval?: number; // in ms, default 75ms
  baseDelay?: number; // in ms, default 0ms
  direction?: RevealDirection;
  className?: string;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  staggerInterval = 75,
  baseDelay = 0,
  direction = 'up',
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
          duration={600}
        >
          {child}
        </MotionReveal>
      ))}
    </div>
  );
};
