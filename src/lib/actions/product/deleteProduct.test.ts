import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { deleteProduct } from './deleteProduct';

import { formatError } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findFirst: jest.fn(),
      delete: jest.fn()
    }
  }
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn((err) => `Formatted: ${err.message || err}`)
}));

describe('Given deleteProduct', () => {
  const productId = 'test-product-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a product successfully', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: productId
    });
    (prisma.product.delete as jest.Mock).mockResolvedValue({ id: productId });

    const result = await deleteProduct(productId);

    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: productId }
    });
    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: productId }
    });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/products');
    expect(result).toEqual({
      success: true,
      message: 'Product deleted successfully'
    });
  });

  it('should return a formatted error if product is not found', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await deleteProduct(productId);

    expect(prisma.product.delete).not.toHaveBeenCalled();
    expect(formatError).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      message: 'Formatted: Product not found'
    });
  });

  it('should return a formatted error if prisma.delete throws', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: productId
    });
    const error = new Error('DB error');
    (prisma.product.delete as jest.Mock).mockRejectedValue(error);

    const result = await deleteProduct(productId);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: `Formatted: ${error.message}`
    });
  });
});
