import Button from '@/components/Button';
import Link from 'next/link';
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full text-center">
      <h1 className="text-9xl font-extrabold tracking-widest animate-bounce">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-bold">Oops! Page Not Found</h2>
      <p className="mt-2 text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
      <p className="mt-3 text-sm animate-pulse">
        Click the button to go back to safety!
      </p>
    </div>
  );
};

export default NotFound;
