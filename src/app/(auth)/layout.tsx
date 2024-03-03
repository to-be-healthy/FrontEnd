'use client';

import { MemberNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: ComponentProps) => {
  return (
    <div>
      {children}
      <MemberNavigationBar />
    </div>
  );
};

export default AuthLayout;
