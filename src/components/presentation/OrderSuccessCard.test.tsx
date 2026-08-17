import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
