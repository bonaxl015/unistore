import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../styles/globals.css';

import AppNavbar from '@/components/AppNavBar';
import AppBody from '@/components/AppBody';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
  title: 'Home | Unistore',
  description: 'Unistore home page'
};

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children?: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div aria-label="Home Layout" className="min-h-screen flex flex-col">
          <AppNavbar />
          <AppBody>{children}</AppBody>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
