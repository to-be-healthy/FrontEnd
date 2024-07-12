import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

const RollingBanner = ({ className, children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div className='absolute flex w-fit animate-rolling flex-nowrap gap-4'>
        {children}
        {children}
      </div>
      <div className='ml-4 flex h-full w-fit animate-rolling_clone flex-nowrap gap-4'>
        {children}
        {children}
      </div>
    </div>
  );
};

export { RollingBanner };
