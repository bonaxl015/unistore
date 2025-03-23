import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import CarouselContext from '../context';
import { CarouselContextProps } from '../types';

const TestComponent = () => {
  const context = useContext(CarouselContext);

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
  it('provides default context values', () => {
    render(
      <CarouselContext.Provider
        value={{
          carouselRef: () => {},
          api: {} as CarouselContextProps['api'],
          scrollPrev: () => {},
          scrollNext: () => {},
          canScrollPrev: false,
          canScrollNext: false
        }}
      >
        <TestComponent />
      </CarouselContext.Provider>
    );

    expect(screen.getByTestId('canScrollPrev')).toHaveTextContent('false');
    expect(screen.getByTestId('canScrollNext')).toHaveTextContent('false');
  });

  it('provides updated context values when passed', () => {
    render(
      <CarouselContext.Provider
        value={{
          carouselRef: () => {},
          api: {} as CarouselContextProps['api'],
          scrollPrev: () => {},
          scrollNext: () => {},
          canScrollPrev: true,
          canScrollNext: true
        }}
      >
        <TestComponent />
      </CarouselContext.Provider>
    );

    expect(screen.getByTestId('canScrollPrev')).toHaveTextContent('true');
    expect(screen.getByTestId('canScrollNext')).toHaveTextContent('true');
  });
});
