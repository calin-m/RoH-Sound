# Enterprise Architecture Decision Records (ADR)

This document tracks all foundational architecture decisions for the enterprise application platform.

## ADR Index
- [ADR-001: Enterprise Tech Stack Selection (Next.js 15, MSW v2, Zustand, TanStack Query, Vitest)](#adr-001-enterprise-tech-stack-selection)
- [ADR-002: Closed-Loop Quality & 7-Gateway Verification Engine Architecture](#adr-002-closed-loop-quality--7-gateway-verification-engine-architecture)

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
- **Positive:** Uniform architecture patterns across teams; zero environment divergence in testing; high test speed.
- **Negative:** Requires team adherence to App Router client/server boundaries and MSW request handler conventions.

---

## ADR-002: Closed-Loop Quality & 7-Gateway Verification Engine Architecture

- **Status:** Accepted
- **Date:** 2026-08-16
- **Authors:** Enterprise Solutions Architect & Staff Engineer
- **Deciders:** Core Engineering Team

### Context
Enterprise systems frequently suffer from documentation drift, silent test regressions, dead code accumulation, and accidental secret leakage. We require an automated, closed-loop verification pipeline running prior to git commits and CI/CD promotion.

### Decision
We implement the 7-Gateway Quality Engine (`scripts/verify-build.js` executed via `npm run verify` and `.husky/pre-commit`):
- **Pass 0.5 (Pre-Commit Secret Scanner):** Scans the repository for leaked API keys, tokens, and private credentials.
- **Pass 1 (TypeScript Strict Typecheck):** Verifies type safety with `tsc --noEmit`.
- **Pass 2 (Vitest MSW & Data Queries Pass):** Validates network mocking and query hook state transitions.
- **Pass 3 (Vitest Client UI & Primitives Pass):** Executes unit/integration test suites and asserts >= 85% code coverage.
- **Pass 4 (Living Architecture & Quality Sync):** Auto-generates C4 Level 1-3 diagrams in `ARCHITECTURE.md`, compiles `docs/QUALITY_AUDIT_REPORT.md`, and updates `CHANGELOG.md` via AST introspection.
- **Pass 5 (ADR Ledger Validation):** Asserts sequential numbering, required sections, and schema integrity for `docs/DECISIONS.md`.
- **Pass 6 (Code Quality & Dead-Code Audit):** Executes ESLint and Knip dead-code analysis.
- **Pass 7 (Production Build Compilation):** Compiles the Next.js bundle with `next build`.

### Consequences
- **Positive:** Zero documentation drift, guaranteed minimum 85% test coverage, immediate discovery of dead code or leaked secrets.
- **Negative:** Verification gate must pass completely before commit creation.
