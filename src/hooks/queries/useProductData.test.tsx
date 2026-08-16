import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductData, useReviewsData, usePreorderMutation } from './useProductData';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return function QueryWrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useProductData & useReviewsData', () => {
  it('fetches RoH Sound product specifications successfully', async () => {
    const { result } = renderHook(() => useProductData({ retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.name).toBe('RoH Sound');
    expect(result.current.data?.price).toBe(399);
    expect(result.current.data?.inStock).toBe(true);
  });

  it('fetches customer reviews successfully', async () => {
    const { result } = renderHook(() => useReviewsData({ retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(Array.isArray(result.current.data)).toBe(true);
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0].author).toBe('Elena Rostova');
  });

  it('handles API error states gracefully', async () => {
    server.use(
      http.get('/api/product', () => {
        return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
      })
    );

    const { result } = renderHook(() => useProductData({ retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain('Failed to fetch RoH Sound product data');
  });

  it('submits preorder reservation successfully', async () => {
    const { result } = renderHook(() => usePreorderMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      colorway: 'midnight',
      quantity: 1,
      engraving: 'ROH SPECIAL',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.success).toBe(true);
    expect(result.current.data?.reservationCode).toMatch(/^ROH-\d+/);
  });
});
