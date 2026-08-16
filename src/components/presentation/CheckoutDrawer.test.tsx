import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutDrawer } from './CheckoutDrawer';
import { useProductStore } from '@/stores/useProductStore';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('CheckoutDrawer', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('renders nothing when drawer is closed', () => {
    const { container } = renderWithClient(<CheckoutDrawer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders order form and allows customizing colorway, engraving, and warranty when open', () => {
    useProductStore.getState().setDrawerOpen(true);
    renderWithClient(<CheckoutDrawer />);

    expect(screen.getByText(/Pre-Order RoH Sound/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority Atelier Batch 01/i)).toBeInTheDocument();

    // Laser Engraving Sub-component
    const engravingInput = screen.getByPlaceholderText(/e\.g\. MASTERING LAB 01/i);
    fireEvent.change(engravingInput, { target: { value: 'STUDIO A' } });
    expect(useProductStore.getState().engravingText).toBe('STUDIO A');

    // Extended warranty option
    const warrantyOption = screen.getByText(/5-Year Extended Audiophile Care/i);
    fireEvent.click(warrantyOption);
    expect(useProductStore.getState().hasExtendedWarranty).toBe(true);

    // Colorway selection sub-component in pill mode
    const emeraldBtn = screen.getByRole('button', { name: /Switch to Forest Emerald/i });
    fireEvent.click(emeraldBtn);
    expect(useProductStore.getState().selectedColor).toBe('emerald');

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close drawer/i });
    fireEvent.click(closeBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(false);
  });

  it('submits preorder and displays confirmation code', async () => {
    useProductStore.getState().setDrawerOpen(true);
    renderWithClient(<CheckoutDrawer />);

    // Fill required customer details
    const nameInput = screen.getByPlaceholderText('Jane Doe');
    fireEvent.change(nameInput, { target: { value: 'Alexander Vance' } });

    const emailInput = screen.getByPlaceholderText('jane@studio.com');
    fireEvent.change(emailInput, { target: { value: 'alexander@studio.com' } });

    const submitBtn = screen.getByRole('button', { name: /Reserve for/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Priority Reservation Confirmed/i)).toBeInTheDocument();
      expect(screen.getByText(/Reservation Code:/i)).toBeInTheDocument();
    });

    const returnBtn = screen.getByRole('button', { name: /Return to Sound Stage/i });
    fireEvent.click(returnBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(false);
  });

  it('displays error banner when preorder API fails', async () => {
    server.use(
      http.post('/api/order/preorder', () => {
        return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
      })
    );

    useProductStore.getState().setDrawerOpen(true);
    renderWithClient(<CheckoutDrawer />);

    const nameInput = screen.getByPlaceholderText('Jane Doe');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    const emailInput = screen.getByPlaceholderText('jane@studio.com');
    fireEvent.change(emailInput, { target: { value: 'jane@studio.com' } });

    const submitBtn = screen.getByRole('button', { name: /Reserve for/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Unable to submit reservation/i)).toBeInTheDocument();
    });
  });
});
