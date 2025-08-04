import { render, screen } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';

import { ImageLoaderProps } from 'next/image';

import productList from '@/constants/homePageProductList';

import HomeCarouselSection from '../HomeCarouselSection';

jest.mock('embla-carousel-autoplay', () =>
  jest.fn(() => ({
    stop: jest.fn(),
    reset: jest.fn()
  }))
);

jest.mock('next/image', () => (props: ImageLoaderProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img {...props} alt="Product" />
));

jest.mock('../Carousel', () => ({
  CarouselProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="carousel-provider">{children}</div>
  ),
  CarouselContent: ({ children }: { children: ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: (props: ComponentProps<'button'>) => (
    <button data-testid="carousel-next" {...props}>
      Next
    </button>
  ),
  CarouselPrevious: (props: ComponentProps<'button'>) => (
    <button data-testid="carousel-previous" {...props}>
      Previous
    </button>
  )
}));

jest.mock('@/components/ui/button', () => ({
  Button: (props: ComponentProps<'button'>) => (
    <button data-testid="mock-button" {...props}>
      {props.children}
    </button>
  )
}));

describe('HomeCarouselSection', () => {
  it('renders the carousel with all products', () => {
    render(<HomeCarouselSection />);

    expect(screen.getByTestId('carousel-provider')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-content')).toBeInTheDocument();

    productList.forEach((product) => {
      const productElements = screen.getAllByText(product.name);

      productElements.forEach((productElement) => {
        expect(productElement).toBeInTheDocument();
      });
    });

    expect(screen.getAllByTestId('mock-button')).toHaveLength(
      productList.length
    );
  });

  it('renders next and previous buttons', () => {
    render(<HomeCarouselSection />);

    expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-previous')).toBeInTheDocument();
  });
});
