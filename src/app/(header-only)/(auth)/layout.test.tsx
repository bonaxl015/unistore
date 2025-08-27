import { render, screen } from '@testing-library/react';

import AuthLayout from './layout';

describe('Given Layout component', () => {
  it('renders children correctly', () => {
    render(
      <AuthLayout>
        <div data-testid="child">Hello World</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello World');
  });

  it('applies correct container classes', () => {
    const { container } = render(
      <AuthLayout>
        <span>Child</span>
      </AuthLayout>
    );

    expect(container.firstChild).toHaveClass('flex-center');
    expect(container.firstChild).toHaveClass('min-h-screen');
    expect(container.firstChild).toHaveClass('w-full');
  });
});
