import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaggerGroup } from './StaggerGroup';

describe('StaggerGroup', () => {
  it('renders all staggered children sequentially', () => {
    render(
      <StaggerGroup staggerInterval={50}>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </StaggerGroup>
    );

    expect(screen.getByTestId('stagger-group')).toBeInTheDocument();
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });
});
