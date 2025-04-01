import { FC } from 'react';

import { Button } from '@/lib/components/Button';
import HomeCarouselSection from '@/components/HomeCarouselSection';

const homeBackgroundImage =
  'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww';

const HomePage: FC = () => {
  return (
    <div aria-label="home-page" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-dvh flex items-center justify-center text-center px-6 md:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed brightness-50"
          style={{ backgroundImage: `url('${homeBackgroundImage}')` }}
        />
        <div className="relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to Spacebook
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Your one-stop shop for premium products
          </p>
          <Button className="mt-6 px-6 py-3 text-lg" variant="secondary">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <div className="my-8 h-[450px]">
          <HomeCarouselSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white text-center py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
        <p className="mt-2 text-lg">
          Get updates on new arrivals and exclusive deals
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 text-whiterounded-md w-full sm:w-1/3"
          />
          <Button className="px-6 py-3" variant="secondary">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
