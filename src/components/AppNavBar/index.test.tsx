import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import React from 'react';

import { navigationLinks } from '@/constants/navigationList';

import AppNavbar from '.';

jest.mock(
  'next/link',
  () =>
    ({ children, href }: { children: ReactNode; href: string }) => (
      <a href={href} data-testid="nav-link">
        {children}
      </a>
    )
);

describe('Given AppNavbar component', () => {
  it('renders the brand name', () => {
    render(<AppNavbar />);
    expect(screen.getByText('Spacebook')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<AppNavbar />);

    navigationLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
      expect(screen.getByText(link.label).parentElement).toHaveAttribute(
        'href',
        link.href
      );
    });
  });

  it('applies correct styles', () => {
    render(<AppNavbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass(
      'w-full bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-lg shadow-md'
    );
  });
});
