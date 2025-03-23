import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

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

describe('RootLayout Component', () => {
  it('renders the layout correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Child</div>
      </RootLayout>
    );

    expect(screen.getByLabelText('Home Layout')).toBeInTheDocument();
  });

  it('renders the navigation bar', () => {
    render(<RootLayout />);
    expect(screen.getByTestId('app-navbar')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<RootLayout />);
    expect(screen.getByTestId('app-footer')).toBeInTheDocument();
  });

  it('renders children inside AppBody', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Child</div>
      </RootLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});
