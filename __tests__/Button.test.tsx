import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-buffer-green');
  });
  
  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('border-deep-field');
  });
  
  it('renders with race variant', () => {
    render(<Button variant="race">Race</Button>);
    const button = screen.getByRole('button', { name: /race/i });
    expect(button).toHaveClass('bg-race-orange');
  });
});
