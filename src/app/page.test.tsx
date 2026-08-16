import * as React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import Home from './page';
import { useAppStore } from '@/stores/useAppStore';

function renderWithProviders() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

describe('Home starter page integration', () => {
  beforeEach(() => {
    useAppStore.getState().resetStore();
  });

  it('renders enterprise header, hero, and core architecture cards', async () => {
    renderWithProviders();

    expect(screen.getByText('Enterprise Foundation')).toBeInTheDocument();
    expect(screen.getByText('Domain-Agnostic Enterprise Foundation')).toBeInTheDocument();
    expect(screen.getByText('Network Layer (MSW v2)')).toBeInTheDocument();
    expect(screen.getByText('State Layer (Zustand)')).toBeInTheDocument();
    expect(screen.getByText('7-Gateway Verification')).toBeInTheDocument();
  });

  it('loads and renders MSW network status', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/HEALTHY v1.0.0/i)).toBeInTheDocument();
    });

    expect(screen.getByText('GET /api/status')).toBeInTheDocument();

    // Trigger refetch button
    const refetchBtn = screen.getByRole('button', {
      name: /refetch network status/i,
    });
    fireEvent.click(refetchBtn);
  });

  it('renders status error badge when API fails', async () => {
    server.use(
      http.get('/api/status', () => {
        return new HttpResponse(null, { status: 500, statusText: 'Internal Error' });
      })
    );

    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Status Error')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('interacts with Zustand state controls (theme, sidebar, notifications, search)', () => {
    renderWithProviders();

    // Toggle theme button in header
    const toggleThemeBtn = screen.getByLabelText('Toggle Theme');
    fireEvent.click(toggleThemeBtn);
    expect(useAppStore.getState().themeMode).toBe('dark');

    // Click theme toggle again when in dark mode
    fireEvent.click(toggleThemeBtn);
    expect(useAppStore.getState().themeMode).toBe('light');

    // Click theme mode buttons in card
    const systemModeBtn = screen.getByRole('button', { name: /^system$/i });
    fireEvent.click(systemModeBtn);
    expect(useAppStore.getState().themeMode).toBe('system');

    // Toggle sidebar
    const toggleSidebarBtn = screen.getByLabelText('Toggle Sidebar');
    fireEvent.click(toggleSidebarBtn);
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    // Toggle notifications button in card
    const notifBtn = screen.getByRole('button', { name: /enabled/i });
    fireEvent.click(notifBtn);
    expect(useAppStore.getState().notificationsEnabled).toBe(false);

    // Search query input
    const searchInput = screen.getByPlaceholderText('Type search query...');
    fireEvent.change(searchInput, { target: { value: 'core enterprise' } });
    expect(useAppStore.getState().searchQuery).toBe('core enterprise');

    // Reset store
    const resetBtn = screen.getByRole('button', { name: /reset store state/i });
    fireEvent.click(resetBtn);
    expect(useAppStore.getState().themeMode).toBe('system');
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('opens and closes diagnostics modal', async () => {
    renderWithProviders();

    const launchModalBtn = screen.getByRole('button', {
      name: /launch diagnostics modal/i,
    });
    fireEvent.click(launchModalBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('System Diagnostics & Architecture')).toBeInTheDocument();

    const dismissBtn = screen.getByRole('button', { name: /sync & dismiss/i });
    fireEvent.click(dismissBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('opens and closes 7-gateway info modal', async () => {
    renderWithProviders();

    const viewGuideBtn = screen.getByRole('button', {
      name: /view gateway guide/i,
    });
    fireEvent.click(viewGuideBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('7-Gateway Quality Engine Protocol')).toBeInTheDocument();

    const understoodBtn = screen.getByRole('button', { name: /understood/i });
    fireEvent.click(understoodBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('validates interactive input field demo', () => {
    renderWithProviders();

    const input = screen.getByLabelText('Enterprise Input Field');
    const validateBtn = screen.getByRole('button', {
      name: /validate input state/i,
    });

    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.click(validateBtn);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Payload requires at least 3 characters'
    );

    fireEvent.change(input, { target: { value: 'valid payload' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    fireEvent.click(validateBtn);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
