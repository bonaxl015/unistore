import { render, screen } from '@testing-library/react';

import NotFound from './not-found';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>
}));

jest.mock('@/components/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  )
}));

describe('NotFound Page', () => {
  it('renders the 404 error message', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the correct heading', () => {
    render(<NotFound />);
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<NotFound />);
    expect(
      screen.getByText(
        'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
      )
    ).toBeInTheDocument();
  });

  it('renders the "Return Home" button', () => {
    render(<NotFound />);
    const button = screen.getByRole('button', { name: 'Return Home' });
    expect(button).toBeInTheDocument();
  });

  it('renders the link to the home page', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: 'Return Home' });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the additional message', () => {
    render(<NotFound />);
    expect(
      screen.getByText('Click the button to go back to safety!')
    ).toBeInTheDocument();
  });
});
