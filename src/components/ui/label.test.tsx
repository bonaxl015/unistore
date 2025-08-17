import { render, screen } from '@testing-library/react';

import { Label } from './label';

describe('Given Label component', () => {
  it('renders a label element', () => {
    render(<Label htmlFor="username">Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('label');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('applies default classes', () => {
    render(<Label htmlFor="email">Email</Label>);
    const label = screen.getByText('Email');
    expect(label.className).toMatch(/flex items-center gap-2/);
  });

  it('merges custom className', () => {
    render(
      <Label htmlFor="password" className="custom-class">
        Password
      </Label>
    );
    const label = screen.getByText('Password');
    expect(label.className).toMatch(/custom-class/);
  });

  it('forwards other props', () => {
    render(
      <Label htmlFor="checkbox" data-testid="label">
        Accept Terms
      </Label>
    );
    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent('Accept Terms');
    expect(label).toHaveAttribute('for', 'checkbox');
  });
});
