import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EngineeringBento } from './EngineeringBento';

describe('EngineeringBento', () => {
  it('renders all bento engineering highlight cards', () => {
    render(<EngineeringBento />);
    expect(screen.getByText(/45mm Custom Graphene Driver/i)).toBeInTheDocument();
    expect(screen.getByText(/H1 Neural DSP/i)).toBeInTheDocument();
    expect(screen.getByText(/65 Hours Playback/i)).toBeInTheDocument();
    expect(screen.getByText(/Bluetooth 5.4 LDAC/i)).toBeInTheDocument();
    expect(screen.getByText(/240g Featherweight/i)).toBeInTheDocument();
  });
});
