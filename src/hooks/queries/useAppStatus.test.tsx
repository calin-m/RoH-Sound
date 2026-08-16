import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { useAppStatus, fetchAppStatus } from './useAppStatus';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useAppStatus hook', () => {
  it('fetches status data successfully via MSW', async () => {
    const { result } = renderHook(() => useAppStatus({ retry: false }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.status).toBe('healthy');
    expect(result.current.data?.version).toBe('1.0.0');
    expect(result.current.data?.services.database).toBe('connected');
  });

  it('handles server error response correctly', async () => {
    server.use(
      http.get('/api/status', () => {
        return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
      })
    );

    const { result } = renderHook(() => useAppStatus({ retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain('Failed to fetch app status');
  });

  it('fetchAppStatus function throws when response is not ok', async () => {
    server.use(
      http.get('/api/status', () => {
        return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
      })
    );

    await expect(fetchAppStatus()).rejects.toThrow('Failed to fetch app status: Not Found');
  });
});
