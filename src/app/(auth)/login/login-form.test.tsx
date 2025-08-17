import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

import LoginForm from './login-form';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}));

jest.mock('@/lib/actions/user/signInWithCredentials', () => ({
  signInWithCredentials: jest.fn()
}));

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useActionState: jest.fn()
  };
});

describe('Given LoginForm component', () => {
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('/callback-url')
    });

    (useActionState as jest.Mock).mockImplementation((fn, initialState) => [
      initialState,
      mockAction
    ]);
  });

  it('renders with default values', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  it('submits the form with correct values', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));

    await waitFor(() => {
      expect(mockAction).toHaveBeenCalled();
    });
  });

  it('shows pending state when logging in', () => {
    (useActionState as jest.Mock).mockImplementation((fn, initialState) => [
      initialState,
      mockAction
    ]);

    jest.spyOn(require('react-dom'), 'useFormStatus').mockReturnValue({
      pending: true
    });

    render(<LoginForm />);

    expect(screen.getByRole('button')).toHaveTextContent('Logging In...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message when login fails', () => {
    (useActionState as jest.Mock).mockImplementation(() => [
      { success: false, message: 'Invalid credentials' },
      mockAction
    ]);

    render(<LoginForm />);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
