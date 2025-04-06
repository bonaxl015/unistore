import { FC } from 'react';

import HomeFeatureSection from '@/components/HomeFeatureSection';
import HomeWelcomeSection from '@/components/HomeWelcomeSection';

const HomePage: FC = () => {
  return (
    <div aria-label="home-page" className="min-h-screen bg-gray-50">
      <HomeWelcomeSection />
      <HomeFeatureSection />
    </div>
  );
};

export default HomePage;
