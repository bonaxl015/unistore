import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import { FC } from 'react';

const Footer: FC = () => {
  const socialMediaLinks = [
    {
      key: 'facebook',
      href: 'https://facebook.com',
      iconComponent: FaFacebook
    },
    {
      key: 'twitter',
      href: 'https://twitter.com',
      iconComponent: FaTwitter
    },
    {
      key: 'instagram',
      href: 'https://instagram.com',
      iconComponent: FaInstagram
    }
  ];

  return (
    <footer
      aria-label="Footer"
      className="bg-gradient-to-b from-gray-900 to-indigo-900 backdrop-blur-lg shadow-md text-white py-6"
    >
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Brand & Slogan */}
        <h2 className="text-2xl font-bold tracking-wide">UniStore</h2>
        <p className="text-gray-200">
          Creating the future, one step at a time.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          {socialMediaLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-label={`${item.key} icon`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <item.iconComponent size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300 mt-3">
          &copy; {new Date().getFullYear()} UniStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
