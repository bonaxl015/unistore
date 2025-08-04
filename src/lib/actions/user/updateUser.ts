'use server';

import { z } from 'zod';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/db/prisma';

import { formatError } from '../../utils';
import { updateUserSchema } from '../../validators';

export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role
      }
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User updated successfully'
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
