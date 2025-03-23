import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from './page';

jest.mock('@/components/HomeCarouselSection', () => ({
  __esModule: true,
  default: () => <div data-testid="home-carousel-section"></div>
}));

describe('Given Home page', () => {
  it('should render normally', () => {
    const { getByLabelText } = render(<HomePage />);
    const HomePageElement = getByLabelText('home-page');

    expect(HomePageElement).toBeInTheDocument();
  });
});
