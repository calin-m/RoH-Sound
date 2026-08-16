import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('renders correct number of stars and sets aria-label', () => {
    render(<StarRating rating={4} maxRating={5} />);
    const container = screen.getByTestId('star-rating');
    expect(container).toHaveAttribute('aria-label', 'Rating: 4 out of 5 stars');
  });

  it('handles custom size and classes', () => {
    render(<StarRating rating={5} size="lg" className="custom-star" />);
    const container = screen.getByTestId('star-rating');
    expect(container).toHaveClass('custom-star');
  });
});
