import { WithChildren } from '@/types';

interface IAuthLayoutProps extends WithChildren {}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return <div className="flex-center min-h-screen w-full">{children}</div>;
}
