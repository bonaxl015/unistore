import { render, screen } from '@testing-library/react';

import UnauthorizedPage, { metadata } from './page';

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

describe('Given UnauthorizedPage', () => {
  it('should export correct metadata', () => {
    expect(metadata.title).toBe('Unauthorized Access');
  });

  it('renders the heading', () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getByRole('heading', { name: /unauthorized access/i })
    ).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getByText(/you do not have permission to access this page/i)
    ).toBeInTheDocument();
  });

  it('renders a button link to home', () => {
    render(<UnauthorizedPage />);
    const link = screen.getByRole('link', { name: /return home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
