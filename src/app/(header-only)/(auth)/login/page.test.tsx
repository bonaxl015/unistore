import React, { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { ImageLoaderProps } from 'next/image';

import LoginPage from './page';

jest.mock('next/link', () => ({ children, ...props }: ComponentProps<'a'>) => (
  <a {...props}>{children}</a>
));
jest.mock('next/image', () => (props: ImageLoaderProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img {...props} alt="" />
));
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: ComponentProps<'div'>) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: ComponentProps<'div'>) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: ComponentProps<'div'>) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: ComponentProps<'h1'>) => <h1>{children}</h1>,
  CardDescription: ({ children }: ComponentProps<'p'>) => <p>{children}</p>
}));

jest.mock('#/auth', () => ({
  auth: jest.fn()
}));

jest.mock('../login/login-form', () =>
  jest.fn(() => <div>Mocked LoginForm</div>)
);

describe('Given LoginPage component', () => {
  const mockAuth = require('#/auth').auth;
  const mockRedirect = require('next/navigation').redirect;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects if session exists', async () => {
    mockAuth.mockResolvedValueOnce({ user: { name: 'John' } });

    await LoginPage({
      searchParams: Promise.resolve({ callbackUrl: '/dashboard' })
    });

    expect(mockRedirect).toHaveBeenCalledWith('/dashboard');
  });

  it('renders login form if no session', async () => {
    mockAuth.mockResolvedValueOnce(null);

    const Page = await LoginPage({
      searchParams: Promise.resolve({ callbackUrl: '' })
    });

    render(Page);

    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByText('Mocked LoginForm')).toBeInTheDocument();
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
  });
});
