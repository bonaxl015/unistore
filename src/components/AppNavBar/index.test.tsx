import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import React from 'react';

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

jest.mock('./navigation-links', () => () => (
  <div data-testid="mock-navigation-links">Mock Navigation Links</div>
));

describe('Given AppNavbar component', () => {
  it('renders the brand name', () => {
    render(<AppNavbar />);
    expect(screen.getByText('Unistore')).toBeInTheDocument();
    expect(screen.getByTestId('mock-navigation-links')).toBeInTheDocument();
  });
});
