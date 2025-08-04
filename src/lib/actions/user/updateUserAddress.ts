'use server';

import { ShippingAddress } from '@/types';

import { prisma } from '@/db/prisma';

import { auth } from '#/auth';

import { formatError } from '../../utils';
import { shippingAddressSchema } from '../../validators';

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id }
    });

    if (!currentUser) throw new Error('User not found');

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address }
    });

    return {
      success: true,
      message: 'User updated successfully'
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
