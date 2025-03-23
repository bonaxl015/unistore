import { render, screen } from '@testing-library/react';

import AppBody from '.';

const MockChild = () => <div data-testid="mock-child">Mock Child</div>;

describe('Given AppBody component', () => {
  it('should render the component without issues', () => {
    render(
      <AppBody>
        <MockChild />
      </AppBody>
    );

    expect(screen.getByLabelText('App Body')).toBeInTheDocument();
    expect(screen.getByTestId('mock-child')).toBeInTheDocument();
  });
});
