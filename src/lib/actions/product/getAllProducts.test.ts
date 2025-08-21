import { prisma } from '@/db/prisma';

import { getAllProducts } from './getAllProducts';
import { PAGE_SIZE } from '../../constants';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      count: jest.fn()
    }
  }
}));

describe('Given getAllProducts', () => {
  const mockProducts = [
    { id: '1', name: 'Product A' },
    { id: '2', name: 'Product B' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products with default pagination and sorting', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (prisma.product.count as jest.Mock).mockResolvedValue(10);

    const result = await getAllProducts({ query: 'all', page: 1 });

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: PAGE_SIZE
    });
    expect(prisma.product.count).toHaveBeenCalled();
    expect(result).toEqual({
      data: mockProducts,
      totalPages: Math.ceil(10 / PAGE_SIZE)
    });
  });

  it('should apply all filters correctly', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (prisma.product.count as jest.Mock).mockResolvedValue(20);

    const result = await getAllProducts({
      query: 'Laptop',
      page: 2,
      limit: 5,
      category: 'Electronics',
      price: '100-500',
      rating: '4',
      sort: 'highest'
    });

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        name: { contains: 'Laptop', mode: 'insensitive' },
        category: 'Electronics',
        price: { gte: 100, lte: 500 },
        rating: { gte: 4 }
      },
      orderBy: { price: 'desc' },
      skip: 5, // (page - 1) * limit = (2-1)*5
      take: 5
    });

    expect(result.totalPages).toBe(Math.ceil(20 / 5));
  });

  it('should handle sort option: lowest', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.product.count as jest.Mock).mockResolvedValue(0);

    await getAllProducts({ query: 'all', page: 1, sort: 'lowest' });

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { price: 'asc' }
      })
    );
  });

  it('should handle sort option: rating', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);
    (prisma.product.count as jest.Mock).mockResolvedValue(0);

    await getAllProducts({ query: 'all', page: 1, sort: 'rating' });

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { rating: 'desc' }
      })
    );
  });

  it('should throw if prisma.findMany fails', async () => {
    const error = new Error('DB error');
    (prisma.product.findMany as jest.Mock).mockRejectedValue(error);

    await expect(getAllProducts({ query: 'all', page: 1 })).rejects.toThrow(
      'DB error'
    );
  });

  it('should throw if prisma.count fails', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (prisma.product.count as jest.Mock).mockRejectedValue(
      new Error('Count error')
    );

    await expect(getAllProducts({ query: 'all', page: 1 })).rejects.toThrow(
      'Count error'
    );
  });
});
