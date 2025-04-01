import React, { FC, ReactNode } from 'react';
import type { Metadata } from 'next';

import styles from './styles.module.css';

interface AboutLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'About | Spacebook'
};

const AboutLayout: FC<AboutLayoutProps> = ({ children }) => {
  return (
    <div>
      <p className={styles.text}>AboutLayout</p>
      {children}
    </div>
  );
};

export default AboutLayout;
