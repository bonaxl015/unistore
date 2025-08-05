import { prisma } from '@/db/prisma';

import { getUserById } from './getUserById';

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn()
    }
  }
}));

describe('Given getUserById', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Alice',
    email: 'alice@example.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user when found', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUserById('user-123');

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 'user-123' }
    });

    expect(result).toEqual(mockUser);
  });

  it('should throw an error when user is not found', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(getUserById('user-999')).rejects.toThrow('User not found');

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 'user-999' }
    });
  });
});
