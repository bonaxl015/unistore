import React from 'react';
import { render, screen } from '@testing-library/react';

import { cn } from '@/utils';

import { Button } from '.';

jest.mock('@/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' '))
}));

describe('Button Component', () => {
  beforeEach(() => {
    (cn as jest.Mock).mockClear();
  });

  it('renders with default props', () => {
    render(<Button>Default Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
    expect(screen.getByText('Default Button')).toBeInTheDocument();
    expect(cn).toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
    expect(cn).toHaveBeenCalled();
  });

  it('renders with different variants', () => {
    render(
      <Button data-testid="destructive" variant="destructive">
        Destructive Button
      </Button>
    );
    expect(screen.getByTestId('destructive')).toHaveClass('bg-destructive');

    render(
      <Button data-testid="outline" variant="outline">
        Outline Button
      </Button>
    );
    expect(screen.getByTestId('outline')).toHaveClass('bg-background');

    render(
      <Button data-testid="secondary" variant="secondary">
        Secondary Button
      </Button>
    );
    expect(screen.getByTestId('secondary')).toHaveClass('bg-secondary');

    render(
      <Button data-testid="ghost" variant="ghost">
        Ghost Button
      </Button>
    );
    expect(screen.getByTestId('ghost')).not.toHaveClass('bg-primary');

    render(
      <Button data-testid="link" variant="link">
        Link Button
      </Button>
    );
    expect(screen.getByTestId('link').className).toContain('underline');
  });

  it('renders with different sizes', () => {
    render(
      <Button data-testid="small" size="sm">
        Small Button
      </Button>
    );
    expect(screen.getByTestId('small')).toHaveClass('h-8');

    render(
      <Button data-testid="large" size="lg">
        Large Button
      </Button>
    );
    expect(screen.getByTestId('large')).toHaveClass('h-10');

    render(
      <Button data-testid="icon" size="icon">
        Icon Button
      </Button>
    );
    expect(screen.getByTestId('icon')).toHaveClass('size-9');
  });

  it('renders as a Slot when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('data-slot', 'button');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50');
  });

  it('handles aria-invalid state', () => {
    render(<Button aria-invalid="true">Invalid Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button').className).toContain(
      'aria-invalid:ring-destructive'
    );
  });
});
