import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '#/auth';

import { signInSchema } from '../../validators';
import { signInWithCredentials } from './signInWithCredentials';

jest.mock('#/auth', () => ({
  signIn: jest.fn()
}));

jest.mock('../../validators', () => ({
  signInSchema: {
    parse: jest.fn()
  }
}));

jest.mock('next/dist/client/components/redirect-error', () => ({
  isRedirectError: jest.fn()
}));

describe('Given signInWithCredentials', () => {
  const mockFormData = new FormData();
  mockFormData.set('email', 'test@example.com');
  mockFormData.set('password', 'securepass');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully with valid credentials', async () => {
    const user = { email: 'test@example.com', password: 'securepass' };
    (signInSchema.parse as jest.Mock).mockReturnValue(user);
    (signIn as jest.Mock).mockResolvedValue(undefined);

    const result = await signInWithCredentials(null, mockFormData);

    expect(signInSchema.parse).toHaveBeenCalledWith(user);
    expect(signIn).toHaveBeenCalledWith('credentials', user);
    expect(result).toEqual({
      success: true,
      message: 'Signed in successfully'
    });
  });

  it('should re-throw redirect error if encountered', async () => {
    const redirectError = new Error('Redirect error');
    (signInSchema.parse as jest.Mock).mockImplementation(() => {
      throw redirectError;
    });
    (isRedirectError as any).mockReturnValue(true);

    await expect(signInWithCredentials(null, mockFormData)).rejects.toThrow(
      'Redirect error'
    );

    expect(isRedirectError).toHaveBeenCalledWith(redirectError);
  });

  it('should return error message on validation or sign-in failure', async () => {
    const genericError = new Error('Invalid input');
    (signInSchema.parse as jest.Mock).mockImplementation(() => {
      throw genericError;
    });
    (isRedirectError as any).mockReturnValue(false);

    const result = await signInWithCredentials(null, mockFormData);

    expect(result).toEqual({
      success: false,
      message: 'Invalid email or password'
    });
  });
});
