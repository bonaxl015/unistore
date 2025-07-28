import { render, screen } from '@testing-library/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import Footer from '.';

describe('Given Footer component', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('UniStore')).toBeInTheDocument();
  });

  it('renders the slogan', () => {
    render(<Footer />);
    expect(
      screen.getByText('Creating the future, one step at a time.')
    ).toBeInTheDocument();
  });

  it('renders all social media links', () => {
    render(<Footer />);

    const socialLinks = [
      {
        href: 'https://facebook.com',
        icon: FaFacebook,
        name: 'facebook'
      },
      {
        href: 'https://twitter.com',
        icon: FaTwitter,
        name: 'twitter'
      },
      {
        href: 'https://instagram.com',
        icon: FaInstagram,
        name: 'instagram'
      }
    ];

    socialLinks.forEach(({ href, name }) => {
      const linkElement = screen.getByLabelText(`${name} icon`);
      expect(linkElement).toHaveAttribute('href', href);
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders the current year in copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} UniStore. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('has correct styles applied', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(
      'bg-gradient-to-b from-gray-900 to-indigo-900 backdrop-blur-lg shadow-md text-white py-6'
    );
  });
});
