const fs = require('fs');
const path = require('path');
const { ASTParser } = require('./lib/ast-parser');

function generateArchitectureMatrix() {
  const parser = new ASTParser();
  const astData = parser.inspectProject();

  const timestamp = new Date().toISOString();

  let markdown = `# Enterprise System Architecture & Living Interaction Matrix

> [!NOTE]
> This document is **100% auto-generated** via AST code introspection (\`scripts/generate-architecture-matrix.js\`). Any manual edits will be overwritten during verification (\`npm run verify\`) or synchronization (\`npm run docs:sync\`).
> **Last Synchronized:** \`${timestamp}\`

---

## 1. C4 Architecture Level 1: System Context Diagram

The System Context diagram illustrates the high-level boundary of the Enterprise Application Foundation and external system actors.

\`\`\`mermaid
flowchart TD
    User["👤 Enterprise User / Operator"]
    
    subgraph EnterpriseBoundary ["Enterprise Application Platform Boundary"]
        App["🌐 Next.js 15 Web Application\n(React 19, TypeScript, Tailwind CSS)"]
    end
    
    subgraph MockBoundary ["Mock & Network Layer (MSW v2)"]
        MSW["⚡ Mock Service Worker Engine\n(REST Interception & Telemetry)"]
    end
    
    subgraph ExternalAPIs ["Upstream Enterprise Services (Target)"]
        AuthService["🔐 IAM / Auth Gateway"]
        DataAPI["📊 Core Business API"]
    end
    
    User -->|Interacts via Browser / HTTPS| App
    App -->|Intercepted in Dev / Testing| MSW
    App -.->|Target Production Routes| AuthService
    App -.->|Target Production Routes| DataAPI
\`\`\`

---

## 2. C4 Architecture Level 2: Container Diagram

The Container diagram illustrates the runtime execution boundaries within the client and mock infrastructure.

\`\`\`mermaid
flowchart TB
    subgraph ClientBrowser ["Client Browser Container"]
        direction TB
        AppRouter["App Router Views\n(Server & Client Components)"]
        
        subgraph StateAndData ["State & Data Management"]
            ZustandStore["Zustand Client Store\n(Preferences & UI Telemetry)"]
            TanStackQuery["TanStack Query Cache\n(Async Server State & StaleTime)"]
        end
        
        subgraph UIPrimitives ["Atomic UI System"]
            Buttons["Button Primitive (CVA)"]
            Cards["Card Primitives"]
            Badges["Badge Primitives"]
            Inputs["Input Primitives"]
            Modals["Modal Primitives"]
        end
        
        AppRouter --> UIPrimitives
        AppRouter --> StateAndData
        UIPrimitives --> ZustandStore
    end
    
    subgraph NetworkSimulation ["Mock & Network Interceptor"]
        MSWWorker["MSW Browser / Node Server\n(Simulated Latency & JSON Payloads)"]
        Handlers["Request Handlers\n(/api/status, /api/app-config)"]
        MSWWorker --> Handlers
    end
    
    TanStackQuery <-->|Fetch / Cache| MSWWorker
\`\`\`

---

## 3. C4 Architecture Level 3: Component Interaction Matrix

The Component diagram maps the discovered AST dependencies between UI components, state stores, and query hooks.

\`\`\`mermaid
flowchart LR
    subgraph Routes ["Pages & Routing"]
${astData.routes.map((r, i) => `        Route_${i}["${r.route} (${path.basename(r.file)})"]`).join('\n')}
    end

    subgraph Queries ["TanStack Query Hooks"]
${astData.queries.map((q, i) => `        Query_${i}["${path.basename(q.file, path.extname(q.file))}\n(${q.exports.join(', ')})"]`).join('\n')}
    end

    subgraph Stores ["Zustand Stores"]
${astData.stores.map((s, i) => `        Store_${i}["${path.basename(s.file, path.extname(s.file))}\n(${s.exports.join(', ')})"]`).join('\n')}
    end

    subgraph UIComponents ["Atomic UI Primitives"]
${astData.uiComponents.map((u, i) => `        UI_${i}["${path.basename(u.file, path.extname(u.file))}\n(${u.exports.filter(e => !e.endsWith('Variants') && !e.endsWith('Props')).join(', ')})"]`).join('\n')}
    end

    subgraph Mocks ["MSW Mock Handlers"]
${astData.mocks.map((m, i) => `        Mock_${i}["${path.basename(m.file, path.extname(m.file))}"]`).join('\n')}
    end

    Route_0 --> UIComponents
    Route_0 --> Stores
    Route_0 --> Queries
    Queries --> Mocks
\`\`\`

---

## 4. AST-Extracted Component & Module Inventory

Summary of auto-discovered source modules:
- **Total Source Files Analyzed:** \`${astData.summary.totalFiles}\`
- **Application Routes:** \`${astData.summary.totalRoutes}\`
- **State Stores:** \`${astData.summary.totalStores}\`
- **Query Hooks:** \`${astData.summary.totalQueries}\`
- **Atomic UI Primitives:** \`${astData.summary.totalUIComponents}\`

### Module Breakdown Table

| Category | File Path | Exported Symbols | Key Dependencies |
| :--- | :--- | :--- | :--- |
${astData.routes.map(r => `| **Route** | \`${r.file}\` | \`${r.exports.join(', ') || 'default'}\` | \`${r.imports.filter(i => i.startsWith('@/')).join(', ') || 'none'}\` |`).join('\n')}
${astData.stores.map(s => `| **Store** | \`${s.file}\` | \`${s.exports.join(', ')}\` | \`${s.imports.join(', ')}\` |`).join('\n')}
${astData.queries.map(q => `| **Query** | \`${q.file}\` | \`${q.exports.join(', ')}\` | \`${q.imports.join(', ')}\` |`).join('\n')}
${astData.uiComponents.map(u => `| **UI Primitive** | \`${u.file}\` | \`${u.exports.join(', ')}\` | \`${u.imports.join(', ')}\` |`).join('\n')}
${astData.mocks.map(m => `| **Mock / Network** | \`${m.file}\` | \`${m.exports.join(', ')}\` | \`msw\` |`).join('\n')}

---

## 5. Architectural Quality Attributes

1. **Deterministic Test Isolation:** Tests execute with MSW intercepting all network activity, eliminating flaky external dependencies.
2. **Predictable State Mutations:** All client UI preferences and state transitions are centralized in Zustand with full test reset capability.
3. **Atomic Component Encapsulation:** All UI elements are built with \`class-variance-authority\` and strict ARIA accessibility standards.
4. **Living Documentation Enforcement:** The 7-Gateway Quality Engine verifies that this document reflects current codebase reality on every commit.
`;

  const outputPath = path.resolve(__dirname, '../ARCHITECTURE.md');
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`[AST Engine] Successfully generated living architecture matrix: ${outputPath}`);
}

if (require.main === module) {
  generateArchitectureMatrix();
}

module.exports = { generateArchitectureMatrix };
