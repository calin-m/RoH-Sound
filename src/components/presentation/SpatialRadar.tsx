'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Radio, Move } from 'lucide-react';

export interface SpatialRadarProps {
  angle: number; // 0 to 360 degrees
  isSpatialActive?: boolean;
  onAngleChange?: (angle: number) => void;
  className?: string;
}

export const SpatialRadar: React.FC<SpatialRadarProps> = ({
  angle,
  isSpatialActive = true,
  onAngleChange,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Center coordinates & orbital radius
  const cx = 150;
  const cy = 110;
  const radius = 80;

  // Speaker coordinates
  const leftSpeakerX = 124;
  const leftSpeakerY = 110;
  const rightSpeakerX = 176;
  const rightSpeakerY = 110;

  // Calculate Virtual Emitter Cartesian Coordinates (0 deg = Front / Top)
  const angleRad = ((angle - 90) * Math.PI) / 180;
  const emitterX = cx + radius * Math.cos(angleRad);
  const emitterY = cy + radius * Math.sin(angleRad);

  // Real-time Interaural Level Difference (ILD) calculation
  const panFactor = (emitterX - cx) / radius; // -1 (Left) to +1 (Right)
  const leftGain = Math.round(Math.max(15, Math.min(100, 50 - panFactor * 42)));
  const rightGain = Math.round(Math.max(15, Math.min(100, 50 + panFactor * 42)));

  // Soundstage sector label
  const getSectorLabel = (deg: number): string => {
    const normalized = ((deg % 360) + 360) % 360;
    if (normalized >= 338 || normalized < 23) return 'Front Center';
    if (normalized >= 23 && normalized < 68) return 'Front-Right Stage';
    if (normalized >= 68 && normalized < 113) return 'Direct Right (90°)';
    if (normalized >= 113 && normalized < 158) return 'Rear-Right Stage';
    if (normalized >= 158 && normalized < 203) return 'Direct Rear (180°)';
    if (normalized >= 203 && normalized < 248) return 'Rear-Left Stage';
    if (normalized >= 248 && normalized < 293) return 'Direct Left (270°)';
    return 'Front-Left Stage';
  };

  const sectorLabel = getSectorLabel(angle);

  const updateAngleFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current || !onAngleChange) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgCenterX = rect.left + (cx / 300) * rect.width;
      const svgCenterY = rect.top + (cy / 220) * rect.height;
      const dx = clientX - svgCenterX;
      const dy = clientY - svgCenterY;

      let deg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI + 90);
      if (deg < 0) deg += 360;
      if (deg >= 360) deg -= 360;
      onAngleChange(deg);
    },
    [onAngleChange, cx, cy]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!onAngleChange) return;
    setIsDragging(true);
    try {
      e.currentTarget?.setPointerCapture?.(e.pointerId);
    } catch {
      // Non-supporting or jsdom environments
    }
    updateAngleFromEvent(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    updateAngleFromEvent(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget?.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      className={`relative w-full bg-white rounded-2xl border border-hairline p-4 sm:p-5 flex flex-col items-center justify-center overflow-hidden shadow-xs select-none ${className}`}
      data-testid="spatial-radar"
    >
      {/* Top Header Readout Strip */}
      <div className="w-full flex items-center justify-between mb-2 z-10 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Radio className="w-3 h-3 text-brass animate-pulse" />
          <span className="font-semibold text-zinc-900">{sectorLabel}</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span>
            L: <strong className="text-zinc-900">{leftGain}%</strong>
          </span>
          <span className="text-black/[0.15]">|</span>
          <span>
            R: <strong className="text-zinc-900">{rightGain}%</strong>
          </span>
        </div>
      </div>

      {/* SVG HRTF Soundstage Vector Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 300 220"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full max-w-[340px] h-[190px] overflow-visible touch-none ${
          onAngleChange ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
        aria-label="360 Degree Spatial Audio Soundstage Radar"
      >
        <title>Click or drag beacon around the stage to rotate audio azimuth in 360°</title>
        <defs>
          {/* Radial Glow Filter for Emitter */}
          <radialGradient id="emitterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#b8934a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b8934a" stopOpacity="0" />
          </radialGradient>

          {/* Left Speaker Glow */}
          <radialGradient id="leftGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="#b8934a"
              stopOpacity={isSpatialActive ? (leftGain / 100) * 0.4 : 0.05}
            />
            <stop offset="100%" stopColor="#b8934a" stopOpacity="0" />
          </radialGradient>

          {/* Right Speaker Glow */}
          <radialGradient id="rightGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="#b8934a"
              stopOpacity={isSpatialActive ? (rightGain / 100) * 0.4 : 0.05}
            />
            <stop offset="100%" stopColor="#b8934a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Polar Soundstage Distance Rings */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.65}
          fill="none"
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.35}
          fill="none"
          stroke="rgba(0,0,0,0.03)"
          strokeWidth="1"
        />

        {/* Crosshair Axes */}
        <line
          x1={cx}
          y1={cy - radius - 10}
          x2={cx}
          y2={cy + radius + 10}
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
        />
        <line
          x1={cx - radius - 10}
          y1={cy}
          x2={cx + radius + 10}
          y2={cy}
          stroke="rgba(0,0,0,0.04)"
          strokeWidth="1"
        />

        {/* Cardinal Degree Labels */}
        <text
          x={cx}
          y={cy - radius - 14}
          textAnchor="middle"
          className="text-[8px] font-mono fill-zinc-400 font-medium"
        >
          0° FRONT
        </text>
        <text
          x={cx + radius + 16}
          y={cy + 3}
          textAnchor="start"
          className="text-[8px] font-mono fill-zinc-400 font-medium"
        >
          90° R
        </text>
        <text
          x={cx}
          y={cy + radius + 20}
          textAnchor="middle"
          className="text-[8px] font-mono fill-zinc-400 font-medium"
        >
          180° REAR
        </text>
        <text
          x={cx - radius - 16}
          y={cy + 3}
          textAnchor="end"
          className="text-[8px] font-mono fill-zinc-400 font-medium"
        >
          270° L
        </text>

        {/* 2. Binaural Ray Beams (Virtual Emitter -> Left & Right Drivers) */}
        {isSpatialActive && (
          <g data-testid="binaural-rays">
            {/* Left Acoustic Ray */}
            <line
              x1={emitterX}
              y1={emitterY}
              x2={leftSpeakerX}
              y2={leftSpeakerY}
              stroke="#b8934a"
              strokeWidth={(leftGain / 100) * 2 + (isDragging ? 1.2 : 0.5)}
              strokeOpacity={(leftGain / 100) * 0.75 + (isDragging ? 0.35 : 0.2)}
              strokeDasharray="4 2"
              className="transition-all duration-150"
            />
            {/* Right Acoustic Ray */}
            <line
              x1={emitterX}
              y1={emitterY}
              x2={rightSpeakerX}
              y2={rightSpeakerY}
              stroke="#b8934a"
              strokeWidth={(rightGain / 100) * 2 + (isDragging ? 1.2 : 0.5)}
              strokeOpacity={(rightGain / 100) * 0.75 + (isDragging ? 0.35 : 0.2)}
              strokeDasharray="4 2"
              className="transition-all duration-150"
            />
          </g>
        )}

        {/* 3. Central Headphone & Listener Graphic */}
        <path
          d={`M ${leftSpeakerX} ${leftSpeakerY} Q ${cx} ${cy - 38} ${rightSpeakerX} ${rightSpeakerY}`}
          fill="none"
          stroke="#27272a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d={`M ${leftSpeakerX + 2} ${leftSpeakerY - 2} Q ${cx} ${cy - 34} ${rightSpeakerX - 2} ${rightSpeakerY - 2}`}
          fill="none"
          stroke="#71717a"
          strokeWidth="1.2"
        />

        {/* Listener Head Profile Silhouette */}
        <ellipse
          cx={cx}
          cy={cy}
          rx="18"
          ry="22"
          fill="#18181b"
          stroke="#27272a"
          strokeWidth="1.5"
        />
        {/* Nose Orientation Indicator (Points Front / Up) */}
        <polygon
          points={`${cx - 3.5},${cy - 22} ${cx},${cy - 28} ${cx + 3.5},${cy - 22}`}
          fill="#27272a"
        />

        {/* Left Headphone Speaker / Earcup */}
        <g data-testid="left-speaker">
          <circle cx={leftSpeakerX} cy={leftSpeakerY} r="18" fill="url(#leftGlow)" />
          <rect
            x={leftSpeakerX - 6}
            y={leftSpeakerY - 14}
            width="12"
            height="28"
            rx="5"
            fill="#09090b"
            stroke="#52525b"
            strokeWidth="1.2"
          />
          <rect
            x={leftSpeakerX - 2}
            y={leftSpeakerY - 9}
            width="4"
            height="18"
            rx="1.5"
            fill={isSpatialActive ? '#d4af37' : '#71717a'}
            opacity={(leftGain / 100) * 0.7 + 0.3}
          />
          <text
            x={leftSpeakerX}
            y={leftSpeakerY + 3.5}
            textAnchor="middle"
            className="text-[7.5px] font-mono font-bold fill-white pointer-events-none"
          >
            L
          </text>
        </g>

        {/* Right Headphone Speaker / Earcup */}
        <g data-testid="right-speaker">
          <circle cx={rightSpeakerX} cy={rightSpeakerY} r="18" fill="url(#rightGlow)" />
          <rect
            x={rightSpeakerX - 6}
            y={rightSpeakerY - 14}
            width="12"
            height="28"
            rx="5"
            fill="#09090b"
            stroke="#52525b"
            strokeWidth="1.2"
          />
          <rect
            x={rightSpeakerX - 2}
            y={rightSpeakerY - 9}
            width="4"
            height="18"
            rx="1.5"
            fill={isSpatialActive ? '#d4af37' : '#71717a'}
            opacity={(rightGain / 100) * 0.7 + 0.3}
          />
          <text
            x={rightSpeakerX}
            y={rightSpeakerY + 3.5}
            textAnchor="middle"
            className="text-[7.5px] font-mono font-bold fill-white pointer-events-none"
          >
            R
          </text>
        </g>

        {/* 4. 360° Virtual Sound Emitter */}
        <g
          data-testid="spatial-emitter"
          className="transition-transform duration-75 ease-out"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          {/* Radiating Acoustic Wavefront Ripple */}
          {isSpatialActive && (
            <>
              <circle
                cx={emitterX}
                cy={emitterY}
                r={isDragging ? 24 : 18}
                fill="none"
                stroke="#d4af37"
                strokeWidth={isDragging ? 1.5 : 1}
                opacity={isDragging ? 0.5 : 0.3}
                className="transition-all duration-200"
              />
              <circle
                cx={emitterX}
                cy={emitterY}
                r={isDragging ? 14 : 10}
                fill="none"
                stroke="#b8934a"
                strokeWidth={isDragging ? 1.8 : 1.2}
                opacity={isDragging ? 0.8 : 0.6}
                className="transition-all duration-200"
              />
            </>
          )}

          {/* Emitter Ambient Aura */}
          <circle
            cx={emitterX}
            cy={emitterY}
            r={isDragging ? 18 : 14}
            fill="url(#emitterGlow)"
            className="transition-all duration-200"
          />

          {/* Emitter Central Beacon */}
          <circle
            cx={emitterX}
            cy={emitterY}
            r={isDragging ? 8 : 6.5}
            fill="#b8934a"
            stroke="#ffffff"
            strokeWidth="1.8"
            className="shadow-sm transition-all duration-200"
          />
        </g>
      </svg>

      {/* Bottom Sub-label with Drag Cue */}
      <div className="mt-1 text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
        <Move className="w-3 h-3 text-brass" />
        <span>Drag Beacon to Orbit • 360° HRTF Engine</span>
      </div>
    </div>
  );
};
