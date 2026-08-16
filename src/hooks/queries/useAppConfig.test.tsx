import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';
import { useAppConfig, fetchAppConfig } from './useAppConfig';

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

describe('useAppConfig hook', () => {
  it('fetches app config data successfully via MSW', async () => {
    const { result } = renderHook(() => useAppConfig(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.features.analytics).toBe(true);
    expect(result.current.data?.limits.maxRequestsPerMinute).toBe(120);
  });

  it('handles error in fetchAppConfig', async () => {
    server.use(
      http.get('/api/app-config', () => {
        return new HttpResponse(null, { status: 503, statusText: 'Service Unavailable' });
      })
    );

    await expect(fetchAppConfig()).rejects.toThrow('Failed to fetch app config: Service Unavailable');
  });
});
