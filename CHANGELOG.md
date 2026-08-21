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

## [1.0.0] - 2026-08-21

### Added
- Initial enterprise foundation bootstrap with Closed-Loop Quality & Living Documentation Engine.
- Production-grade starter canvas and atomic design primitives.
- Automated C4 Level 1-3 Mermaid architecture generation.
- Full 7-stage quality gateway verifying secrets, types, tests, docs, ADRs, linting, and build.

---

### Recent Git Commit History
- `2c873fc` - **test(coverage): expand vitest suites to 131 tests and synchronize documentation** (2026-08-21)
- `f0e5080` - **feat(mobile): implement optical center scroll-spy auto-activation in ColorStudio** (2026-08-21)
- `5bb44d7` - **feat(design-system): decouple color variables, tokenize css, and enforce approval gate** (2026-08-21)
- `39d5cee` - **feat(ui): refine floating hero showcase, mobile menu animations, and continuous motion replay** (2026-08-20)
- `b87bd3a` - **refactor(theme): standardize design tokens, fix mobile GPU rendering, and align FAQ/footer** (2026-08-17)
- `d3d9b82` - **refactor(faq): top-align accordion chevrons and standardize footer documentation** (2026-08-17)
- `8a4a1df` - **perf(motion): optimize ripple gpu transforms and stabilize mobile scroll rendering** (2026-08-17)
- `cc9a421` - **feat(visualizer): implement multi-perspective vector svg with controls, exploded anatomy, and calm ambient breathing** (2026-08-17)
- `2ae9eab` - **refactor(presentation): standardize on modern minimalistic nomenclature and mobile UX hardening** (2026-08-17)
- `d4b37fd` - **perf(mobile): persist UI visibility on scroll, prevent iOS zoom, and optimize touch responsiveness** (2026-08-17)
- `752a3a7` - **perf(mobile): auto-pause off-screen WebGL and waveform loops with 94.8% test coverage** (2026-08-17)
- `af9ff7d` - **refactor(checkout): rename extended warranty label in drawer and confirmation card** (2026-08-17)
- `e83e530` - **fix(mobile): center 3D model framing and fix ANC matrix tabs scroll reveal** (2026-08-17)
- `0792aad` - **feat(mobile): refine navbar drawer controls, 3D gesture isolation, and benchmark switcher** (2026-08-17)
- `da96e17` - **fix(footer): update copyright holder to Calin M linking to github.com/calin-m** (2026-08-17)
- `9caeb4d` - **docs(license): update MIT copyright attribution to calin-m with GitHub profile link** (2026-08-17)
- `061210c` - **docs(readme): update live demo deployment URL to roh-sound.vercel.app** (2026-08-17)
- `5103e14` - **ci(husky): stream live test output during pre-commit and auto-stage living docs** (2026-08-17)
- `e2342bb` - **docs(readme): document automated pre-commit hook enforcement and quality gate blocking** (2026-08-17)
- `f79c606` - **docs(readme): synchronize complete feature matrix and living architecture documentation** (2026-08-17)
- `33ba31e` - **docs(readme): harmonize CI badge with shields.io for-the-badge style** (2026-08-17)
- `4a859fa` - **fix(ci): make changelog generator cross-platform and upgrade to Node 22 LTS** (2026-08-17)
- `69c7553` - **fix(ci): polyfill browser observers and anchor vitest ESM paths for Linux CI** (2026-08-17)
- `17efc54` - **ci(github): add 7-Gateway automated CI workflow and status badge** (2026-08-17)
- `9aa7382` - **docs(meta): add MIT license, repository links, and footer attribution** (2026-08-17)
- `ced6d34` - **feat(ui): orchestrate actionable micro-animations across all presentation sections** (2026-08-17)
- `8d95ff7` - **feat(presentation): add drawer slide motion, permanent ambient soundwaves, and streamlined hero cta** (2026-08-17)
- `a088076` - **feat(presentation): add speaker transducer emblem and periodic acoustic text wave CTA** (2026-08-17)
- `18bc6ee` - **feat(docs): modernize README diagrams, add floating back-to-top, and standardize reviews** (2026-08-17)
- `847ca85` - **feat(ui): add 360 turntable indicator, multi-directional dance, and HRTF soundstage** (2026-08-17)
- `f075328` - **feat(ui): implement procedural 3D visualizer, modular UI atoms, and acoustic nav animations** (2026-08-16)
- `55b6bf4` - **feat(3d-visualizer): implement procedural WebGL 3D headphone model and centralize motion tokens** (2026-08-16)
- `9e8a7ef` - **fix(motion): eliminate SSR hydration mismatch and add configurable replay support** (2026-08-16)
- `ccb1635` - **refactor(presentation): extract modular sub-components and add comprehensive test coverage** (2026-08-16)
- `89774e4` - **feat(presentation): implement RoH Sound light minimalist product presentation SPA** (2026-08-16)
- `a82856e` - **feat(dx): decouple vitest ui from dev:all and establish user-driven commit governance** (2026-08-16)
- `a5147b8` - **feat(dx): add auto-opening browser capabilities for dev and test UI** (2026-08-16)
- `745308b` - **feat(scripts): add dev:all script to run next dev and vitest concurrently** (2026-08-16)
- `339547f` - **feat(core): bootstrap enterprise application foundation with closed-loop quality engine** (2026-08-16)
