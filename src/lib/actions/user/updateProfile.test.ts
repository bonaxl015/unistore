import { auth } from '#/auth';
import { prisma } from '@/db/prisma';

import { updateProfile } from './updateProfile';
import { formatError } from '../../utils';

jest.mock('#/auth', () => ({
  auth: jest.fn()
}));

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn(() => 'Formatted error')
}));

describe('updateProfile', () => {
  const mockUserInput = {
    name: 'Updated Name',
    email: 'test@example.com'
  };

  const mockSession = {
    user: {
      id: 'user-123'
    }
  };

  const mockCurrentUser = {
    id: 'user-123',
    name: 'Old Name',
    email: 'test@example.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user profile successfully', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockCurrentUser);
    (prisma.user.update as jest.Mock).mockResolvedValue({});

    const result = await updateProfile(mockUserInput);

    expect(auth).toHaveBeenCalled();
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'user-123'
      }
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: {
        id: 'user-123'
      },
      data: {
        name: 'Updated Name'
      }
    });
    expect(result).toEqual({
      success: true,
      message: 'User updated successfully'
    });
  });

  it('should return error if user is not found', async () => {
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateProfile(mockUserInput);

    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });

  it('should return error if an exception is thrown', async () => {
    const thrownError = new Error('Unexpected error');
    (auth as jest.Mock).mockRejectedValue(thrownError);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateProfile(mockUserInput);

    expect(formatError).toHaveBeenCalledWith(thrownError);
    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });
});
