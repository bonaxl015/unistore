'use client';

import { FC, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  CarouselProvider,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/lib/components/Carousel';
import { Button } from '@/lib/components/Button';
import productList from '@/constants/homePageProductList';

import styles from './styles.module.css';

const HomeCarouselSection: FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000 }));

  return (
    <CarouselProvider
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-8/10 m-auto"
    >
      <CarouselContent>
        {productList.map((product) => (
          <CarouselItem key={product.key} className={styles.carouselItem}>
            <div className={`${styles.card} shadow-lg`}>
              <div className={`${styles.cardImageContainer}`}>
                <Image
                  src={product.imageUrl}
                  alt="Product"
                  width={300}
                  height={300}
                  priority
                  className={`rounded-md ${styles.cardImage}`}
                />
              </div>
              <h3 className="mt-3 text-xl font-semibold">{product.name}</h3>
              <p className="mt-1 text-gray-600">$99.99</p>
              <Button className="mt-3 w-full">Add to Cart</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselProvider>
  );
};

export default HomeCarouselSection;
