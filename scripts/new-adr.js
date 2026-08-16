const fs = require('fs');
const path = require('path');

function createNewADR() {
  const decisionsPath = path.resolve(__dirname, '../docs/DECISIONS.md');
  if (!fs.existsSync(decisionsPath)) {
    console.error('[ADR Engine] docs/DECISIONS.md not found.');
    process.exit(1);
  }

  const content = fs.readFileSync(decisionsPath, 'utf-8');
  const adrMatches = [...content.matchAll(/## ADR-(\d+):/g)];
  let nextNumber = 1;

  if (adrMatches.length > 0) {
    const numbers = adrMatches.map((m) => parseInt(m[1], 10));
    nextNumber = Math.max(...numbers) + 1;
  }

  const paddedNum = String(nextNumber).padStart(3, '0');
  const titleArg = process.argv.slice(2).join(' ') || `Architecture Decision ${paddedNum}`;
  const slug = titleArg.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const adrId = `ADR-${paddedNum}`;
  const dateStr = new Date().toISOString().split('T')[0];

  const indexEntry = `- [${adrId}: ${titleArg}](#${adrId.toLowerCase()}-${slug})`;

  const newAdrSection = `
---

## ${adrId}: ${titleArg}

- **Status:** Proposed
- **Date:** ${dateStr}
- **Authors:** Enterprise Architecture Team
- **Deciders:** Core Engineering Team

### Context
Describe the context and problem statement that requires an architecture decision.

### Decision
Detail the chosen solution, architectural patterns, and standards adopted.

### Consequences
- **Positive:** Benefits and strategic advantages.
- **Negative:** Trade-offs, risks, or maintenance overhead.
`;

  let updatedContent = content;
  if (updatedContent.includes('## ADR Index')) {
    const indexEndPos = updatedContent.indexOf('\n---');
    if (indexEndPos !== -1) {
      updatedContent =
        updatedContent.slice(0, indexEndPos) +
        `\n${indexEntry}` +
        updatedContent.slice(indexEndPos);
    }
  }

  updatedContent = updatedContent.trim() + '\n' + newAdrSection;

  fs.writeFileSync(decisionsPath, updatedContent, 'utf-8');
  console.log(`[ADR Engine] Successfully created ${adrId} in ${decisionsPath}`);
}

if (require.main === module) {
  createNewADR();
}

module.exports = { createNewADR };
