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

  it('renders all 6 curated acoustic FAQ inquiries', () => {
    render(<FAQSection />);
    expect(screen.getByText(/What is included in the 30-day in-home audition\?/i)).toBeInTheDocument();
    expect(screen.getByText(/How does RoH Sound achieve -48dB Active Noise Cancellation\?/i)).toBeInTheDocument();
    expect(screen.getByText(/How does RoH Sound connect to my audio source\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I replace the ear cushions over time\?/i)).toBeInTheDocument();
    expect(screen.getByText(/What is included with my pre-order package\?/i)).toBeInTheDocument();
    expect(screen.getByText(/What warranty is included\?/i)).toBeInTheDocument();
  });

  it('allows opening and closing multiple questions independently', () => {
    render(<FAQSection />);
    const warrantyBtn = screen.getByRole('button', { name: /What warranty is included\?/i });
    
    // Initial state: collapsed
    expect(warrantyBtn).toHaveAttribute('aria-expanded', 'false');

    // Expand
    fireEvent.click(warrantyBtn);
    expect(warrantyBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/3-Year Precision Limited Warranty/i)).toBeInTheDocument();

    // Collapse again
    fireEvent.click(warrantyBtn);
    expect(warrantyBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders custom faqs data when passed as prop', () => {
    const customFaqs = [
      { id: 'custom-1', question: 'How is the custom DAC calibrated?', answer: 'Laser tuned at atelier.' },
    ];
    render(<FAQSection faqs={customFaqs} />);
    expect(screen.getByText('How is the custom DAC calibrated?')).toBeInTheDocument();
    expect(screen.getByText('Laser tuned at atelier.')).toBeInTheDocument();
  });
});
