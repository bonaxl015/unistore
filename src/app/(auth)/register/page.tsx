import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { redirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { auth } from '#/auth';

import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Register'
};

const RegisterPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo-horizontal.png"
              width={280}
              height={50}
              alt="Unistore logo"
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information below to register
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
