import { render, screen } from '@testing-library/react';

import NoHeaderAndFooterLayout from './layout';

jest.mock(
  '@/components/AppBody',
  () =>
    ({ children }: { children: React.ReactNode }) => (
      <main data-testid="app-body">{children}</main>
    )
);

describe('NoHeaderAndFooterLayout Component', () => {
  it('renders children inside AppBody', () => {
    render(
      <NoHeaderAndFooterLayout>
        <div data-testid="test-child">Test Child</div>
      </NoHeaderAndFooterLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toContainElement(
      screen.getByTestId('test-child')
    );
  });
});
