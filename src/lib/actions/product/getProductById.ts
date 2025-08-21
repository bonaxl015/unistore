'use server';
import { prisma } from '@/db/prisma';

import { convertToPlainObject } from '../../utils';

export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId }
  });

  return convertToPlainObject(data);
}
