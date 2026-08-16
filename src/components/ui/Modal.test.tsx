import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal primitive', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal dialog with title, description, body, and footer when isOpen is true', () => {
    const handleClose = vi.fn();
    render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        title="Diagnostic Details"
        description="System health telemetry"
        footer={<button onClick={handleClose}>Confirm</button>}
      >
        <p>Telemetry metrics active</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Diagnostic Details')).toBeInTheDocument();
    expect(screen.getByText('System health telemetry')).toBeInTheDocument();
    expect(screen.getByText('Telemetry metrics active')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop, but not when clicking modal content', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Content</p>
      </Modal>
    );

    // Clicking content does not trigger onClose
    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(handleClose).not.toHaveBeenCalled();

    // Clicking backdrop triggers onClose
    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed, but ignores other keys', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Dialog">
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(handleClose).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
