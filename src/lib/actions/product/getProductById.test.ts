import { prisma } from '@/db/prisma';

import { getProductById } from './getProductById';
import { convertToPlainObject } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findFirst: jest.fn()
    }
  }
}));

jest.mock('../../utils', () => ({
  convertToPlainObject: jest.fn((data) => data)
}));

describe('Given getProductById', () => {
  const productId = 'test-product-123';
  const mockProduct = { id: productId, name: 'Test Product' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return product converted to plain object', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(mockProduct);
    (convertToPlainObject as jest.Mock).mockReturnValue(mockProduct);

    const result = await getProductById(productId);

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: productId }
    });
    expect(convertToPlainObject).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should return null if product is not found', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);
    (convertToPlainObject as jest.Mock).mockReturnValue(null);

    const result = await getProductById(productId);

    expect(convertToPlainObject).toHaveBeenCalledWith(null);
    expect(result).toBeNull();
  });

  it('should throw if prisma.findFirst fails', async () => {
    const error = new Error('DB error');
    (prisma.product.findFirst as jest.Mock).mockRejectedValue(error);

    await expect(getProductById(productId)).rejects.toThrow('DB error');
  });

  it('should throw if convertToPlainObject fails', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(mockProduct);
    (convertToPlainObject as jest.Mock).mockImplementation(() => {
      throw new Error('Serialization error');
    });

    await expect(getProductById(productId)).rejects.toThrow(
      'Serialization error'
    );
  });
});
