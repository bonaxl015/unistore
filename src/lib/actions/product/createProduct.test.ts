import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { createProduct } from './createProduct';

import { insertProductSchema } from '../../validators/insertProductSchema';
import { formatError } from '../../utils';

jest.mock('@/db/prisma', () => ({
  prisma: {
    product: {
      create: jest.fn()
    }
  }
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('../../utils', () => ({
  formatError: jest.fn((err) => `Formatted: ${err.message || err}`)
}));

describe('Given createProduct', () => {
  const validData = {
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

  it('should create a product successfully', async () => {
    (prisma.product.create as jest.Mock).mockResolvedValue({
      id: 1,
      ...validData
    });

    const result = await createProduct(validData);

    expect(insertProductSchema.parse(validData)).toEqual(validData);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: validData });
    expect(revalidatePath).toHaveBeenCalledWith('/admin/products');
    expect(result).toEqual({
      success: true,
      message: 'Product created successfully'
    });
  });

  it('should return a formatted error when prisma throws', async () => {
    const error = new Error('DB error');
    (prisma.product.create as jest.Mock).mockRejectedValue(error);

    const result = await createProduct(validData);

    expect(formatError).toHaveBeenCalledWith(error);
    expect(result).toEqual({
      success: false,
      message: `Formatted: ${error.message}`
    });
  });

  it('should return a formatted error when validation fails', async () => {
    const invalidData = { name: '', price: -5 };
    const result = await createProduct(invalidData as any);

    expect(prisma.product.create).not.toHaveBeenCalled();
    expect(formatError).toHaveBeenCalled();
    expect(result.success).toBe(false);
  });
});
