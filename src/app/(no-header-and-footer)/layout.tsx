import AppBody from '@/components/AppBody';
import { WithChildren } from '@/types';

interface INoHeaderAndFooterLayoutProps extends WithChildren {}

export default function NoHeaderAndFooterLayout({
  children
}: INoHeaderAndFooterLayoutProps) {
  return <AppBody>{children}</AppBody>;
}
