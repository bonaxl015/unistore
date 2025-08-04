'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '#/auth';

import { signInSchema } from '../../validators';

export async function signInWithCredentials(
  _prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}
