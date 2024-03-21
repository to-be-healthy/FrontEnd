// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const StyleLink = styled(Link)<{ $isActive: boolean }>`
//   color: ${(props) => (props.$isActive ? 'red' : '#ddd')};
// `;

// interface Props {
//   href: string;
//   children: React.ReactNode;
// }
export const NavLink = () => {
  // const router = usePathname();
  // const isActive = router === href;

  return (
    <div>navlink</div>
    // <StyleLink href={href} $isActive={isActive}>
    //   {children}
    // </StyleLink>
  );
};
