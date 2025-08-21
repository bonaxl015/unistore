import { prisma } from '@/db/prisma';

import { getAllCategories } from './getAllCategories';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      groupBy: jest.fn()
    }
  }
}));

describe('Given getAllCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return grouped categories successfully', async () => {
    const mockData = [
      { category: 'Electronics', _count: 5 },
      { category: 'Clothing', _count: 3 }
    ];

    (prisma.product.groupBy as jest.Mock).mockResolvedValue(mockData);

    const result = await getAllCategories();

    expect(prisma.product.groupBy).toHaveBeenCalledWith({
      by: ['category'],
      _count: true
    });
    expect(result).toEqual(mockData);
  });

  it('should throw if prisma.groupBy fails', async () => {
    const error = new Error('DB error');
    (prisma.product.groupBy as jest.Mock).mockRejectedValue(error);

    await expect(getAllCategories()).rejects.toThrow('DB error');
  });
});
