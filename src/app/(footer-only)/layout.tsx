import AppBody from '@/components/AppBody';
import AppFooter from '@/components/AppFooter';
import { WithChildren } from '@/types';

interface IFooterOnlyLayoutProps extends WithChildren {}

export default function FooterOnlyLayout({ children }: IFooterOnlyLayoutProps) {
  return (
    <>
      <AppBody>{children}</AppBody>
      <AppFooter />
    </>
  );
}
