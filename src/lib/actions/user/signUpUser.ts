'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { prisma } from '@/db/prisma';

import { signIn } from '#/auth';

import { formatError, hash } from '../../utils';
import { signUpSchema } from '../../validators';

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    });

    const plainPassword = user.password;

    user.password = await hash(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword
    });

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}
