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

import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Log In'
};

const LoginPage = async (props: {
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
          <CardTitle className="text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
