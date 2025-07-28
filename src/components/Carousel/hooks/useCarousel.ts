import { useContext } from 'react';

import CarouselContext from '../context';

export default function useCarousel() {
  return useContext(CarouselContext);
}
