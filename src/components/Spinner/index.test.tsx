import { render, screen } from '@testing-library/react';

import Spinner from '.';

describe('Given Spinner component', () => {
  it('should render the component without issues', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
