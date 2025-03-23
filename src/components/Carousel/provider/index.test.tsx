import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import CarouselContext from '../context';
import { CarouselApi } from '../types';

import CarouselProvider from '.';

jest.mock('embla-carousel-react', () =>
  jest.fn(() => [
    jest.fn(),
    {
      on: jest.fn(),
      off: jest.fn(),
      scrollPrev: jest.fn(),
      scrollNext: jest.fn(),
      canScrollPrev: jest.fn(() => true),
      canScrollNext: jest.fn(() => false)
    }
  ])
);

const TestComponent = () => {
  const context = useContext(CarouselContext);
  return (
    <div>
      <div data-testid="orientation">{context?.orientation}</div>
      <button data-testid="prev-btn" onClick={context?.scrollPrev}>
        Prev
      </button>
      <button data-testid="next-btn" onClick={context?.scrollNext}>
        Next
      </button>
    </div>
  );
};

describe('Given CarouselProvider', () => {
  it('renders children correctly', () => {
    render(
      <CarouselProvider>
        <div data-testid="child">Child</div>
      </CarouselProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  describe('and when orientation values is provided', () => {
    it('should display horizontal for horizontal orientation', () => {
      render(
        <CarouselProvider orientation="horizontal">
          <TestComponent />
        </CarouselProvider>
      );

      expect(screen.getByTestId('orientation')).toHaveTextContent('horizontal');
    });

    it('should display vertical for vertical orientation', () => {
      render(
        <CarouselProvider orientation="vertical">
          <TestComponent />
        </CarouselProvider>
      );

      expect(screen.getByTestId('orientation')).toHaveTextContent('vertical');
    });
  });

  it('calls setApi when initialized', () => {
    const setApiMock = jest.fn();
    render(<CarouselProvider setApi={setApiMock} />);

    expect(setApiMock).toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    render(
      <CarouselProvider>
        <div data-testid="carousel" tabIndex={0} />
      </CarouselProvider>
    );

    const carousel = screen.getByTestId('carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
  });

  it('updates scroll state on select events', () => {
    const mockApi: Partial<CarouselApi> = {
      canScrollPrev: jest.fn(() => true),
      canScrollNext: jest.fn(() => false),
      on: jest.fn(),
      off: jest.fn()
    };

    (useEmblaCarousel as unknown as jest.Mock).mockReturnValue([
      jest.fn(),
      mockApi
    ]);

    render(<CarouselProvider />);

    expect(mockApi.on).toHaveBeenCalledWith('select', expect.any(Function));
  });
});
