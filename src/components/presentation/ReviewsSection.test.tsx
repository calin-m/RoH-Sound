import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReviewsSection } from './ReviewsSection';

describe('ReviewsSection', () => {
  let queryClient: QueryClient;

  function renderWithQueryClient(ui: React.ReactElement) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  }

  afterEach(() => {
    cleanup();
    if (queryClient) {
      queryClient.clear();
    }
  });

  it('renders verified customer reviews and ratings', async () => {
    renderWithQueryClient(<ReviewsSection />);
    expect(screen.getByText(/^Reviews$/i)).toBeInTheDocument();
    expect(screen.getByText(/4\.9/i)).toBeInTheDocument();
    expect(await screen.findByText(/Customer 1/i)).toBeInTheDocument();
  });
});
