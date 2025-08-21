'use server';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/db/prisma';

import { formatError } from '../../utils';
import { insertProductSchema } from '../../validators/insertProductSchema';

export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product created successfully'
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
