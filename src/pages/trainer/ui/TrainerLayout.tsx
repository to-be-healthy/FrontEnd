'use client';

import { TrainerNavigationBar } from '@/shared/ui/navigationBar';

interface ComponentProps {
  children: React.ReactNode;
}

const TrainerLayout = ({ children }: ComponentProps) => {
  return (
    <section>
      {children}
      <TrainerNavigationBar />
    </section>
  );
};

export default TrainerLayout;
