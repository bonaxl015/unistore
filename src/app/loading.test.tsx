import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('Given Loading component', () => {
  it('should render the component without issues', () => {
    render(<Loading />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
