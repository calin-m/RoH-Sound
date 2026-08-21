import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PreorderForm } from './PreorderForm';

describe('PreorderForm', () => {
  it('renders input fields, pricing CTA, and handles submission', () => {
    const onSubmitMock = vi.fn((e) => e.preventDefault());
    const onNameChangeMock = vi.fn();
    const onEmailChangeMock = vi.fn();

    render(
      <PreorderForm
        customerName="Jane Doe"
        customerEmail="jane@studio.com"
        onNameChange={onNameChangeMock}
        onEmailChange={onEmailChangeMock}
        onSubmit={onSubmitMock}
        isPending={false}
        totalPrice={448}
      />
    );

    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@studio.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reserve for \$448/i })).toBeInTheDocument();

    fireEvent.submit(screen.getByTestId('preorder-form'));
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('renders spinning loader and disables submission when isPending is true', () => {
    render(
      <PreorderForm
        customerName="Jane Doe"
        customerEmail="jane@studio.com"
        onNameChange={vi.fn()}
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        isPending={true}
        totalPrice={399}
      />
    );

    expect(screen.getByText(/Reserving Serial Number\.\.\./i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders error alert banner when error message is supplied', () => {
    render(
      <PreorderForm
        customerName="Jane Doe"
        customerEmail="jane@studio.com"
        onNameChange={vi.fn()}
        onEmailChange={vi.fn()}
        onSubmit={vi.fn()}
        isPending={false}
        error="Reservation failed. Please check network connection."
        totalPrice={399}
      />
    );

    expect(screen.getByText(/Reservation failed\. Please check network connection\./i)).toBeInTheDocument();
  });

  it('triggers onNameChange and onEmailChange on user typing', () => {
    const onNameChangeMock = vi.fn();
    const onEmailChangeMock = vi.fn();

    render(
      <PreorderForm
        customerName=""
        customerEmail=""
        onNameChange={onNameChangeMock}
        onEmailChange={onEmailChangeMock}
        onSubmit={vi.fn()}
        isPending={false}
        totalPrice={399}
      />
    );

    const nameInput = screen.getByPlaceholderText('Jane Doe');
    fireEvent.change(nameInput, { target: { value: 'Alex Audio' } });
    expect(onNameChangeMock).toHaveBeenCalledWith('Alex Audio');

    const emailInput = screen.getByPlaceholderText('jane@studio.com');
    fireEvent.change(emailInput, { target: { value: 'alex@mastering.com' } });
    expect(onEmailChangeMock).toHaveBeenCalledWith('alex@mastering.com');

    // Button should be disabled when fields are empty
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
