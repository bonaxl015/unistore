import Link from 'next/link';
import { FC } from 'react';
import { navigationLinks } from '@/constants/navigationList';

const AppNavbar: FC = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-white tracking-wide">
            UniStore
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navigationLinks.map((item) => (
            <Link key={item.key} href={item.href}>
              <span className="cursor-pointer text-white text-lg font-medium transition-all duration-300 hover:text-gray-300 hover:scale-105">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
