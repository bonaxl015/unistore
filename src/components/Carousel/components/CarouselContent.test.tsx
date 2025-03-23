import { render, screen } from '@testing-library/react';

import CarouselContent from './CarouselContent';
import useCarousel from '../hooks/useCarousel';

jest.mock('../hooks/useCarousel', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Given CarouselContent component', () => {
  it('renders without crashing', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      carouselRef: { current: null },
      orientation: 'horizontal'
    });

    const { container } = render(<CarouselContent />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies horizontal orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      carouselRef: { current: null },
      orientation: 'horizontal'
    });

    render(<CarouselContent />);
    const innerDiv = screen.getByLabelText('Carousel Content');

    expect(innerDiv).toHaveClass('-ml-4');
    expect(innerDiv).not.toHaveClass('-mt-4 flex-col');
  });

  it('applies vertical orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      carouselRef: { current: null },
      orientation: 'vertical'
    });

    render(<CarouselContent />);
    const innerDiv = screen.getByLabelText('Carousel Content');

    expect(innerDiv).toHaveClass('-mt-4 flex-col');
    expect(innerDiv).not.toHaveClass('-ml-4');
  });

  it('applies additional class names', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      carouselRef: { current: null },
      orientation: 'horizontal'
    });

    render(<CarouselContent className="custom-class" />);
    const innerDiv = screen.getByLabelText('Carousel Content');

    expect(innerDiv).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      carouselRef: { current: null },
      orientation: 'horizontal'
    });

    render(<CarouselContent data-testid="carousel-content" />);
    expect(screen.getByTestId('carousel-content')).toBeInTheDocument();
  });
});
