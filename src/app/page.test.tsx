import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './page';
import { useProductStore } from '@/stores/useProductStore';

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('RoH Sound HomePage Single Page Presentation', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders all product presentation sections seamlessly', () => {
    renderWithClient(<HomePage />);

    // Brand and Hero
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Pure Acoustic/i);

    // Sound Lab Section
    expect(screen.getByText(/Interactive Sound Lab/i)).toBeInTheDocument();

    // Engineering Bento Section
    expect(screen.getAllByText(/45mm Custom Graphene Driver/i).length).toBeGreaterThan(0);

    // Color Studio Section
    expect(screen.getByText(/Four Iconic Finishes/i)).toBeInTheDocument();

    // Technical Specs Section
    expect(screen.getByText(/Technical Architecture/i)).toBeInTheDocument();

    // Reviews Section
    expect(screen.getByText(/Verified Audiophile Feedback/i)).toBeInTheDocument();

    // FAQ Section
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();

    // Footer
    expect(screen.getAllByText(/Pure Acoustic Architecture/i).length).toBeGreaterThan(0);
  });
});
