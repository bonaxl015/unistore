'use client';

import { ComponentProps } from 'react';

import { cn } from '@/utils';

import useCarousel from '../hooks/useCarousel';

export default function CarouselContent({
  className,
  ...props
}: ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        aria-label="Carousel Content"
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
}
