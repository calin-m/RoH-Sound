'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Colorway, ViewAngle } from '@/stores/useProductStore';
import { RotateCw, MoveHorizontal, Sparkles } from 'lucide-react';

interface HeadphoneVisualizerProps {
  color: Colorway;
  angle: ViewAngle;
  isPlayingDemo: boolean;
  onAngleChange?: (angle: ViewAngle) => void;
  className?: string;
}

const colorThemes: Record<
  Colorway,
  {
    name: string;
    cupPrimary: number;
    cupSecondary: number;
    accent: number;
    cushion: number;
    metal: number;
    glow: string;
  }
> = {
  midnight: {
    name: 'Obsidian Midnight',
    cupPrimary: 0x141416,
    cupSecondary: 0x242428,
    accent: 0xd4af37, // 24k gold
    cushion: 0x09090b,
    metal: 0x71717a,
    glow: 'rgba(212, 175, 55, 0.15)',
  },
  silver: {
    name: 'Alabaster Silver',
    cupPrimary: 0xe4e4e7,
    cupSecondary: 0xf4f4f5,
    accent: 0x38bdf8,
    cushion: 0x52525b,
    metal: 0xa1a1aa,
    glow: 'rgba(228, 228, 231, 0.3)',
  },
  titanium: {
    name: 'Champagne Titanium',
    cupPrimary: 0xd8c7a6,
    cupSecondary: 0xecdcc0,
    accent: 0xb8934a,
    cushion: 0x3f3f46,
    metal: 0xd4af37,
    glow: 'rgba(216, 199, 166, 0.25)',
  },
  emerald: {
    name: 'Forest Emerald',
    cupPrimary: 0x103328,
    cupSecondary: 0x1d5543,
    accent: 0x34d399,
    cushion: 0x052018,
    metal: 0x10b981,
    glow: 'rgba(16, 185, 129, 0.2)',
  },
};

const angleToRadians: Record<ViewAngle, number> = {
  front: 0,
  angle: Math.PI * 0.25, // 45 degrees
  side: Math.PI * 0.5, // 90 degrees
};

