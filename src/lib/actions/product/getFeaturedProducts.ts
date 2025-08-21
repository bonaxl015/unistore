'use server';
import { prisma } from '@/db/prisma';

import { convertToPlainObject } from '../../utils';

export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4
  });

  return convertToPlainObject(data);
}
