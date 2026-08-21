import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText(/Customer 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer 3/i)).toBeInTheDocument();
  });

  it('expands all reviews on clicking Show All Reviews and collapses on Show Less', async () => {
    renderWithQueryClient(<ReviewsSection />);
    const showAllBtn = await screen.findByRole('button', { name: /Show All Reviews/i });
    expect(showAllBtn).toBeInTheDocument();

    // Customer 4 should initially be hidden (progressive disclosure)
    expect(screen.queryByText(/Customer 4/i)).not.toBeInTheDocument();

    // Click Show All
    fireEvent.click(showAllBtn);
    expect(screen.getByText(/Customer 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer 6/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show Less/i })).toBeInTheDocument();

    // Click Show Less
    fireEvent.click(screen.getByRole('button', { name: /Show Less/i }));
    expect(screen.queryByText(/Customer 4/i)).not.toBeInTheDocument();
  });

  it('filters reviews by star rating', async () => {
    renderWithQueryClient(<ReviewsSection />);
    await screen.findByText(/Customer 1/i);

    const fourStarBtn = screen.getByRole('button', { name: /4 Stars/i });
    fireEvent.click(fourStarBtn);

    // Customer 5 has rating 4
    expect(screen.getByText(/Customer 5/i)).toBeInTheDocument();
    expect(screen.queryByText(/Customer 1/i)).not.toBeInTheDocument();

    const fiveStarBtn = screen.getByRole('button', { name: /5 Stars/i });
    fireEvent.click(fiveStarBtn);

    expect(screen.getByText(/Customer 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Customer 5/i)).not.toBeInTheDocument();

    // Reset back to All Reviews
    const allBtn = screen.getByRole('button', { name: /^All Reviews/i });
    fireEvent.click(allBtn);
    expect(screen.getByText(/Customer 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer 2/i)).toBeInTheDocument();
  });
});
