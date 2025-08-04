'use client';

import { FC } from 'react';

import { redirect } from 'next/navigation';

import { signOutUser } from '@/lib/actions/user/signOutUser';

const Logout: FC = () => {
  const handleLogout = async () => {
    await signOutUser();

    redirect('/');
  };

  return (
    <span
      className="cursor-pointer text-white text-lg font-medium transition-all duration-300 hover:text-gray-300 hover:scale-105"
      onClick={handleLogout}
    >
      Logout
    </span>
  );
};

export default Logout;
