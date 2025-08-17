import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { deleteUser } from './deleteUser';
import { formatError } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      delete: jest.fn()
    }
  }
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn(() => 'Formatted error message')
}));

describe('Given deleteUser', () => {
  const mockId = 'user-id-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user and revalidate path', async () => {
    (prisma.user.delete as jest.Mock).mockResolvedValue({});

    const result = await deleteUser(mockId);

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: mockId } });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/users');
    expect(result).toEqual({
      success: true,
      message: 'User deleted successfully'
    });
  });

  it('should return error message when delete fails', async () => {
    const error = new Error('DB Error');

    (prisma.user.delete as jest.Mock).mockRejectedValue(error);

    const result = await deleteUser(mockId);

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: mockId } });
    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: 'Formatted error message'
    });
  });
});
