import { FC } from 'react';

import { homeBackgroundImage } from '@/constants/assetUrls';

const HomeWelcomeSection: FC = () => {
  return (
    <section
      aria-label="home-welcome-section"
      className="relative h-dvh flex items-center justify-center text-center px-6 md:px-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed brightness-50"
        style={{ backgroundImage: `url('${homeBackgroundImage}')` }}
      />
      <div className="relative z-10 text-white">
        <h1 className="text-5xl md:text-6xl font-bold">Welcome to Spacebook</h1>
        <p className="mt-4 text-lg md:text-xl">Connect Across the Cosmos</p>
      </div>
    </section>
  );
};

export default HomeWelcomeSection;
