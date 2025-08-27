import { render, screen } from '@testing-library/react';

import HeaderOnlyLayout from './layout';

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

describe('HeaderOnlyLayout Component', () => {
  it('renders the navigation bar', () => {
    render(<HeaderOnlyLayout />);
    expect(screen.getByTestId('app-navbar')).toBeInTheDocument();
  });

  it('renders children inside AppBody', () => {
    render(
      <HeaderOnlyLayout>
        <div data-testid="test-child">Test Child</div>
      </HeaderOnlyLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});
