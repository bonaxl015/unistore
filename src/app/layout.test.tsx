import { render, screen } from '@testing-library/react';

import RootLayout from './layout';

describe('RootLayout Component', () => {
  it('renders the layout correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Child</div>
      </RootLayout>
    );

    expect(screen.getByLabelText('Home Layout')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
