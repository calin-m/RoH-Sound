# Enterprise Architecture Decision Records (ADR)

This document tracks all foundational architecture decisions for the enterprise application platform.

## ADR Index
- [ADR-001: Enterprise Tech Stack Selection (Next.js 15, MSW v2, Zustand, TanStack Query, Vitest)](#adr-001-enterprise-tech-stack-selection)
- [ADR-002: Closed-Loop Quality & 7-Gateway Verification Engine Architecture](#adr-002-closed-loop-quality--7-gateway-verification-engine-architecture)
- [ADR-003: Procedural WebGL 3D Headphone Model Engine using Three.js](#adr-003-procedural-webgl-3d-headphone-model-engine-using-threejs)
- [ADR-004: Transition to Multi-Perspective Vector SVG Showcase for Mobile Optimization](#adr-004-transition-to-multi-perspective-vector-svg-showcase-for-mobile-optimization)

---

## ADR-001: Enterprise Tech Stack Selection

- **Status:** Accepted
- **Date:** 2026-08-16
- **Authors:** Enterprise Solutions Architect & Staff Engineer
- **Deciders:** Core Engineering Team

### Context
We require a resilient, domain-neutral enterprise frontend foundation capable of supporting scalable web applications with strict type-safety, deterministic network isolation, predictable state management, and sub-second test execution.

### Decision
We standardize on the following technology foundation:
1. **Application Framework:** Next.js 15 (App Router, TypeScript, React 19) for server/client capabilities and high performance.
2. **Styling & Design System:** Tailwind CSS v4 with Atomic primitives built via Class Variance Authority (`cva`) and `tailwind-merge`.
3. **State Management:** Zustand for client state with atomic selectors and predictable reset utilities.
4. **Data Synchronization & Caching:** TanStack React Query for async server state.
5. **Network Mocking:** Mock Service Worker (MSW v2) for deterministic client and test network interception.
6. **Testing & Coverage:** Vitest with `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@vitest/coverage-v8` enforcing >= 85% code coverage.

### Consequences
- **Positive:** Zero developer drift, unified component patterns, automated quality verification, and sub-second test runtimes.
- **Negative:** Strict adherence required across all PRs.

---

## ADR-002: Closed-Loop Quality & 7-Gateway Verification Engine Architecture

- **Status:** Accepted
- **Date:** 2026-08-16
- **Authors:** Enterprise Solutions Architect & Staff Engineer
- **Deciders:** Core Engineering Team

### Context
Modern enterprise web projects suffer from architectural drift, stale documentation, untested edge cases, secret exposure, and dead code accumulation.

### Decision
We introduce the **7-Gateway Quality Verification Engine** (`npm run verify`):
- **Pass 0.5:** Pattern-matching secret scanning against high-entropy credentials.
- **Pass 1:** Strict TypeScript compiler verification (`tsc --noEmit`).
- **Pass 2:** Vitest server-side mock validation with MSW v2.
- **Pass 3:** Vitest client component and store test suite asserting $\ge 85\%$ coverage.
- **Pass 4:** AST-driven living documentation compiler (`docs:sync`).
- **Pass 5:** Architecture Decision Record (ADR) sequential schema and status validation.
- **Pass 6:** Zero-lint (`eslint`) and zero dead-code (`knip`) verification.
- **Pass 7:** Production Next.js bundle compilation.

### Consequences
- **Positive:** Guarantees zero regression, automated document sync, and bulletproof production deployment readiness.
- **Negative:** Build verification requires ~25-35s execution.

---

## ADR-003: Procedural WebGL 3D Headphone Model Engine using Three.js

- **Status:** Superseded by ADR-004
- **Date:** 2026-08-16
- **Authors:** Enterprise Solutions Architect & Staff Engineer
- **Deciders:** Core Engineering Team

### Context
Static 2D illustrations and CSS flat-plane 3D transforms cannot faithfully represent multi-axis volumetric geometry, PBR studio specular highlights, or authentic 360-degree rotational viewing required for modern minimalistic audiophile product presentations. Furthermore, downloading heavy external `.glb` binary assets introduces network latency and bundle bloat.

### Decision
We adopt **Three.js** (`three`, `@types/three`) to construct a **pure procedural WebGL 3D Headphone Model**:
1. **Procedural Geometry:** Build the entire model in code via Three.js primitives (TorusGeometry headband, beveled CylinderGeometry earcups, protein leather cushion toroids, metallic gimbal forks, and brass acoustic resonant rings).
2. **PBR Studio Lighting:** Implement 3-point studio lighting with key, fill, and rim lights interacting with MeshStandardMaterial roughness and metalness tokens per colorway.
3. **Interactive 3D Turntable & Orbit:** Provide smooth angle rotation interpolation (`front`, `angle`, `side`), pointer drag inspection, and automated 360° studio orbit.
4. **Resilient Fallback:** Provide graceful degradation for environments without WebGL context.

### Consequences
- **Positive:** Authentic 3D spatial fidelity, $<5\text{ms}$ initialization with 0 asset network downloads, seamless real-time material swapping, and silky smooth 360° rotational physics.
- **Negative:** Introduces `three` dependency (~150KB gzip) which is dynamically bundled on the client.

---

## ADR-004: Transition to Multi-Perspective Vector SVG Showcase for Mobile Optimization

- **Status:** Accepted
- **Date:** 2026-08-17
- **Authors:** Enterprise Solutions Architect & Staff Engineer
- **Deciders:** Core Engineering Team

### Context
While the Three.js WebGL procedural visualizer provided continuous 360° rotation, mobile devices benefit from completely passive DOM elements with zero GPU rendering loops, zero WebGL context overhead, and instant 4K Retina vector fidelity. Removing WebGL also eliminates the `three` dependency (~150KB gzip).

### Decision
We transition the Hero Studio Showcase to a **High-Precision Multi-Perspective Vector SVG Architecture**:
1. **Curated Architectural Perspectives:** Implement 4 vector perspectives:
   - `front`: Symmetrical elevation (0°) with inner foam contours and gimbal yoke forks.
   - `angle`: Dynamic 45° studio perspective showing outer shell chamfers and headband curvature.
   - `side`: 90° profile view with concentric CNC radial grooves and acoustic venting ports.
   - `exploded`: Layered acoustic anatomy showing outer shell, damping ring, 45mm driver, and cushion.
2. **Dynamic Finish Palettes:** Vector linear gradients dynamically styled per active colorway (*Obsidian Midnight, Alabaster Silver, Champagne Titanium, Forest Emerald*).
3. **Mobile Touch Swiping & Segmented Controls:** Seamless perspective pill buttons and touch swipe gestures.
4. **Dependency Removal:** Completely remove `three` and `@types/three` dependencies.

### Consequences
- **Positive:** 100% passive DOM rendering (0 battery/GPU overhead), ~150KB smaller bundle size, pixel-perfect 4K Retina clarity, seamless mobile touch swiping, and cleaner native DOM testing.
- **Negative:** Replaces continuous 360° decimal mouse-drag with 4 curated architectural perspectives.
