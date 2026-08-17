import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';
import { ReviewItem } from '@/mocks/handlers';

const mockReview: ReviewItem = {
  id: 'rev-1',
  author: 'Customer 1',
  role: 'Verified Buyer • Studio Engineer',
  rating: 5,
  title: 'Astonishing Clarity',
  comment: 'The transient speed and stereo imaging surpass dynamic cans costing twice as much.',
  verified: true,
  date: 'August 2026',
  avatarBg: 'bg-zinc-800',
};

describe('ReviewCard', () => {
  it('renders author, role, verified badge, and comment', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Verified Buyer • Studio Engineer')).toBeInTheDocument();
    expect(screen.getByText(/transient speed/i)).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('August 2026')).toBeInTheDocument();
  });
});