export const HeadphoneVisualizer: React.FC<HeadphoneVisualizerProps> = ({
  color,
  angle,
  isPlayingDemo,
  onAngleChange,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Interaction refs
  const targetYawRef = useRef<number>(angleToRadians[angle] || 0);
  const currentYawRef = useRef<number>(angleToRadians[angle] || 0);
  const isAutoRotatingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYawRef = useRef(0);

  // Three.js object refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const cupMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const accentMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const cushionMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Sync angle prop changes with target yaw
  useEffect(() => {
    if (!isDraggingRef.current && !isAutoRotatingRef.current) {
      targetYawRef.current = angleToRadians[angle] || 0;
    }
  }, [angle]);

  // Update 3D materials dynamically on colorway change
  useEffect(() => {
    const theme = colorThemes[color] || colorThemes.midnight;
    cupMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(theme.cupPrimary);
    });
    accentMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(theme.accent);
    });
    cushionMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(theme.cushion);
    });
  }, [color]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;

    try {
      const width = container.clientWidth || 380;
      const height = container.clientHeight || 380;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.8);

      // 2. WebGL Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 3. Studio 3-Point PBR Lighting
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
      keyLight.position.set(4, 6, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xe4e4e7, 1.4);
      fillLight.position.set(-5, -2, 4);
      scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
      rimLight.position.set(0, 5, -5);
      scene.add(rimLight);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      // 4. Procedural 3D Headphone Mesh Assembly
      const modelGroup = new THREE.Group();
      modelGroupRef.current = modelGroup;
      scene.add(modelGroup);

      const theme = colorThemes[color] || colorThemes.midnight;

      // Materials
      const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.9,
        roughness: 0.2,
      });

      const bandCushionMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.7,
        metalness: 0.1,
      });

      const cupMat = new THREE.MeshStandardMaterial({
        color: theme.cupPrimary,
        metalness: 0.85,
        roughness: 0.28,
      });

      const accentMat = new THREE.MeshStandardMaterial({
        color: theme.accent,
        metalness: 0.95,
        roughness: 0.15,
      });

      const cushionMat = new THREE.MeshStandardMaterial({
        color: theme.cushion,
        roughness: 0.65,
        metalness: 0.1,
      });

      cupMaterialsRef.current = [cupMat];
      accentMaterialsRef.current = [accentMat];
      cushionMaterialsRef.current = [cushionMat];

      // A. Outer Headband Arch (Torus)
      const headbandGeo = new THREE.TorusGeometry(2.1, 0.12, 24, 64, Math.PI * 0.98);
      const headbandMesh = new THREE.Mesh(headbandGeo, metalMaterial);
      headbandMesh.rotation.z = Math.PI * 0.01;
      headbandMesh.rotation.x = Math.PI * 0.05;
      headbandMesh.position.set(0, 0.4, 0);
      modelGroup.add(headbandMesh);

      // B. Inner Comfort Cushion
      const cushionBandGeo = new THREE.TorusGeometry(1.98, 0.09, 16, 48, Math.PI * 0.84);
      const cushionBandMesh = new THREE.Mesh(cushionBandGeo, bandCushionMat);
      cushionBandMesh.rotation.z = Math.PI * 0.08;
      cushionBandMesh.position.set(0, 0.4, 0);
      modelGroup.add(cushionBandMesh);

      // Helper to build a volumetric earcup
      const createEarcup = (isLeft: boolean) => {
        const cupGroup = new THREE.Group();
        const sideMult = isLeft ? -1 : 1;

        // Gimbal Hinge Fork
        const hingeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16);
        const hingeMesh = new THREE.Mesh(hingeGeo, metalMaterial);
        hingeMesh.position.set(0, 0.6, 0);
        cupGroup.add(hingeMesh);

        // Outer Precision Aluminum Cup Shell
        const shellGeo = new THREE.CylinderGeometry(0.85, 0.92, 0.48, 48);
        const shellMesh = new THREE.Mesh(shellGeo, cupMat);
        shellMesh.rotation.z = Math.PI * 0.5;
        cupGroup.add(shellMesh);

        // Acoustic Resonant Golden Accent Ring
        const ringGeo = new THREE.TorusGeometry(0.82, 0.035, 16, 48);
        const ringMesh = new THREE.Mesh(ringGeo, accentMat);
        ringMesh.rotation.y = Math.PI * 0.5;
        ringMesh.position.set(sideMult * 0.15, 0, 0);
        cupGroup.add(ringMesh);

        // Memory Foam Cushion Toroid (Inside)
        const foamGeo = new THREE.TorusGeometry(0.72, 0.22, 24, 48);
        const foamMesh = new THREE.Mesh(foamGeo, cushionMat);
        foamMesh.rotation.y = Math.PI * 0.5;
        foamMesh.position.set(sideMult * -0.25, 0, 0);
        cupGroup.add(foamMesh);

        // Driver Acoustic Grille Disc
        const grilleGeo = new THREE.CircleGeometry(0.62, 32);
        const grilleMesh = new THREE.Mesh(grilleGeo, bandCushionMat);
        grilleMesh.rotation.y = sideMult * Math.PI * -0.5;
        grilleMesh.position.set(sideMult * -0.26, 0, 0);
        cupGroup.add(grilleMesh);

        // Outer Atelier Monogram Core Disc
        const capGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 32);
        const capMesh = new THREE.Mesh(capGeo, metalMaterial);
        capMesh.rotation.z = Math.PI * 0.5;
        capMesh.position.set(sideMult * 0.24, 0, 0);
        cupGroup.add(capMesh);

        cupGroup.position.set(sideMult * 2.1, -0.65, 0);
        cupGroup.rotation.y = sideMult * 0.12;
        return cupGroup;
      };

      modelGroup.add(createEarcup(true)); // Left Earcup
      modelGroup.add(createEarcup(false)); // Right Earcup

      // Model center offset adjustment
      modelGroup.position.set(0, -0.3, 0);

      // 5. Render Loop with Smooth Physics Interpolation
      let lastTime = performance.now();
      const renderLoop = (time: number) => {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (isAutoRotatingRef.current) {
          targetYawRef.current += delta * 0.45;
        }

        // Smooth organic lerp to target yaw
        currentYawRef.current += (targetYawRef.current - currentYawRef.current) * 0.085;

        if (modelGroupRef.current) {
          modelGroupRef.current.rotation.y = currentYawRef.current;
          // Subtle natural pitch
          modelGroupRef.current.rotation.x = -0.06 + Math.sin(currentYawRef.current) * 0.02;
        }

        renderer.render(scene, camera);
        animId = requestAnimationFrame(renderLoop);
      };

      animId = requestAnimationFrame(renderLoop);

      // Resize Handler
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      // Graceful fallback if WebGL cannot be initialized
    }
  }, [color]);

  // Pointer Drag Handlers for 360 Turntable
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    setIsAutoRotating(false);
    isAutoRotatingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartYawRef.current = targetYawRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // 1px drag = ~0.009 radians
    targetYawRef.current = dragStartYawRef.current + deltaX * 0.009;
  };

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if released
    }

    // Determine nearest canonical angle
    const yaw = ((targetYawRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    let closest: ViewAngle = 'front';
    if (yaw < 0.4 || yaw > Math.PI * 2 - 0.4) {
      closest = 'front';
    } else if (yaw >= 0.4 && yaw < 1.2) {
      closest = 'angle';
    } else {
      closest = 'side';
    }

    if (onAngleChange) {
      onAngleChange(closest);
    }
  }, [onAngleChange]);

  const handleToggleAutoRotate = () => {
    const nextState = !isAutoRotating;
    setIsAutoRotating(nextState);
    isAutoRotatingRef.current = nextState;
  };

  const activeTheme = colorThemes[color] || colorThemes.midnight;

  return (
    <div
      className={`relative w-full aspect-square max-w-[460px] mx-auto flex flex-col items-center justify-center select-none group touch-none ${className}`}
      data-testid="headphone-visualizer"
    >
      {/* Studio Floor Soft Ambient Shadow */}
      <div
        className="absolute bottom-6 w-3/4 h-10 rounded-full blur-xl transition-all duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.03) 60%, transparent 80%)`,
          transform: isPlayingDemo ? 'scale(1.1)' : 'scale(1)',
        }}
      />

      {/* Dynamic Ambient Color Halo */}
      <div
        className="absolute inset-6 rounded-full blur-3xl transition-colors duration-700 pointer-events-none opacity-80"
        style={{ backgroundColor: activeTheme.glow }}
      />

      {/* WebGL 3D Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        data-testid="turntable-viewport"
        title="Click and drag to rotate in 3D"
      />

      {/* Interactive 3D Orbit & Drag Controls */}
      <div className="flex items-center gap-2 mt-2 z-20">
        <button
          onClick={handleToggleAutoRotate}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer border ${
            isAutoRotating
              ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
              : 'bg-white/80 backdrop-blur-md text-zinc-600 border-black/[0.06] hover:bg-zinc-100 hover:text-zinc-950'
          }`}
          title="Toggle continuous 360° studio rotation"
        >
          <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span>{isAutoRotating ? 'Auto-Orbiting' : '360° Orbit'}</span>
        </button>

        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/[0.04]">
          <MoveHorizontal className="w-3 h-3 text-zinc-400" />
          <span>Drag 3D Model</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-white/60 backdrop-blur-md px-2 py-1 rounded-full border border-black/[0.04]">
          <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
          <span>WebGL PBR</span>
        </div>
      </div>
    </div>
  );
};
