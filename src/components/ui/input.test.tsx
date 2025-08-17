import { render, screen } from '@testing-library/react';

import { Input } from './input';

describe('Given Input component', () => {
  it('renders an input element', () => {
    render(<Input type="text" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('applies default classes', () => {
    render(<Input type="text" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toMatch(/flex h-9 w-full/); // just checking for a key default class
  });

  it('merges additional className prop', () => {
    render(<Input type="text" className="custom-class" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input.className).toMatch(/custom-class/);
  });

  it('forwards props correctly', () => {
    render(
      <Input
        type="password"
        placeholder="Password"
        disabled
        data-testid="input"
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('placeholder', 'Password');
    expect(input).toBeDisabled();
  });
});
