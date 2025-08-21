import { prisma } from '@/db/prisma';

import { getFeaturedProducts } from './getFeaturedProducts';
import { convertToPlainObject } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findMany: jest.fn()
    }
  }
}));

jest.mock('../../utils', () => ({
  convertToPlainObject: jest.fn((data) => data)
}));

describe('Given getFeaturedProducts', () => {
  const mockProducts = [
    { id: '1', name: 'Featured A', isFeatured: true },
    { id: '2', name: 'Featured B', isFeatured: true }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return featured products converted to plain objects', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (convertToPlainObject as jest.Mock).mockReturnValue(mockProducts);

    const result = await getFeaturedProducts();

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 4
    });
    expect(convertToPlainObject).toHaveBeenCalledWith(mockProducts);
    expect(result).toEqual(mockProducts);
  });

  it('should handle empty results', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);
    (convertToPlainObject as jest.Mock).mockReturnValue([]);

    const result = await getFeaturedProducts();

    expect(convertToPlainObject).toHaveBeenCalledWith([]);
    expect(result).toEqual([]);
  });

  it('should throw if prisma.findMany fails', async () => {
    const error = new Error('DB error');
    (prisma.product.findMany as jest.Mock).mockRejectedValue(error);

    await expect(getFeaturedProducts()).rejects.toThrow('DB error');
  });
});
