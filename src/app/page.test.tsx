import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from './page';

jest.mock('@/components/HomeCarouselSection', () => () => (
  <div data-testid="home-carousel">Mock Home Carousel</div>
));

describe('Given Home page', () => {
  it('should render normally', () => {
    const { getByLabelText } = render(<HomePage />);
    const HomePageElement = getByLabelText('home-page');

    expect(HomePageElement).toBeInTheDocument();
  });
});
