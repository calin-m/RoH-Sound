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
});
