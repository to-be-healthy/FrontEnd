import { MembersNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: ComponentProps) => {
  return (
    <div>
      {children}
      <MembersNavigationBar />
    </div>
  );
};

export default AuthLayout;
