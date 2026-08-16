# Enterprise Master Governance & Agent Operations Protocol

This document establishes immutable engineering rules, governance procedures, and operational guardrails for all human developers and autonomous AI coding agents interacting with this repository.

---

## 1. Core Governance Rules

### Rule 1: Automated Documentation Synchronization
All architecture diagrams (`ARCHITECTURE.md`), quality reports (`docs/QUALITY_AUDIT_REPORT.md`), and change logs (`CHANGELOG.md`) must be kept in continuous synchronization with the source code.
- **Trigger:** Synchronize docs via `npm run docs:sync` whenever routes, stores, queries, or components are added, modified, or deleted.
- **Enforcement:** `npm run verify` runs Pass 4 to automatically re-compile living documentation from source AST.

### Rule 2: Zero-Bloat & AST-Driven Single Source of Truth
Never manually craft static component matrices, route catalogs, or architectural dependency diagrams that can drift.
- All architectural matrices and component inventories must be generated programmatically by `scripts/lib/ast-parser.js`.
- No mock data or dead prototypes in production code paths.

### Rule 6: Automated Verification Engine Protocol
Before committing any changes, pushing branches, or opening pull requests, the full 7-Gateway Quality Engine must pass with zero errors:
\`\`\`bash
npm run verify
\`\`\`
Any failure in passes 0.5 through 7 immediately blocks workflow progression.

### Rule 7: Approval-First Architectural Governance
Major architectural modifications, dependency introductions, schema shifts, or design alterations must be proposed via an Architecture Decision Record (ADR) before execution:
\`\`\`bash
npm run adr:new -- "Your Decision Title"
\`\`\`
All ADRs in `docs/DECISIONS.md` must adhere to standard schema (Status, Date, Context, Decision, Consequences).

### Rule 8: Repository Hygiene & Secret Prevention Protocol
- **Zero Secrets Policy:** Never commit API keys, RSA/EC private keys, passwords, database URLs with embedded credentials, or `.env` files containing live secrets.
- **Artifact Cleansing:** Temporary scratch files, unformatted test artifacts, and build caches (`.next/`, `coverage/`) must remain strictly excluded from git.
- **Continuous Scan:** Pass 0.5 executes pattern-matching secret scanning against all repository files prior to build.

### Rule 9: Conventional Commit Formatting & Pre-Commit Inspection Protocol
Before creating any git commit:
1. Always inspect staged changes via `git status --short` and `git diff --staged`.
2. Format commit messages using standard Conventional Commits with distinct multi-part `-m` flags for clear provenance:
\`\`\`bash
git commit \
  -m "feat(scope): concise imperative summary" \
  -m "[PHASE]: Implementation phase or milestone" \
  -m "[WHY]: Motivation and business/architectural justification" \
  -m "[WHAT]: Comprehensive bulleted list of modifications" \
  -m "[VERIFICATION]: 7-Gateway verification command and test results"
\`\`\`

---

## 2. Rule 12: Master Documentation & Quality Report Registry

| Artifact | File Location | Generation Mechanism | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **System Architecture** | [`ARCHITECTURE.md`](../ARCHITECTURE.md) | `scripts/generate-architecture-matrix.js` (AST) | C4 Level 1-3 system context, containers, and component matrix |
| **Quality Audit Report** | [`docs/QUALITY_AUDIT_REPORT.md`](../docs/QUALITY_AUDIT_REPORT.md) | `scripts/generate-quality-report.js` | Test pass rates, SLA compliance, and v8 code coverage metrics |
| **Machine Audit Results**| [`docs/quality-audit-results.json`](../docs/quality-audit-results.json) | `scripts/generate-quality-report.js` | Machine-readable CI/CD quality gate telemetry |
| **Changelog** | [`CHANGELOG.md`](../CHANGELOG.md) | `scripts/generate-changelog.js` | Semantic versioning release log and git history |
| **Architecture Decisions**| [`docs/DECISIONS.md`](../docs/DECISIONS.md) | `scripts/new-adr.js` | Numbered ADR ledger (ADR-001, ADR-002, ...) |
| **Pipeline Specifications**| [`docs/PIPELINE_GUIDE.md`](../docs/PIPELINE_GUIDE.md) | Manual / Architectural Spec | CI/CD automation and production deployment standards |
| **Developer Hub** | [`DEVELOPMENT.md`](../DEVELOPMENT.md) | Manual / Maintenance Spec | Local development workflows, commands, and debugging |

---

## 3. The 7-Gateway Quality Engine Matrix

\`\`\`
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
\`\`\`
