import { render, screen } from '@testing-library/react';

import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import React from 'react';

import RegisterForm from './register-form';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn()
}));

jest.mock('@/lib/actions/user/signUpUser', () => ({
  signUpUser: jest.fn()
}));

describe('Given RegisterForm component', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('/mock-callback')
    });

    (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields with default values', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(screen.getByLabelText('Confirm Password')).toHaveValue('');
  });

  it('renders hidden callbackUrl input with search param value', () => {
    render(<RegisterForm />);

    const hiddenInput = screen.getByDisplayValue(
      '/mock-callback'
    ) as HTMLInputElement;
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute('name', 'callbackUrl');
  });

  it('renders the Register button by default', () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument();
  });

  it('renders "Submitting..." when form is pending', () => {
    (useFormStatus as jest.Mock).mockReturnValue({ pending: true });

    render(<RegisterForm />);
    expect(
      screen.getByRole('button', { name: /Submitting.../i })
    ).toBeDisabled();
  });

  it('renders login link', () => {
    render(<RegisterForm />);
    const loginLink = screen.getByRole('link', { name: /Log In/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
