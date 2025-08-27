import { render, screen } from '@testing-library/react';

import { redirect } from 'next/navigation';

import { auth } from '#/auth';

import RegisterPage from './page';

jest.mock('#/auth', () => ({
  auth: jest.fn()
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

jest.mock('./register-form', () => () => (
  <div data-testid="register-form">RegisterForm</div>
));

describe('Given RegisterPage component', () => {
  const mockAuth = auth as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to callbackUrl when user is authenticated', async () => {
    mockAuth.mockResolvedValueOnce({ user: { name: 'Jane Doe' } });

    await RegisterPage({
      searchParams: Promise.resolve({ callbackUrl: '/dashboard' })
    });

    expect(mockRedirect).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to "/" when user is authenticated and no callbackUrl is provided', async () => {
    mockAuth.mockResolvedValueOnce({ user: { name: 'Jane Doe' } });

    await RegisterPage({ searchParams: Promise.resolve({ callbackUrl: '' }) });

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });

  it('should render register form when user is not authenticated', async () => {
    mockAuth.mockResolvedValueOnce(null);

    render(
      await RegisterPage({ searchParams: Promise.resolve({ callbackUrl: '' }) })
    );

    expect(screen.getByTestId('register-form')).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(
      screen.getByText(/enter your information below to register/i)
    ).toBeInTheDocument();
  });
});
