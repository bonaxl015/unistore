'use client';

import { ArrowRight } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/utils';
import { Button } from '@/lib/components/Button';

import useCarousel from '../hooks/useCarousel';

export default function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}
