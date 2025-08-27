import AppBody from '@/components/AppBody';
import AppNavbar from '@/components/AppNavBar';
import { WithChildren } from '@/types';

interface IHeaderOnlyLayoutProps extends WithChildren {}

export default function HeaderOnlyLayout({ children }: IHeaderOnlyLayoutProps) {
  return (
    <>
      <AppNavbar />
      <AppBody>{children}</AppBody>
    </>
  );
}
