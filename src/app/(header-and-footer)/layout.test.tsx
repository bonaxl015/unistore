import { render, screen } from '@testing-library/react';

import HeaderAndFooterLayout from './layout';

jest.mock('@/components/AppNavBar', () => () => (
  <nav data-testid="app-navbar" />
));
jest.mock(
  '@/components/AppBody',
  () =>
    ({ children }: { children: React.ReactNode }) => (
      <main data-testid="app-body">{children}</main>
    )
);
jest.mock('@/components/AppFooter', () => () => (
  <footer data-testid="app-footer" />
));

describe('HeaderAndFooterLayout Component', () => {
  it('renders the navigation bar', () => {
    render(<HeaderAndFooterLayout />);
    expect(screen.getByTestId('app-navbar')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<HeaderAndFooterLayout />);
    expect(screen.getByTestId('app-footer')).toBeInTheDocument();
  });

  it('renders children inside AppBody', () => {
    render(
      <HeaderAndFooterLayout>
        <div data-testid="test-child">Test Child</div>
      </HeaderAndFooterLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});
