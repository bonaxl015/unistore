import { prisma } from '@/db/prisma';

import { PAGE_SIZE } from '../../constants';

import { getAllUsers } from './getAllUsers';

jest.mock('@/db/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      count: jest.fn()
    }
  }
}));

describe('Given getAllUsers', () => {
  const mockUsers = [
    { id: '1', name: 'Alice', createdAt: new Date() },
    { id: '2', name: 'Bob', createdAt: new Date() }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return users and total pages when query is "all"', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);
    (prisma.user.count as jest.Mock).mockResolvedValue(10);

    const result = await getAllUsers({ page: 1, query: 'all' });

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: 0
    });

    expect(prisma.user.count).toHaveBeenCalled();

    expect(result).toEqual({
      data: mockUsers,
      totalPages: Math.ceil(10 / PAGE_SIZE)
    });
  });

  it('should apply name filter when query is not "all"', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);
    (prisma.user.count as jest.Mock).mockResolvedValue(5);

    const result = await getAllUsers({ page: 2, query: 'alice', limit: 5 });

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: 'alice',
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      skip: 5 // page 2 => (2 - 1) * 5
    });

    expect(prisma.user.count).toHaveBeenCalled();

    expect(result).toEqual({
      data: mockUsers,
      totalPages: 1
    });
  });
});
