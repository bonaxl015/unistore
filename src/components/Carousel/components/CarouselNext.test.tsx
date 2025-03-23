import { render, screen, fireEvent } from '@testing-library/react';

import CarouselNext from './CarouselNext';
import useCarousel from '../hooks/useCarousel';

jest.mock('../hooks/useCarousel', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Given CarouselNext component', () => {
  it('renders without crashing', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    const { container } = render(<CarouselNext />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies horizontal orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    render(<CarouselNext />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('top-1/2 -right-12 -translate-y-1/2');
    expect(button).not.toHaveClass(
      '-bottom-12 left-1/2 -translate-x-1/2 rotate-90'
    );
  });

  it('applies vertical orientation class', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'vertical',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    render(<CarouselNext />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      '-bottom-12 left-1/2 -translate-x-1/2 rotate-90'
    );
    expect(button).not.toHaveClass('top-1/2 -right-12 -translate-y-1/2');
  });

  it('disables the button when canScrollNext is false', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: false
    });

    render(<CarouselNext />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('calls scrollNext when clicked', () => {
    const scrollNextMock = jest.fn();
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: scrollNextMock,
      canScrollNext: true
    });

    render(<CarouselNext />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(scrollNextMock).toHaveBeenCalledTimes(1);
  });

  it('applies additional class names', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    render(<CarouselNext className="custom-class" />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    render(<CarouselNext data-testid="carousel-next" />);
    expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
  });

  it('contains the correct accessibility text', () => {
    (useCarousel as jest.Mock).mockReturnValue({
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      canScrollNext: true
    });

    render(<CarouselNext />);
    const srText = screen.getByText('Next slide');

    expect(srText).toHaveClass('sr-only');
  });
});
