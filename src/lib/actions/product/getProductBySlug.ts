'use server';
import { prisma } from '@/db/prisma';

export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug }
  });
}
