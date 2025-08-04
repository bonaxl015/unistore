import { FC } from 'react';

import Link from 'next/link';

import { auth } from '#/auth';
import { navigationLinks } from '@/constants/navigationList';

import Logout from './logout';

const NavigationLinks: FC = async () => {
  const session = await auth();

  const navigationLinksDisplay = async () => {
    if (!session) {
      return navigationLinks.map((item) => (
        <Link key={item.key} href={item.href}>
          <span className="cursor-pointer text-white text-lg font-medium transition-all duration-300 hover:text-gray-300 hover:scale-105">
            {item.label}
          </span>
        </Link>
      ));
    }

    return <Logout />;
  };

  return <div className="flex space-x-6">{navigationLinksDisplay()}</div>;
};

export default NavigationLinks;
