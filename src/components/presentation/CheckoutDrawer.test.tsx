import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutDrawer } from './CheckoutDrawer';
import { useProductStore } from '@/stores/useProductStore';

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
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

  it('renders order summary and allows customizing engraving and warranty when open', () => {
    useProductStore.getState().setDrawerOpen(true);
    renderWithClient(<CheckoutDrawer />);

    expect(screen.getByText(/Your RoH Sound Pre-Order/i)).toBeInTheDocument();
    expect(screen.getByText(/RoH Sound Flagship/i)).toBeInTheDocument();

    const engravingInput = screen.getByPlaceholderText(/e\.g\. MASTERING LAB 01/i);
    fireEvent.change(engravingInput, { target: { value: 'STUDIO A' } });
    expect(useProductStore.getState().engravingText).toBe('STUDIO A');

    const warrantyOption = screen.getByText(/3-Year RoH Platinum Care/i);
    fireEvent.click(warrantyOption);
    expect(useProductStore.getState().hasExtendedWarranty).toBe(true);

    // Quantity buttons
    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);
    expect(useProductStore.getState().quantity).toBe(2);

    const minusBtn = screen.getByText('-');
    fireEvent.click(minusBtn);
    expect(useProductStore.getState().quantity).toBe(1);

    // Switch colorway inside drawer
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

    const confirmBtn = screen.getByRole('button', { name: /Confirm Priority Pre-Order/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(screen.getByText(/Reservation Confirmed/i)).toBeInTheDocument();
      expect(screen.getByText(/Reservation Code:/i)).toBeInTheDocument();
    });

    const returnBtn = screen.getByRole('button', { name: /Return to Overview/i });
    fireEvent.click(returnBtn);
    expect(useProductStore.getState().isDrawerOpen).toBe(false);
  });
});
