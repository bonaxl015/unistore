import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from './page';

describe('Given Home page', () => {
  it('should render normally', () => {
    const { getByLabelText } = render(<HomePage />);
    const HomePageElement = getByLabelText('home-page');

    expect(HomePageElement).toBeInTheDocument();
  });
});
