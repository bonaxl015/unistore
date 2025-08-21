import { prisma } from '@/db/prisma';

import { getLatestProducts } from './getLatestProducts';
import { convertToPlainObject } from '../../utils';
import { LATEST_PRODUCTS_LIMIT } from '../../constants';

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

jest.mock('../../constants', () => ({
  LATEST_PRODUCTS_LIMIT: 3
}));

describe('Given getLatestProducts', () => {
  const mockProducts = [
    { id: '1', name: 'Latest A' },
    { id: '2', name: 'Latest B' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return latest products converted to plain objects', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (convertToPlainObject as jest.Mock).mockReturnValue(mockProducts);

    const result = await getLatestProducts();

    expect(prisma.product.findMany).toHaveBeenCalledWith({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: 'desc' }
    });
    expect(convertToPlainObject).toHaveBeenCalledWith(mockProducts);
    expect(result).toEqual(mockProducts);
  });

  it('should handle empty results', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);
    (convertToPlainObject as jest.Mock).mockReturnValue([]);

    const result = await getLatestProducts();

    expect(convertToPlainObject).toHaveBeenCalledWith([]);
    expect(result).toEqual([]);
  });

  it('should throw if prisma.findMany fails', async () => {
    const error = new Error('DB error');
    (prisma.product.findMany as jest.Mock).mockRejectedValue(error);

    await expect(getLatestProducts()).rejects.toThrow('DB error');
  });

  it('should throw if convertToPlainObject fails', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (convertToPlainObject as jest.Mock).mockImplementation(() => {
      throw new Error('Serialization error');
    });

    await expect(getLatestProducts()).rejects.toThrow('Serialization error');
  });
});
