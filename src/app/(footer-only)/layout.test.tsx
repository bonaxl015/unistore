import { render, screen } from '@testing-library/react';

import FooterOnlyLayout from './layout';

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

describe('FooterOnlyLayout Component', () => {
  it('renders the footer', () => {
    render(<FooterOnlyLayout />);
    expect(screen.getByTestId('app-footer')).toBeInTheDocument();
  });

  it('renders children inside AppBody', () => {
    render(
      <FooterOnlyLayout>
        <div data-testid="test-child">Test Child</div>
      </FooterOnlyLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});
