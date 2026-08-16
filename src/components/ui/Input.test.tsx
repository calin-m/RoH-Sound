import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input primitive', () => {
  it('renders input with label and helper text', () => {
    render(
      <Input
        label="Username"
        helperText="Enter your corporate ID"
        placeholder="e.g. user123"
      />
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. user123')).toBeInTheDocument();
    expect(screen.getByText('Enter your corporate ID')).toBeInTheDocument();
  });

  it('renders error state correctly with aria attributes', () => {
    render(
      <Input
        label="Email"
        error="Invalid email address"
        defaultValue="bad-email"
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email address');
  });

  it('handles typing and onChange events', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'New text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('New text');
  });
});
