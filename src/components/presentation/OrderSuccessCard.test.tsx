import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderSuccessCard } from './OrderSuccessCard';

describe('OrderSuccessCard', () => {
  it('renders confirmation details, reservation code, finish, and engraving', () => {
    render(
      <OrderSuccessCard
        customerName="Julian"
        reservationCode="ROH-9921"
        selectedColor="midnight"
        engravingText="MASTERING"
        hasExtendedWarranty={true}
        estimatedShipDate="October 15, 2026"
      />
    );

    expect(screen.getByText('Priority Reservation Confirmed')).toBeInTheDocument();
    expect(screen.getByText('Julian')).toBeInTheDocument();
    expect(screen.getByText('ROH-9921')).toBeInTheDocument();
    expect(screen.getByText('midnight')).toBeInTheDocument();
    expect(screen.getByText('“MASTERING”')).toBeInTheDocument();
    expect(screen.getByText('5 Years Extended')).toBeInTheDocument();
    expect(screen.getByText('October 15, 2026')).toBeInTheDocument();
  });

  it('allows copying the reservation code to clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <OrderSuccessCard
        customerName="Julian"
        reservationCode="ROH-9921"
        selectedColor="midnight"
        hasExtendedWarranty={false}
        estimatedShipDate="October 15, 2026"
      />
    );

    const copyBtn = screen.getByRole('button', { name: /Copy reservation code/i });
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalledWith('ROH-9921');
  });
});
