import { createContext } from 'react';

import { UseEmblaCarouselType } from 'embla-carousel-react';

import { CarouselContextProps } from '../types';

const defaultCarouselContext = {
  carouselRef: () => {},
  api: {} as UseEmblaCarouselType[1],
  scrollPrev: () => {},
  scrollNext: () => {},
  canScrollPrev: false,
  canScrollNext: false
};

const CarouselContext = createContext<CarouselContextProps>(
  defaultCarouselContext
);

export default CarouselContext;
