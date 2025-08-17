import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { updateUser } from './updateUser';

import { formatError } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      update: jest.fn()
    }
  }
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn(() => 'Formatted error')
}));

const mockUser = {
  id: 'user-123',
  name: 'Updated Name',
  email: 'updated@name.com',
  role: 'ADMIN'
};

describe('updateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user and revalidate path successfully', async () => {
    (prisma.user.update as jest.Mock).mockResolvedValue({});
    (revalidatePath as jest.Mock).mockReturnValue(undefined);

    const result = await updateUser(mockUser);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      data: {
        name: 'Updated Name',
        role: 'ADMIN'
      }
    });

    expect(revalidatePath).toHaveBeenCalledWith('/admin/users');

    expect(result).toEqual({
      success: true,
      message: 'User updated successfully'
    });
  });

  it('should return formatted error when update fails', async () => {
    const error = new Error('Update failed');
    (prisma.user.update as jest.Mock).mockRejectedValue(error);
    (formatError as jest.Mock).mockReturnValue('Formatted error');

    const result = await updateUser(mockUser);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: 'Formatted error'
    });
  });
});
