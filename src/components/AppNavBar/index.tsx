import Link from 'next/link';
import { FC } from 'react';

import NavigationLinks from './navigation-links';

const AppNavbar: FC = () => {
  return (
    <nav
      aria-label="Navigation Bar"
      className="w-full bg-gradient-to-b from-gray-900 to-indigo-900 backdrop-blur-lg shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-3">
          <Link href="/" target="_self">
            <span className="text-2xl font-bold text-white tracking-wide">
              Unistore
            </span>
          </Link>
        </div>
        <NavigationLinks />
      </div>
    </nav>
  );
};

export default AppNavbar;
