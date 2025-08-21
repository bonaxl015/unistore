'use server';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { prisma } from '@/db/prisma';

import { formatError } from '../../utils';
import { updateProductSchema } from '../../validators/updateProductSchema';

export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id }
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.update({
      where: { id: product.id },
      data: product
    });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product updated successfully'
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
