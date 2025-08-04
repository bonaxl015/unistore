'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/db/prisma';

import { PAGE_SIZE } from '../../constants';

export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive'
          } as Prisma.StringFilter
        }
      : {};

  const data = await prisma.user.findMany({
    where: {
      ...queryFilter
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit)
  };
}
