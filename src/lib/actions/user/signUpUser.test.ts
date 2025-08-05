import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '#/auth';

import { prisma } from '@/db/prisma';

import { signUpUser } from './signUpUser';
import { signUpSchema } from '../../validators';
import { hash, formatError } from '../../utils';

jest.mock('../../validators', () => ({
  signUpSchema: {
    parse: jest.fn()
  }
}));

jest.mock('../../utils', () => ({
  hash: jest.fn(),
  formatError: jest.fn(() => 'Formatted error')
}));

jest.mock('#/auth', () => ({
  signIn: jest.fn()
}));

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      create: jest.fn()
    }
  }
}));

jest.mock('next/dist/client/components/redirect-error', () => ({
  isRedirectError: jest.fn()
}));

describe('signUpUser', () => {
  const mockFormData = new FormData();
  mockFormData.set('name', 'Alice');
  mockFormData.set('email', 'alice@example.com');
  mockFormData.set('password', 'password123');
  mockFormData.set('confirmPassword', 'password123');

  const parsedUser = {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  const hashedPassword = 'hashed_pw';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register user and sign them in successfully', async () => {
    (signUpSchema.parse as jest.Mock).mockReturnValue(parsedUser);
    (hash as jest.Mock).mockResolvedValue(hashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue({});
    (signIn as jest.Mock).mockResolvedValue(undefined);

    const result = await signUpUser(null, mockFormData);

    expect(signUpSchema.parse).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    expect(hash).toHaveBeenCalledWith('password123');

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Alice',
        email: 'alice@example.com',
        password: hashedPassword
      }
    });

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'alice@example.com',
      password: 'password123'
    });

    expect(result).toEqual({
      success: true,
      message: 'User registered successfully'
    });
  });

  it('should re-throw if isRedirectError is true', async () => {
    const redirectError = new Error('Redirect');
    (signUpSchema.parse as jest.Mock).mockImplementation(() => {
      throw redirectError;
    });
    (isRedirectError as any).mockReturnValue(true);

    await expect(signUpUser(null, mockFormData)).rejects.toThrow('Redirect');

    expect(isRedirectError).toHaveBeenCalledWith(redirectError);
  });

  it('should return formatted error if validation fails', async () => {
    const error = new Error('Validation failed');
    (signUpSchema.parse as jest.Mock).mockImplementation(() => {
      throw error;
    });
    (isRedirectError as any).mockReturnValue(false);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await signUpUser(null, mockFormData);

    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });

  it('should return formatted error if prisma or signIn fails', async () => {
    (signUpSchema.parse as jest.Mock).mockReturnValue(parsedUser);
    (hash as jest.Mock).mockResolvedValue(hashedPassword);
    const prismaError = new Error('Prisma error');
    (prisma.user.create as jest.Mock).mockRejectedValue(prismaError);
    (isRedirectError as any).mockReturnValue(false);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await signUpUser(null, mockFormData);

    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });
});
