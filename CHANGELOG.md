# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Next.js 15 App Router foundation with TypeScript and Tailwind CSS v4.
- State management layer using Zustand with client preferences and test reset utilities.
- Mock Service Worker (MSW v2) integration for deterministic network interception.
- TanStack React Query hooks with automatic caching and stale-time invalidation.
- Atomic UI primitives (Button, Card, Badge, Input, Modal) styled with CVA and tailwind-merge.
- Vitest unit and integration test suites with >= 85% code coverage enforcement.
- 7-Gateway Quality Engine (scripts/verify-build.js) enforcing strict verification passes.
- AST-driven Living Documentation Engine auto-generating C4 diagrams and quality reports.

## [1.0.0] - 2026-08-16

### Added
- Initial enterprise foundation bootstrap with Closed-Loop Quality & Living Documentation Engine.
- Production-grade starter canvas and atomic design primitives.
- Automated C4 Level 1-3 Mermaid architecture generation.
- Full 7-stage quality gateway verifying secrets, types, tests, docs, ADRs, linting, and build.

---

### Recent Git Commit History
- `a82856e` - **feat(dx): decouple vitest ui from dev:all and establish user-driven commit governance** (2026-08-16)
- `a5147b8` - **feat(dx): add auto-opening browser capabilities for dev and test UI** (2026-08-16)
- `745308b` - **feat(scripts): add dev:all script to run next dev and vitest concurrently** (2026-08-16)
- `339547f` - **feat(core): bootstrap enterprise application foundation with closed-loop quality engine** (2026-08-16)
