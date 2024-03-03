import { MemberNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const MemberLayout = ({ children }: ComponentProps) => {
  return (
    <div>
      {children}
      <MemberNavigationBar />
    </div>
  );
};

export default MemberLayout;
