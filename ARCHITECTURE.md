# Enterprise System Architecture & Living Interaction Matrix

> [!NOTE]
> This document is **100% auto-generated** via AST code introspection (`scripts/generate-architecture-matrix.js`). Any manual edits will be overwritten during verification (`npm run verify`) or synchronization (`npm run docs:sync`).
> **Last Synchronized:** `2026-08-17T08:19:52.814Z`

---

## 1. C4 Architecture Level 1: System Context Diagram

The System Context diagram illustrates the high-level boundary of the Enterprise Application Foundation and external system actors.

```mermaid
flowchart TD
    User["👤 Enterprise User / Operator"]
    
    subgraph EnterpriseBoundary ["Enterprise Application Platform Boundary"]
        App["🌐 Next.js 15 Web Application
(React 19, TypeScript, Tailwind CSS)"]
    end
    
    subgraph MockBoundary ["Mock & Network Layer (MSW v2)"]
        MSW["⚡ Mock Service Worker Engine
(REST Interception & Telemetry)"]
    end
    
    subgraph ExternalAPIs ["Upstream Enterprise Services (Target)"]
        AuthService["🔐 IAM / Auth Gateway"]
        DataAPI["📊 Core Business API"]
    end
    
    User -->|Interacts via Browser / HTTPS| App
    App -->|Intercepted in Dev / Testing| MSW
    App -.->|Target Production Routes| AuthService
    App -.->|Target Production Routes| DataAPI
```

---

## 2. C4 Architecture Level 2: Container Diagram

The Container diagram illustrates the runtime execution boundaries within the client and mock infrastructure.

```mermaid
flowchart TB
    subgraph ClientBrowser ["Client Browser Container"]
        direction TB
        AppRouter["App Router Views
(Server & Client Components)"]
        
        subgraph StateAndData ["State & Data Management"]
            ZustandStore["Zustand Client Store
(Preferences & UI Telemetry)"]
            TanStackQuery["TanStack Query Cache
(Async Server State & StaleTime)"]
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
        MSWWorker["MSW Browser / Node Server
(Simulated Latency & JSON Payloads)"]
        Handlers["Request Handlers
(/api/status, /api/app-config)"]
        MSWWorker --> Handlers
    end
    
    TanStackQuery <-->|Fetch / Cache| MSWWorker
```

---

## 3. C4 Architecture Level 3: Component Interaction Matrix

The Component diagram maps the discovered AST dependencies between UI components, state stores, and query hooks.

```mermaid
flowchart LR
    subgraph Routes ["Pages & Routing"]
        Route_0["/ (layout.tsx)"]
        Route_1["/ (page.tsx)"]
    end

    subgraph Queries ["TanStack Query Hooks"]
        Query_0["useProductData
(useProductData, useReviewsData, usePreorderMutation)"]
    end

    subgraph Stores ["Zustand Stores"]
        Store_0["useProductStore
(COLORWAYS, useProductStore)"]
    end

    subgraph UIComponents ["Atomic UI Primitives"]
        UI_0["Accordion
(AccordionItem, Accordion)"]
        UI_1["Badge
(Badge)"]
        UI_2["Button
(Button)"]
        UI_3["Card
(Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)"]
        UI_4["Input
(Input)"]
        UI_5["Modal
(Modal)"]
        UI_6["StarRating
(StarRating)"]
        UI_7["TrustBadgeBar
(TrustBadgeBar)"]
    end

    subgraph Mocks ["MSW Mock Handlers"]
        Mock_0["browser"]
        Mock_1["handlers"]
        Mock_2["server"]
    end

    Route_0 --> UIComponents
    Route_0 --> Stores
    Route_0 --> Queries
    Queries --> Mocks
```

---

## 4. AST-Extracted Component & Module Inventory

Summary of auto-discovered source modules:
- **Total Source Files Analyzed:** `95`
- **Application Routes:** `2`
- **State Stores:** `1`
- **Query Hooks:** `1`
- **Atomic UI Primitives:** `8`

### Module Breakdown Table

| Category | File Path | Exported Symbols | Key Dependencies |
| :--- | :--- | :--- | :--- |
| **Route** | `src/app/layout.tsx` | `metadata, RootLayout` | `none` |
| **Route** | `src/app/page.tsx` | `HomePage` | `@/components/presentation/Navbar, @/components/presentation/HeroSection, @/components/presentation/SoundExperience, @/components/presentation/AcousticBento, @/components/presentation/ColorStudio, @/components/presentation/TechnicalSpecs, @/components/presentation/ReviewsSection, @/components/presentation/FAQSection, @/components/presentation/Footer, @/components/presentation/CheckoutDrawer` |
| **Store** | `src/stores/useProductStore.ts` | `COLORWAYS, useProductStore` | `zustand` |
| **Query** | `src/hooks/queries/useProductData.ts` | `useProductData, useReviewsData, usePreorderMutation` | `@tanstack/react-query, @/mocks/handlers` |
| **UI Primitive** | `src/components/ui/Accordion.tsx` | `AccordionItem, Accordion` | `react, lucide-react` |
| **UI Primitive** | `src/components/ui/Badge.tsx` | `badgeVariants, Badge` | `react, class-variance-authority, @/lib/utils` |
| **UI Primitive** | `src/components/ui/Button.tsx` | `buttonVariants, Button` | `react, class-variance-authority, @/lib/utils` |
| **UI Primitive** | `src/components/ui/Card.tsx` | `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter` | `react, @/lib/utils` |
| **UI Primitive** | `src/components/ui/Input.tsx` | `Input` | `react, @/lib/utils` |
| **UI Primitive** | `src/components/ui/Modal.tsx` | `Modal` | `react, lucide-react, @/lib/utils, ./Button` |
| **UI Primitive** | `src/components/ui/StarRating.tsx` | `StarRating` | `react, lucide-react` |
| **UI Primitive** | `src/components/ui/TrustBadgeBar.tsx` | `TrustBadgeBar` | `react, lucide-react` |
| **Mock / Network** | `src/mocks/browser.ts` | `worker` | `msw` |
| **Mock / Network** | `src/mocks/handlers.ts` | `mockProductData, mockReviewsData, handlers` | `msw` |
| **Mock / Network** | `src/mocks/server.ts` | `server` | `msw` |

---

## 5. Architectural Quality Attributes

1. **Deterministic Test Isolation:** Tests execute with MSW intercepting all network activity, eliminating flaky external dependencies.
2. **Predictable State Mutations:** All client UI preferences and state transitions are centralized in Zustand with full test reset capability.
3. **Atomic Component Encapsulation:** All UI elements are built with `class-variance-authority` and strict ARIA accessibility standards.
4. **Living Documentation Enforcement:** The 7-Gateway Quality Engine verifies that this document reflects current codebase reality on every commit.
