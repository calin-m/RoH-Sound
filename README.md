# RoH Sound — Flagship Product Presentation SPA

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest Coverage](https://img.shields.io/badge/Vitest-101%2F101_Passed_(95.92%25)-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![MSW v2](https://img.shields.io/badge/MSW-v2.0-E35555?style=for-the-badge&logo=mockserviceworker)](https://mswjs.io/)
[![Quality Gateways](https://img.shields.io/badge/7--Gateway-Verified-emerald?style=for-the-badge&logo=shield)](./DEVELOPMENT.md)

An ultra-refined, high-performance **Product Presentation Single Page Application** for **RoH Sound** (*"Pure Acoustic Architecture. Zero Distortion."*). Engineered with a **Light Minimalistic Sleek Atelier Luxury** design aesthetic, Next.js 15 App Router, procedural Three.js WebGL 3D turntable, precision HRTF vector spatial audio ray-tracing, lightweight Zustand reactive state, and the deterministic 7-Gateway Quality Engine.

---

## 📑 Table of Contents
- [🏛️ System Architecture Diagrams](#-system-architecture-diagrams)
  - [1. End-to-End System Context & Data Flow](#1-end-to-end-system-context--data-flow)
  - [2. Precision HRTF Binaural Soundstage Engine](#2-precision-hrtf-binaural-soundstage-engine)
  - [3. Atomic Component & Design System Tree](#3-atomic-component--design-system-tree)
- [✨ Core Presentation Experience](#-core-presentation-experience)
- [⚡ Quick Start](#-quick-start)
- [🛠️ CLI Command Matrix](#️-cli-command-matrix)
- [🛡️ The 7-Gateway Quality Engine](#️-the-7-gateway-quality-engine)
- [📚 Living Documentation Registry](#-living-documentation-registry)

---

## 🏛️ System Architecture Diagrams

### 1. End-to-End System Context & Data Flow

```mermaid
flowchart TD
    User["👤 Customer / Sound Engineer"]
    
    subgraph ClientApp ["RoH Sound Next.js 15 SPA (src/app/page.tsx)"]
        Nav["Acoustic Nav Bar (Navbar.tsx)"]
        Hero["Hero Section (HeroSection.tsx)"]
        ThreeCanvas["Three.js 3D WebGL Canvas (HeadphoneVisualizer.tsx)"]
        OrbitIndicator["360° Turntable Indicator (ModelOrbitIndicator.tsx)"]
        SoundLab["Sound Experience Lab (SoundExperience.tsx)"]
        HRTFRadar["HRTF Binaural Soundstage (SpatialRadar.tsx)"]
        Bento["Acoustic Bento Matrix (AcousticBento.tsx)"]
        Studio["Material Studio (ColorStudio.tsx)"]
        Specs["Technical Architecture (TechnicalSpecs.tsx)"]
        Reviews["Verified Reviews (ReviewsSection.tsx)"]
        FAQ["Concierge & FAQ (FAQSection.tsx)"]
        Drawer["Slide-Over Checkout (CheckoutDrawer.tsx)"]
        LaserEngrave["Live Laser Preview (LaserEngravingPreview.tsx)"]
        FloatingTop["Floating Back to Top Pill (Footer.tsx)"]
        
        Store[("⚡ Zustand Store (useProductStore.ts)\n• activeColorway\n• activeAngle / orbitActive\n• ancMode\n• spatialAzimuth\n• isDrawerOpen\n• customEngraving")]
        QueryHooks["🔄 React Query Hooks (useProductData.ts)\n• useProductData()\n• useReviewsData()\n• usePreorderMutation()"]
        
        Nav -->|Navigates / Pre-order| Store
        Hero --> ThreeCanvas
        ThreeCanvas <--> OrbitIndicator
        Hero --> Store
        SoundLab --> HRTFRadar
        SoundLab --> Store
        Studio --> Store
        Reviews --> QueryHooks
        Drawer --> LaserEngrave
        Drawer --> Store
        Drawer --> QueryHooks
        FloatingStack --> Store
    end
    
    subgraph APILayer ["Next.js App Router API & MSW v2 Network Isolation"]
        MSW["MSW v2 Network Interceptor"]
        RouteProduct["GET /api/product\n(Hardware Specs & Pricing)"]
        RouteReviews["GET /api/reviews\n(Verified Customer Feedback)"]
        RoutePreorder["POST /api/order/preorder\n(Reservation Receipt Dispatch)"]
        
        MSW --> RouteProduct
        MSW --> RouteReviews
        MSW --> RoutePreorder
    end
    
    subgraph QualityGateEngine ["7-Gateway Closed-Loop Quality Engine"]
        VerifyScript["scripts/verify-build.js"]
        ASTParser["scripts/lib/ast-parser.js"]
        LivingArch["ARCHITECTURE.md"]
        QualityReport["docs/QUALITY_AUDIT_REPORT.md"]
        Changelog["CHANGELOG.md"]
        
        VerifyScript --> ASTParser
        ASTParser --> LivingArch
        VerifyScript --> QualityReport
        VerifyScript --> Changelog
    end
    
    User <-->|Gestures, 3D Orbit, Audio Toggles| ClientApp
    QueryHooks <-->|JSON REST Protocol| APILayer
    ClientApp -.->|Validated by| VerifyScript
```

---

### 2. Precision HRTF Binaural Soundstage Engine

The **Spatial Radar** implements Head-Related Transfer Function (HRTF) acoustic simulation with real-time vector ray-tracing:

```mermaid
flowchart LR
    subgraph HRTFEngine ["Binaural Acoustic Ray-Tracing Engine"]
        Angle["Spatial Azimuth θ (0° - 360°)"]
        
        CalcRad["Convert to Radians: θ_rad = (θ - 90) * π / 180"]
        EmitterPos["Virtual Emitter Position (x, y)\nx = cx + R * cos(θ_rad)\ny = cy + R * sin(θ_rad)"]
        
        DistanceL["Left Ear Distance (dL)\ndL = sqrt((x - earLx)² + (y - earLy)²)"]
        DistanceR["Right Ear Distance (dR)\ndR = sqrt((x - earRx)² + (y - earRy)²)"]
        
        GainL["Left Ear Gain (GL)\nGL = clamp(1.0 - dL / maxDist, 0.15, 1.0)"]
        GainR["Right Ear Gain (GR)\nGR = clamp(1.0 - dR / maxDist, 0.15, 1.0)"]
        
        Angle --> CalcRad --> EmitterPos
        EmitterPos --> DistanceL --> GainL
        EmitterPos --> DistanceR --> GainR
    end
    
    subgraph SVGDisplay ["Soundstage Vector Rendering"]
        Headband["Curved Headband & Chassis Silhouette"]
        LeftDriver["Left Speaker (L) + Dynamic Energy Glow"]
        RightDriver["Right Speaker (R) + Dynamic Energy Glow"]
        Emitter["360° Orbiting Sound Emitter + Wavefronts"]
        Rays["Acoustic Ray-Tracing Vectors"]
        Telemetry["Telemetry: L/R Panning Balance & Quad Stage"]
        
        GainL --> LeftDriver
        GainR --> RightDriver
        EmitterPos --> Emitter
        EmitterPos --> Rays
        GainL & GainR --> Telemetry
    end
```

---

### 3. Atomic Component & Design System Tree

```mermaid
graph TD
    subgraph Atoms ["UI Atoms (src/components/ui/)"]
        Button["Button.tsx"]
        Badge["Badge.tsx"]
        Card["Card.tsx"]
        Input["Input.tsx"]
        Modal["Modal.tsx"]
        StarRating["StarRating.tsx"]
        Accordion["Accordion.tsx"]
        TrustBadge["TrustBadgeBar.tsx"]
    end
    
    subgraph Motion ["Motion Wrappers (src/components/motion/)"]
        AcousticLink["AcousticNavLink.tsx\n(Letter Wave Hover Physics)"]
        AcousticWave["AcousticTextWave.tsx\n(Periodic Soundwave Typography)"]
        MagneticBtn["MagneticButton.tsx\n(Fluid Spring-Physics Cursor Pull)"]
        MotionRev["MotionReveal.tsx\n(Viewport Elevation)"]
        Stagger["StaggerGroup.tsx\n(Choreographed Grid Stagger)"]
        AcousticRip["AcousticRipple.tsx\n(Transducer Wave Rings)"]
    end
    
    subgraph Organisms ["Domain Organisms (src/components/presentation/)"]
        Navbar["Navbar.tsx"]
        HeroSec["HeroSection.tsx"]
        VisualizerComp["HeadphoneVisualizer.tsx"]
        OrbitInd["ModelOrbitIndicator.tsx"]
        SoundExp["SoundExperience.tsx"]
        SpatialRad["SpatialRadar.tsx"]
        Waveform["AcousticWaveform.tsx"]
        BentoGrid["AcousticBento.tsx"]
        StudioComp["ColorStudio.tsx"]
        SpecsComp["TechnicalSpecs.tsx"]
        ReviewsComp["ReviewsSection.tsx"]
        FAQComp["FAQSection.tsx"]
        DrawerComp["CheckoutDrawer.tsx"]
        LaserPrev["LaserEngravingPreview.tsx"]
        FooterComp["Footer.tsx"]
    end
    
    Atoms --> Organisms
    Motion --> Organisms
    Organisms --> SPA["src/app/page.tsx (Single Page Architecture)"]
```

---

## ✨ Core Presentation Experience

| # | Section | Key Features & Engineering Highlights |
| :-: | :--- | :--- |
| **01** | **Atelier Capsule Navbar** | Split-letter wave elevation (`translateY(-3.5px)`) staggered by $24\text{ms}$ with spring physics, gold hairline sweeps, mobile menu drawer, and active colorway cart indicator. |
| **02** | **Acoustic Hero & 3D Turntable** | Procedural WebGL Three.js studio model with multi-mesh materials, default 360° continuous auto-orbit, drag interaction with unsnapped continuous resumption, floating status pill indicator, and 2D acoustic dance CTA button with continuous 0.35x hover dampening. |
| **03** | **Interactive Sound Lab** | Triple-mode Active Noise Cancellation simulator (Transparency, Balanced, Ultra 48dB) with real-time waveform physics, plus a 360° HRTF Binaural Soundstage with listener anatomy, left/right driver energy glow, orbiting sound emitter, and acoustic ray-tracing. |
| **04** | **Engineering Bento Matrix** | Asymmetric bento grid showcasing the 45mm Custom Graphene Driver, Aerospace Titanium chassis, 65-Hour Extended Battery, and Lossless 24-bit/192kHz LDAC Bluetooth 5.4. |
| **05** | **Color Studio** | Interactive finish atelier featuring Midnight Obsidian, Champagne Platinum, Raw Titanium, and Frosted Alpine with live metallurgical shader sync. |
| **06** | **Technical Architecture** | Complete laboratory metrics, frequency response curves ($4\text{Hz} - 48\text{kHz}$), and side-by-side benchmark table comparing RoH Sound against legacy flagships. |
| **07** | **Customer Reviews** | Acclaimed customer feedback from verified sound engineers and mastering specialists with star ratings and verified buyer credentials. |
| **08** | **Concierge & FAQ** | Accordion-based inquiry hub detailing the 30-Day Audition Policy, 3-Year Platinum Warranty, and Global Concierge Desk. |
| **09** | **Slide-Over Checkout Drawer** | Real-time interactive pre-order flow with live personalized laser engraving deboss preview, warranty selection, and instant reservation code dispatch. |
| **10** | **Floating Back to Top Pill** | Glassmorphic floating **Back to Top** pill positioned in the bottom-right corner when scrolling down past the hero section. |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: `>= 20.0.0`
- **npm**: `>= 10.0.0`

### Installation & Local Development
```bash
# 1. Clone repository and install dependencies
npm install

# 2. Start local development server (automatically opens http://localhost:3000)
npm run dev:open

# 3. Or launch full development environment with background test watcher
npm run dev:all
```

---

## 🛠️ CLI Command Matrix

| Command | Purpose | Verification Scope |
| :--- | :--- | :--- |
| `npm run dev` | **Next.js Dev Server** | Launches App Router dev server on `http://localhost:3000` |
| `npm run dev:open` | **Dev Server + Browser** | Launches dev server and auto-opens browser |
| `npm run dev:all` | **Full Dev Environment** | Runs Next.js dev server alongside CLI terminal test watcher |
| `npm run verify` | **Master 7-Gateway Gatekeeper** | Runs full closed-loop audit: Secrets, Types, Tests, Living Docs, ADRs, Lint, Knip, Build |
| `npm test` | **Vitest Test Suite** | Runs all 84 test suites (101 tests) with v8 code coverage reporting |
| `npm run test:ui` | **Vitest Graphical UI** | Interactive browser-based test suite visualizer & debugger |
| `npm run test:watch` | **Test Watcher** | Fast continuous test execution during active coding |
| `npm run typecheck` | **TypeScript Typecheck** | Strict typecheck across all `.ts` and `.tsx` source files (`0 compile errors`) |
| `npm run lint` | **ESLint Linter** | Strict Next.js and React Core Web Vitals lint inspection |
| `npm run knip` | **Dead-Code Auditor** | AST analysis ensuring zero unused files, exports, or dependencies |
| `npm run docs:sync` | **Living Documentation Sync** | AST introspection generating `ARCHITECTURE.md`, `docs/QUALITY_AUDIT_REPORT.md`, and `CHANGELOG.md` |
| `npm run report` | **Quality Report Generator** | Generates Markdown & JSON quality telemetry |
| `npm run adr:new -- "Title"` | **New Architecture Decision** | Creates sequentially numbered ADR in `docs/DECISIONS.md` |
| `npm run build` | **Production Next.js Build** | Compiles optimized Next.js 15 production bundle |

---

## 🛡️ The 7-Gateway Quality Engine

Every contribution is validated through 7 deterministic quality gateways:

```
+-----------------------------------------------------------------------------+
|                      7-GATEWAY CLOSED-LOOP VERIFICATION                     |
+-----------------------------------------------------------------------------+
| Pass 0.5 | Secret Scanner      | Checks repository files for exposed keys   |
| Pass 1   | TypeScript Engine   | Strict typecheck with 0 compile errors     |
| Pass 2   | Vitest Server Mocks | Validates MSW v2 handlers and query hooks  |
| Pass 3   | Vitest Client UI    | Unit & integration tests (>= 85% coverage) |
| Pass 4   | Living Docs Sync    | Auto-updates ARCHITECTURE, AUDIT, & CHANGE |
| Pass 5   | ADR Validation      | Validates DECISIONS.md sequential schema   |
| Pass 6   | Quality & Dead Code | ESLint check and Knip unused code audit    |
| Pass 7   | Production Build    | Compiles Next.js 15 production bundle      |
+-----------------------------------------------------------------------------+
```

1. **Pass 0.5 (Secret Scanner):** Scans all codebase files for private keys, AWS/GCP tokens, or exposed API credentials.
2. **Pass 1 (TypeScript Strict Typecheck):** Verifies 0 compile errors via `tsc --noEmit`.
3. **Pass 2 (Vitest MSW Server & Queries):** Validates network mocking and query hook state transitions.
4. **Pass 3 (Vitest Client UI & Primitives):** Executes all test suites and asserts **≥ 85% code coverage** (*current: 95.92%*).
5. **Pass 4 (Living Architecture & Quality Sync):** Auto-generates C4 matrices in `ARCHITECTURE.md`, compiles `docs/QUALITY_AUDIT_REPORT.md`, and syncs `CHANGELOG.md`.
6. **Pass 5 (ADR Decision Ledger Validation):** Verifies sequential numbering and schema conformance in `docs/DECISIONS.md`.
7. **Pass 6 (ESLint & Knip Audit):** Validates 0 lint errors and 0 dead code/unused exports.
8. **Pass 7 (Production Build Compilation):** Validates compilation of the production Next.js 15 bundle.

---

## 📚 Living Documentation Registry

- **Living System Architecture (C4 Level 1-3):** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **Quality & Coverage Audit Report:** [`docs/QUALITY_AUDIT_REPORT.md`](./docs/QUALITY_AUDIT_REPORT.md)
- **Machine-Readable Audit Telemetry:** [`docs/quality-audit-results.json`](./docs/quality-audit-results.json)
- **Architecture Decision Records (ADRs):** [`docs/DECISIONS.md`](./docs/DECISIONS.md)
- **Master Governance & Operations Protocol:** [`.agents/AGENTS.md`](./.agents/AGENTS.md)
- **CI/CD Pipeline Guide:** [`docs/PIPELINE_GUIDE.md`](./docs/PIPELINE_GUIDE.md)
- **Developer Maintenance Hub:** [`DEVELOPMENT.md`](./DEVELOPMENT.md)
- **Semantic Release Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)
