import { render, screen, fireEvent } from '@testing-library/react';

import CarouselPrevious from './CarouselPrevious';
import useCarousel from '../hooks/useCarousel';

jest.mock('../hooks/useCarousel', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Given CarouselPrevious component', () => {
  it('renders without crashing', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    const { container } = render(<CarouselPrevious />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies horizontal orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    render(<CarouselPrevious />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('top-1/2 -left-12 -translate-y-1/2');
    expect(button).not.toHaveClass(
      '-top-12 left-1/2 -translate-x-1/2 rotate-90'
    );
  });

  it('applies vertical orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'vertical',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    render(<CarouselPrevious />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('-top-12 left-1/2 -translate-x-1/2 rotate-90');
    expect(button).not.toHaveClass('top-1/2 -left-12 -translate-y-1/2');
  });

  it('disables the button when canScrollPrev is false', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: false
    });

    render(<CarouselPrevious />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('calls scrollPrev when clicked', () => {
    const scrollPrevMock = jest.fn();
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: scrollPrevMock,
      canScrollPrev: true
    });

    render(<CarouselPrevious />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(scrollPrevMock).toHaveBeenCalledTimes(1);
  });

  it('applies additional class names', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    render(<CarouselPrevious className="custom-class" />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    render(<CarouselPrevious data-testid="carousel-previous" />);
    expect(screen.getByTestId('carousel-previous')).toBeInTheDocument();
  });

  it('contains the correct accessibility text', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollPrev: jest.fn(),
      canScrollPrev: true
    });

    render(<CarouselPrevious />);
    const srText = screen.getByText('Previous slide');

    expect(srText).toHaveClass('sr-only');
  });
});
