import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AcousticBento } from './AcousticBento';

describe('AcousticBento', () => {
  it('renders all bento engineering highlight cards', () => {
    render(<AcousticBento />);
    expect(screen.getByText(/45mm Custom Graphene Driver/i)).toBeInTheDocument();
    expect(screen.getByText(/H1 Neural DSP/i)).toBeInTheDocument();
    expect(screen.getByText(/65 Hours Playback/i)).toBeInTheDocument();
    expect(screen.getByText(/Bluetooth 5.4 LDAC/i)).toBeInTheDocument();
    expect(screen.getByText(/240g Featherweight/i)).toBeInTheDocument();
  });
});
