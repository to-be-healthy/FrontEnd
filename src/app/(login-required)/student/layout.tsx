import { UserRoleMiddleware } from '@/app/_providers';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <UserRoleMiddleware memberType='STUDENT'>{children}</UserRoleMiddleware>;
};

export default Layout;
