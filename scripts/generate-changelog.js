const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateChangelog() {
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');
  const timestamp = new Date().toISOString().split('T')[0];

  let gitCommits = [];
  try {
    const gitLog = execSync('git log --pretty=format:"%h%x09%an%x09%ad%x09%s" --date=short -n 50', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    if (gitLog) {
      gitCommits = gitLog.split('\n').map((line) => {
        const [hash, author, date, subject] = line.split('\t');
        return { hash, author, date, subject };
      });
    }
  } catch (e) {
    // Git log fallback when no commits exist
  }

  const addedItems = [
    'Next.js 15 App Router foundation with TypeScript and Tailwind CSS v4.',
    'State management layer using Zustand with client preferences and test reset utilities.',
    'Mock Service Worker (MSW v2) integration for deterministic network interception.',
    'TanStack React Query hooks with automatic caching and stale-time invalidation.',
    'Atomic UI primitives (Button, Card, Badge, Input, Modal) styled with CVA and tailwind-merge.',
    'Vitest unit and integration test suites with >= 85% code coverage enforcement.',
    '7-Gateway Quality Engine (scripts/verify-build.js) enforcing strict verification passes.',
    'AST-driven Living Documentation Engine auto-generating C4 diagrams and quality reports.',
  ];

  const changelogContent = `# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
${addedItems.map((item) => `- ${item}`).join('\n')}

## [1.0.0] - ${timestamp}

### Added
- Initial enterprise foundation bootstrap with Closed-Loop Quality & Living Documentation Engine.
- Production-grade starter canvas and atomic design primitives.
- Automated C4 Level 1-3 Mermaid architecture generation.
- Full 7-stage quality gateway verifying secrets, types, tests, docs, ADRs, linting, and build.

---

### Recent Git Commit History
${gitCommits.length > 0 ? gitCommits.map((c) => `- \`${c.hash}\` - **${c.subject}** (${c.date})`).join('\n') : '- _Initial release commit pending._'}
`;

  fs.writeFileSync(changelogPath, changelogContent, 'utf-8');
  console.log(`[Changelog Engine] Successfully generated CHANGELOG.md: ${changelogPath}`);
}

if (require.main === module) {
  generateChangelog();
}

module.exports = { generateChangelog };
