import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card primitive', () => {
  it('renders complete card component structure', () => {
    render(
      <Card data-testid="card-root">
        <CardHeader>
          <CardTitle>Enterprise System</CardTitle>
          <CardDescription>Overview of services</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content area</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('card-root')).toBeInTheDocument();
    expect(screen.getByText('Enterprise System')).toBeInTheDocument();
    expect(screen.getByText('Overview of services')).toBeInTheDocument();
    expect(screen.getByText('Main content area')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
