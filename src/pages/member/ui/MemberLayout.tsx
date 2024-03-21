'use client';

import { MemberNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const MemberLayout = ({ children }: ComponentProps) => {
  return (
    <section>
      {children}
      <MemberNavigationBar />
    </section>
  );
};

export default MemberLayout;
