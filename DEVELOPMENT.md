# Developer Operations & Quality Guide

This document outlines the local setup, development workflows, debugging techniques, and quality verification standards for the enterprise application foundation.

---

## 1. Local Development Setup

### System Prerequisites
- **Node.js**: `20.x` or later
- **npm**: `10.x` or later
- **Git**: `2.x` or later

### Initialization Steps
```bash
# Clone the repository and navigate to root
cd "Product Presentation"

# Install all locked dependencies
npm install

# Run the local development server
npm run dev
```

The Next.js 15 App Router server will boot at `http://localhost:3000`.

---

## 2. Architecture & Layering Rules

```
src/
├── app/                  # Next.js App Router Pages, Layouts, & Providers
├── components/
│   └── ui/               # Atomic UI Primitives (CVA + Tailwind)
├── hooks/
│   └── queries/          # TanStack React Query Hooks
├── lib/                  # Utilities (cn, helpers)
├── mocks/                # MSW v2 Handlers, Server, & Browser Workers
├── stores/               # Zustand Client Stores
└── test/                 # Vitest Global Lifecycle Setup
```

### Layer Constraints
1. **Components (`src/components/ui/`):** Pure, accessible UI components. Use `class-variance-authority` and `cn` for styling.
2. **State Management (`src/stores/`):** Zustand stores for client-only state (e.g., UI preferences, active modals, filters). Always include a `resetStore` action for deterministic test resets.
3. **Data Fetching (`src/hooks/queries/`):** TanStack React Query hooks for all async server state.
4. **Network Interception (`src/mocks/`):** Define mock endpoints in `handlers.ts`. Used by `server.ts` in Vitest and `browser.ts` in dev mode.

---

## 3. The 7-Gateway Quality Engine Breakdown

Execute all 7 verification gateways locally before pushing code or creating commits:
```bash
npm run verify
```

### Gateway Execution Details:

| Gateway | Tooling | What It Enforces | How to Fix Failures |
| :--- | :--- | :--- | :--- |
| **Pass 0.5** | Secret Scanner | Checks for API keys, private keys, or exposed tokens. | Remove hardcoded secrets and rotate exposed keys immediately. |
| **Pass 1** | `tsc --noEmit` | Strict TypeScript type checking. | Fix type mismatches, missing properties, or invalid imports. |
| **Pass 2** | `vitest` (Mocks) | MSW server & query hook integration. | Ensure mock handlers match expected API response contracts. |
| **Pass 3** | `vitest` (Coverage) | Unit/integration tests with **≥ 85% coverage**. | Add unit tests to cover uncovered branches/functions. |
| **Pass 4** | AST Doc Sync | Re-generates `ARCHITECTURE.md`, `QUALITY_AUDIT_REPORT.md`, `CHANGELOG.md`. | Automated step — ensure AST parser finds valid TS declarations. |
| **Pass 5** | ADR Ledger Check | Validates `docs/DECISIONS.md` sequential numbering and schema. | Fix out-of-order ADR IDs or missing sections. |
| **Pass 6** | `eslint` & `knip` | Zero ESLint warnings and zero dead code/unused exports. | Remove unused imports/variables or register intentional entries in `knip.json`. |
| **Pass 7** | `next build` | Compiles Next.js 15 production bundle. | Fix any SSR, bundler, or build-time issues. |

---

## 4. Testing & Code Coverage Workflow

### Running Tests
```bash
# Run all tests once with coverage report
npm test

# Run tests in interactive UI visualizer
npm run test:ui

# Run tests in watch mode during development
npm run test:watch
```

### Coverage SLA
The repository enforces an automated **85% minimum code coverage** threshold across:
- Statements
- Branches
- Functions
- Lines

Coverage results are generated in `coverage/` and summarized in `docs/QUALITY_AUDIT_REPORT.md`.

---

## 5. Adding Architecture Decision Records (ADRs)

Whenever introducing a architectural pattern or foundational library, record the decision:
```bash
npm run adr:new -- "Adopt Redis for Distributed Caching"
```
This automatically allocates the next sequential number (e.g. `ADR-003`) in `docs/DECISIONS.md`.
