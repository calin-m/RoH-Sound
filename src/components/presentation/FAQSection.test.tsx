import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAQSection } from './FAQSection';

describe('FAQSection', () => {
  it('renders FAQ questions and toggles answers on click', () => {
    render(<FAQSection />);
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();

    const firstQuestionBtn = screen.getByRole('button', { name: /What is included in the 30-day in-home audition/i });
    expect(firstQuestionBtn).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(firstQuestionBtn);
    expect(firstQuestionBtn).toHaveAttribute('aria-expanded', 'false');

    // Click to expand second question
    const secondQuestionBtn = screen.getByRole('button', { name: /How does RoH Sound achieve -48dB Active Noise Cancellation/i });
    fireEvent.click(secondQuestionBtn);
    expect(secondQuestionBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/adaptive barometric pressure equalization valve/i)).toBeInTheDocument();
  });
});
