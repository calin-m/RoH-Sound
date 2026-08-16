# RoH Sound — Product Presentation Single Page Application

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Coverage_%E2%89%A585%25-green?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![MSW v2](https://img.shields.io/badge/MSW-v2.0-E35555?style=for-the-badge&logo=mockserviceworker)](https://mswjs.io/)
[![Quality Gateway](https://img.shields.io/badge/7--Gateway-Verified-emerald?style=for-the-badge&logo=shield)](./DEVELOPMENT.md)

An ultra-refined, high-performance **Product Presentation Single Page Application** for **RoH Sound** (*"Pure Acoustic Architecture. Zero Distortion."*) built with a Light Minimalistic Sleek luxury design language, Next.js 15 App Router, Zustand state management, TanStack React Query, MSW v2 network isolation, and a Closed-Loop 7-Gateway Quality Engine.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    User["👤 Customer / Sound Engineer"]
    
    subgraph FrontendApp ["RoH Sound Next.js 15 SPA (src/app/page.tsx)"]
        Navbar["Capsule Navbar (Navbar.tsx)"]
        Hero["Acoustic Hero & Colorway Selector (HeroSection.tsx)"]
        Visualizer["Studio-Lit Vector Visualizer (HeadphoneVisualizer.tsx)"]
        SoundLab["Interactive ANC & Spatial Lab (SoundExperience.tsx)"]
        Bento["Engineering Bento Matrix (EngineeringBento.tsx)"]
        Studio["Material Atelier (ColorStudio.tsx)"]
        Specs["Technical Specs & Benchmark Table (TechnicalSpecs.tsx)"]
        Reviews["Verified Feedback (ReviewsSection.tsx)"]
        FAQ["Inquiries & Policies (FAQSection.tsx)"]
        Drawer["Slide-Over Checkout & Laser Engraving (CheckoutDrawer.tsx)"]
        Footer["Sticky Purchase Bar & Footer (Footer.tsx)"]
        
        Store["Zustand State Store (useProductStore.ts)"]
        QueryHooks["TanStack Query Hooks (useProductData.ts)"]
        
        Hero --> Visualizer
        Hero --> Store
        SoundLab --> Store
        Studio --> Store
        Drawer --> Store
        Drawer --> QueryHooks
        Reviews --> QueryHooks
        Footer --> Store
    end
    
    subgraph BackendRoutes ["Next.js App Router API & MSW v2"]
        MSWServer["MSW Interception / Browser Worker"]
        APIProduct["/api/product (Transducer Specs & Pricing)"]
        APIReviews["/api/reviews (Verified Audiophile Feedback)"]
        APIPreorder["/api/order/preorder (Reservation Dispatch)"]
        
        MSWServer --> APIProduct
        MSWServer --> APIReviews
        MSWServer --> APIPreorder
    end
    
    subgraph QualityEngine ["7-Gateway Quality & Living Docs Engine"]
        Gateway["scripts/verify-build.js"]
        AST["scripts/lib/ast-parser.js"]
        ArchMatrix["ARCHITECTURE.md"]
        AuditReport["docs/QUALITY_AUDIT_REPORT.md"]
        
        Gateway --> AST
        AST --> ArchMatrix
        Gateway --> AuditReport
    end
    
    QueryHooks <-->|REST API Fetch / Cache| BackendRoutes
    FrontendApp -.->|Validated by| Gateway
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: `>= 20.0.0`
- **npm**: `>= 10.0.0`

### Installation & Local Development
```bash
# 1. Install all dependencies
npm install

# 2. Run local development server (auto-opens browser)
npm run dev:open

# 3. Access presentation at http://localhost:3000
```

---

## 🛠️ CLI Command Matrix

| Command | Purpose | Verification Scope |
| :--- | :--- | :--- |
| `npm run dev` | **Next.js Dev Server** | Launches App Router dev server on http://localhost:3000 |
| `npm run dev:open` | **Dev Server + Browser** | Launches dev server and automatically opens http://localhost:3000 in browser |
| `npm run dev:all` | **Full Dev Environment** | Launches Next.js dev server & CLI terminal test watcher, auto-opening http://localhost:3000 |
| `npm run verify` | **Master 7-Gateway Gatekeeper** | Secrets, Types, Tests (≥ 85% cov), Living Docs, ADRs, Lint, Knip, Build |
| `npm test` | **Vitest Test Suite** | Runs all 20 test suites with v8 code coverage reporting |
| `npm run test:ui` | **Vitest Graphical UI** | Interactive test explorer & execution visualizer |
| `npm run test:watch` | **Test Watcher** | Continuous test runner for active feature development |
| `npm run typecheck` | **TypeScript Typecheck** | Strict typecheck across all `.ts` and `.tsx` source files |
| `npm run lint` | **ESLint Linter** | Next.js and React Core Web Vitals lint inspection |
| `npm run knip` | **Dead-Code Auditor** | Unused file, export, and dependency identification |
| `npm run docs:sync` | **Living Documentation Sync** | AST introspection generating `ARCHITECTURE.md` and `docs/QUALITY_AUDIT_REPORT.md` |
| `npm run report` | **Quality Report Generator** | Generates Markdown & JSON quality metrics from test results |
| `npm run adr:new -- "Title"` | **New Architecture Decision** | Appends numbered ADR entry to `docs/DECISIONS.md` |
| `npm run build` | **Production Next.js Build** | Compiles production-ready bundle |

---

## 🛡️ The 7-Gateway Quality Engine

Every contribution is validated through 7 deterministic quality gateways:
1. **Pass 0.5 (Secret Scanner):** Scans codebase for private keys, AWS/GCP tokens, or exposed credentials.
2. **Pass 1 (TypeScript Strict Typecheck):** Verifies zero type errors via `tsc --noEmit`.
3. **Pass 2 (Vitest MSW Server & Queries):** Validates network mocking and query hook state transitions.
4. **Pass 3 (Vitest Client UI & Primitives):** Executes unit/integration test suites and asserts **≥ 85% code coverage**.
5. **Pass 4 (Living Architecture & Quality Sync):** Auto-generates C4 diagrams in `ARCHITECTURE.md`, compiles `docs/QUALITY_AUDIT_REPORT.md`, and updates `CHANGELOG.md`.
6. **Pass 5 (ADR Decision Ledger Validation):** Verifies sequential numbering and schema conformance in `docs/DECISIONS.md`.
7. **Pass 6 (ESLint & Knip Audit):** Zero lint warnings and zero dead code.
8. **Pass 7 (Production Build Compilation):** Validates compilation with `next build`.

---

## 📚 Living Documentation Links

- **Living Architecture Matrix (C4 Level 1-3):** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **Quality & Coverage Audit Report:** [`docs/QUALITY_AUDIT_REPORT.md`](./docs/QUALITY_AUDIT_REPORT.md)
- **Architecture Decision Records (ADRs):** [`docs/DECISIONS.md`](./docs/DECISIONS.md)
- **Master Governance Protocol:** [`.agents/AGENTS.md`](./.agents/AGENTS.md)
- **CI/CD Pipeline Guide:** [`docs/PIPELINE_GUIDE.md`](./docs/PIPELINE_GUIDE.md)
- **Developer Guide:** [`DEVELOPMENT.md`](./DEVELOPMENT.md)
- **Project Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)
