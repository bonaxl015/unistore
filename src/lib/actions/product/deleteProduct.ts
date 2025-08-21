'use server';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { formatError } from '../../utils';

export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id }
    });

    if (!productExists) throw new Error('Product not found');

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product deleted successfully'
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
