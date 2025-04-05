import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import CarouselContext from '../context';
import { CarouselContextProps } from '../types';

const mockCarouselRef = jest.fn();
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();

const TestComponent = () => {
  const context = useContext(CarouselContext);

  context.carouselRef(null);
  context.scrollPrev();
  context.scrollNext();

  return (
    <div>
      <div data-testid="canScrollPrev">
        {context.canScrollPrev ? 'true' : 'false'}
      </div>
      <div data-testid="canScrollNext">
        {context.canScrollNext ? 'true' : 'false'}
      </div>
    </div>
  );
};

describe('Given CarouselContext', () => {
  it('uses default context values when no provider is given', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('canScrollPrev')).toHaveTextContent('false');
    expect(screen.getByTestId('canScrollNext')).toHaveTextContent('false');
  });

  it('provides default context values', () => {
    render(
      <CarouselContext.Provider
        value={{
          carouselRef: mockCarouselRef,
          api: {} as CarouselContextProps['api'],
          scrollPrev: mockScrollPrev,
          scrollNext: mockScrollNext,
          canScrollPrev: false,
          canScrollNext: false
        }}
      >
        <TestComponent />
      </CarouselContext.Provider>
    );

    expect(screen.getByTestId('canScrollPrev')).toHaveTextContent('false');
    expect(screen.getByTestId('canScrollNext')).toHaveTextContent('false');
    expect(mockScrollPrev).toHaveBeenCalled();
    expect(mockScrollNext).toHaveBeenCalled();
    expect(mockCarouselRef).toHaveBeenCalled();
  });

  it('provides updated context values when passed', () => {
    render(
      <CarouselContext.Provider
        value={{
          carouselRef: mockCarouselRef,
          api: {} as CarouselContextProps['api'],
          scrollPrev: mockScrollPrev,
          scrollNext: mockScrollNext,
          canScrollPrev: true,
          canScrollNext: true
        }}
      >
        <TestComponent />
      </CarouselContext.Provider>
    );

    expect(screen.getByTestId('canScrollPrev')).toHaveTextContent('true');
    expect(screen.getByTestId('canScrollNext')).toHaveTextContent('true');
    expect(mockScrollPrev).toHaveBeenCalled();
    expect(mockScrollNext).toHaveBeenCalled();
    expect(mockCarouselRef).toHaveBeenCalled();
  });
});
