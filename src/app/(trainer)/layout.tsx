import { TrainerNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const TrainerLayout = ({ children }: ComponentProps) => {
  return (
    <div>
      {children}
      <TrainerNavigationBar />
    </div>
  );
};

export default TrainerLayout;
