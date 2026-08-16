import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion, AccordionItem } from './Accordion';

const TestAccordionComponent = () => {
  const [openId, setOpenId] = useState<string | null>('item-1');

  return (
    <Accordion>
      <AccordionItem
        id="item-1"
        title="Question 1"
        isOpen={openId === 'item-1'}
        onToggle={() => setOpenId(openId === 'item-1' ? null : 'item-1')}
      >
        Answer 1
      </AccordionItem>
      <AccordionItem
        id="item-2"
        title="Question 2"
        isOpen={openId === 'item-2'}
        onToggle={() => setOpenId(openId === 'item-2' ? null : 'item-2')}
      >
        Answer 2
      </AccordionItem>
    </Accordion>
  );
};

describe('Accordion & AccordionItem', () => {
  it('renders accordion items and handles toggle expansions', () => {
    render(<TestAccordionComponent />);

    const header1 = screen.getByRole('button', { name: /Question 1/i });
    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Answer 1')).toBeInTheDocument();

    const header2 = screen.getByRole('button', { name: /Question 2/i });
    expect(header2).toHaveAttribute('aria-expanded', 'false');

    // Click to toggle second item
    fireEvent.click(header2);
    expect(header2).toHaveAttribute('aria-expanded', 'true');
    expect(header1).toHaveAttribute('aria-expanded', 'false');
  });
});
