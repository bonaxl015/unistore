import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { updateProduct } from './updateProduct';

import { updateProductSchema } from '../../validators/updateProductSchema';
import { formatError } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn((err) => `Formatted: ${err.message || err}`)
}));

describe('Given updateProduct', () => {
  const validData = {
    id: '123',
    name: 'Test Product',
    slug: 'test-product',
    category: 'Test Category',
    price: '100',
    stock: 10,
    brand: 'Test Brand',
    description: 'Test Description',
    images: ['http://test-image'],
    isFeatured: true,
    banner: 'Test Banner'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a product successfully', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: validData.id
    });
    (prisma.product.update as jest.Mock).mockResolvedValue(validData);

    const result = await updateProduct(validData);

    expect(updateProductSchema.parse(validData)).toEqual(validData);
    expect(prisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: validData.id }
    });
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: validData.id },
      data: validData
    });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/products');
    expect(result).toEqual({
      success: true,
      message: 'Product updated successfully'
    });
  });

  it('should return a formatted error when validation fails', async () => {
    const invalidData = { id: '', name: '' }; // invalid shape

    const result = await updateProduct(invalidData as any);

    expect(prisma.product.findFirst).not.toHaveBeenCalled();
    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(formatError).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });

  it('should return a formatted error if product does not exist', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await updateProduct(validData);

    expect(prisma.product.update).not.toHaveBeenCalled();
    expect(formatError).toHaveBeenCalledWith(expect.any(Error));
    expect(result).toEqual({
      success: false,
      message: 'Formatted: Product not found'
    });
  });

  it('should return a formatted error if prisma.update throws', async () => {
    (prisma.product.findFirst as jest.Mock).mockResolvedValue({
      id: validData.id
    });
    const error = new Error('DB error');
    (prisma.product.update as jest.Mock).mockRejectedValue(error);

    const result = await updateProduct(validData);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: `Formatted: ${error.message}`
    });
  });
});
