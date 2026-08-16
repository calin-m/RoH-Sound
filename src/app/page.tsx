'use client';

import * as React from 'react';
import {
  CheckCircle2,
  Layers,
  Moon,
  RefreshCw,
  Server,
  ShieldCheck,
  Sun,
  Sliders,
  Bell,
  Sidebar as SidebarIcon,
  Terminal,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useAppStore } from '@/stores/useAppStore';
import { useAppStatus } from '@/hooks/queries/useAppStatus';
import { useAppConfig } from '@/hooks/queries/useAppConfig';

export default function Home() {
  const {
    themeMode,
    sidebarOpen,
    notificationsEnabled,
    activeModal,
    searchQuery,
    setThemeMode,
    toggleSidebar,
    setNotificationsEnabled,
    openModal,
    closeModal,
    setSearchQuery,
    resetStore,
  } = useAppStore();

  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError: isStatusError,
    refetch: refetchStatus,
    isFetching: isStatusFetching,
  } = useAppStatus();

  const { data: configData, isLoading: isConfigLoading } = useAppConfig();

  const [testInputVal, setTestInputVal] = React.useState('');
  const [hasInputError, setHasInputError] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Enterprise Foundation</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Closed-Loop Quality & Living Docs</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {isStatusLoading ? (
            <Badge variant="outline" className="animate-pulse">Checking Status...</Badge>
          ) : isStatusError ? (
            <Badge variant="destructive">Status Error</Badge>
          ) : (
            <Badge variant="success" className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              {statusData?.status.toUpperCase()} v{statusData?.version}
            </Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <SidebarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{sidebarOpen ? 'Sidebar Open' : 'Sidebar Collapsed'}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Theme"
          >
            {themeMode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Hero Section */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs font-mono">Next.js 15 • MSW v2 • Zustand • Vitest</Badge>
              <Badge variant="outline" className="text-xs">7-Gateway Quality Engine</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Domain-Agnostic Enterprise Foundation
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Autonomous, production-ready canvas engineered for enterprise resilience. Validated by closed-loop AST introspection, automated C4 architectural diagram generation, and strict 7-Gateway quality enforcement.
            </p>
          </div>
        </section>

        {/* Core Architecture Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Network & Mocking Layer */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Server className="h-4 w-4 text-blue-500" />
                  Network Layer (MSW v2)
                </CardTitle>
                <Badge variant={statusData ? 'success' : 'outline'}>
                  {isStatusFetching ? 'Polling...' : 'Mock Active'}
                </Badge>
              </div>
              <CardDescription>
                Deterministic client/server network isolation with simulated latency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-950 p-3 text-xs font-mono space-y-1.5 border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Endpoint:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">GET /api/status</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Environment:</span>
                  <span>{statusData?.environment || 'loading...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Uptime:</span>
                  <span>{statusData ? `${statusData.uptimeSeconds}s` : '...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Database:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{statusData?.services.database || '...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cache:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{statusData?.services.cache || '...'}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => refetchStatus()}
                isLoading={isStatusFetching}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refetch Network Status
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: State Layer */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sliders className="h-4 w-4 text-purple-500" />
                  State Layer (Zustand)
                </CardTitle>
                <Badge variant="outline">Client Store</Badge>
              </div>
              <CardDescription>
                Predictable client store with atomic selectors and test reset utility.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">Theme Mode:</span>
                  <div className="flex gap-1">
                    {(['system', 'light', 'dark'] as const).map((mode) => (
                      <Button
                        key={mode}
                        variant={themeMode === mode ? 'default' : 'outline'}
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => setThemeMode(mode)}
                      >
                        {mode}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Notifications:</span>
                  <Button
                    variant={notificationsEnabled ? 'secondary' : 'outline'}
                    size="sm"
                    className="h-6 px-2 text-xs gap-1"
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    <Bell className="h-3 w-3" />
                    {notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <Input
                  placeholder="Type search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 text-xs mt-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                onClick={resetStore}
              >
                Reset Store State
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Quality & Governance */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  7-Gateway Verification
                </CardTitle>
                <Badge variant="success">Pass 0.5 → 7</Badge>
              </div>
              <CardDescription>
                Automated continuous verification gatekeeper with AST sync.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 0.5: Secret Scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 1: TypeScript Strict Typecheck</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 2 & 3: Vitest MSW & UI (≥ 85% cov)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 4: Living C4 & Quality Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 5: ADR Ledger Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 6: ESLint & Knip Dead-Code Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Pass 7: Next.js Production Build</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-mono"
                onClick={() => openModal('verify-info')}
              >
                <Terminal className="h-3.5 w-3.5" />
                View Gateway Guide
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Atomic UI Primitives Demo Showcase */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Atomic Component Canvas</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Showcase of type-safe, accessible atomic design primitives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Buttons & Modal Trigger */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Buttons & Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="default" size="sm" isLoading>Loading</Button>
              </div>
              <div className="pt-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => openModal('system-diagnostics')}
                >
                  <Zap className="h-4 w-4" />
                  Launch Diagnostics Modal
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Badges & Statuses</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300">Feature Flags (Config API):</p>
                <p className="text-zinc-500">
                  Analytics: {isConfigLoading ? '...' : configData?.features.analytics ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-zinc-500">
                  Live Monitoring: {isConfigLoading ? '...' : configData?.features.liveMonitoring ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            {/* Inputs & Validation */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Inputs & Form Controls</h4>
              <Input
                label="Enterprise Input Field"
                placeholder="Enter sample payload..."
                value={testInputVal}
                onChange={(e) => {
                  setTestInputVal(e.target.value);
                  if (hasInputError && e.target.value.length >= 3) {
                    setHasInputError(false);
                  }
                }}
                error={hasInputError ? 'Payload requires at least 3 characters' : undefined}
                helperText={!hasInputError ? 'Validates payload structure on submit.' : undefined}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (testInputVal.length < 3) {
                    setHasInputError(true);
                  } else {
                    setHasInputError(false);
                  }
                }}
              >
                Validate Input State
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Diagnostics Modal */}
      <Modal
        isOpen={activeModal === 'system-diagnostics'}
        onClose={closeModal}
        title="System Diagnostics & Architecture"
        description="Live telemetry inspection and runtime state validation."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeModal}>
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                refetchStatus();
                closeModal();
              }}
            >
              Sync & Dismiss
            </Button>
          </>
        }
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <p className="text-zinc-500 font-semibold">Live Store State</p>
            <p>Theme: {themeMode}</p>
            <p>Sidebar: {sidebarOpen ? 'Open' : 'Closed'}</p>
            <p>Notifications: {notificationsEnabled ? 'Active' : 'Muted'}</p>
            <p>Search Query: {searchQuery || '""'}</p>
          </div>
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <p className="text-zinc-500 font-semibold">MSW Network Health</p>
            <p>Status: {statusData?.status || 'Unknown'}</p>
            <p>Version: {statusData?.version || '1.0.0'}</p>
            <p>Uptime: {statusData?.uptimeSeconds || 0} seconds</p>
          </div>
        </div>
      </Modal>

      {/* Verify Info Modal */}
      <Modal
        isOpen={activeModal === 'verify-info'}
        onClose={closeModal}
        title="7-Gateway Quality Engine Protocol"
        description="The multi-stage gatekeeper executing before every commit."
        footer={
          <Button variant="default" size="sm" onClick={closeModal}>
            Understood
          </Button>
        }
      >
        <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
          <p>
            Run <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-zinc-900 dark:text-zinc-200">npm run verify</code> to execute the full 7-stage verification suite:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Pass 0.5:</strong> Pre-commit secret scanning</li>
            <li><strong>Pass 1:</strong> TypeScript strict typecheck</li>
            <li><strong>Pass 2 & 3:</strong> Vitest unit and integration suites (≥ 85% coverage)</li>
            <li><strong>Pass 4:</strong> AST architecture matrix and quality report sync</li>
            <li><strong>Pass 5:</strong> Architecture Decision Record (ADR) ledger validation</li>
            <li><strong>Pass 6:</strong> ESLint & Knip dead-code audit</li>
            <li><strong>Pass 7:</strong> Production Next.js compiler build</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
