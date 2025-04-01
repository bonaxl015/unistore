import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

import useCarousel from './useCarousel';
import CarouselContext from '../context';
import { CarouselContextProps } from '../types';

const createWrapper = (value: CarouselContextProps) => {
  return ({ children }: { children: ReactNode }) => (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

describe('useCarousel', () => {
  it('returns the correct context value when used inside CarouselContext.Provider', () => {
    const mockContextValue = {
      orientation: 'horizontal',
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      canScrollNext: true,
      canScrollPrev: false
    } as unknown as CarouselContextProps;

    const { result } = renderHook(() => useCarousel(), {
      wrapper: createWrapper(mockContextValue)
    });

    expect(result.current).toBe(mockContextValue);
  });
});
