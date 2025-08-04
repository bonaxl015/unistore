'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { formatError } from '../../utils';

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    };
  }
}
