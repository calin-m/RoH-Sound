import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReviewsSection } from './ReviewsSection';

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('ReviewsSection', () => {
  it('renders verified customer reviews and ratings', async () => {
    renderWithQueryClient(<ReviewsSection />);
    expect(screen.getByText(/^Reviews$/i)).toBeInTheDocument();
    expect(screen.getByText(/4\.9/i)).toBeInTheDocument();
    expect(await screen.findByText(/Customer 1/i)).toBeInTheDocument();
  });
});
