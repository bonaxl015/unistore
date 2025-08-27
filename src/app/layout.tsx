import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { WithChildren } from '@/types';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | Unistore`,
    default: 'Unistore'
  },
  description: 'A modern e-commerce platform'
};

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin']
});

interface IRootLayput extends WithChildren {}

export default function RootLayout({ children }: IRootLayput) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div aria-label="Home Layout" className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
