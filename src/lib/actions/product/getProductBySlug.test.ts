import { prisma } from '@/db/prisma';

import { getProductBySlug } from './getProductBySlug';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findFirst: jest.fn()
    }
  }
}));

describe('Given getProductBySlug', () => {
  const slug = 'test-slug';
  const mockProduct = { id: '1', name: 'Test Product', slug };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return product when found', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductBySlug(slug);

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { slug }
    });
    expect(result).toEqual(mockProduct);
  });

  it('should return null if product is not found', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await getProductBySlug(slug);

    expect(result).toBeNull();
  });

  it('should throw if prisma.findFirst fails', async () => {
    const error = new Error('DB error');
    (prisma.product.findFirst as jest.Mock).mockRejectedValue(error);

    await expect(getProductBySlug(slug)).rejects.toThrow('DB error');
  });
});
