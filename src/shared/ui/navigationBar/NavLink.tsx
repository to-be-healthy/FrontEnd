import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const StyleLink = styled(Link)<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? 'red' : '#ddd')};
`;

interface Props {
  href: string;
  children: React.ReactNode;
}
export const NavLink = ({ href, children }: Props) => {
  const router = usePathname();
  const isActive = router === href;

  return (
    <StyleLink href={href} $isActive={isActive}>
      {children}
    </StyleLink>
  );
};
