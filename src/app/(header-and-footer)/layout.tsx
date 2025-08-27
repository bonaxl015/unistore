import AppBody from '@/components/AppBody';
import AppFooter from '@/components/AppFooter';
import AppNavbar from '@/components/AppNavBar';
import { WithChildren } from '@/types';

interface IHeaderAndFooterLayoutProps extends WithChildren {}

export default function HeaderAndFooterLayout({
  children
}: IHeaderAndFooterLayoutProps) {
  return (
    <>
      <AppNavbar />
      <AppBody>{children}</AppBody>
      <AppFooter />
    </>
  );
}
