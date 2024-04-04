import { HTMLAttributes } from 'react';

import { cn } from '../utils';

const RollingBanner = ({ className, children }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div className='absolute flex w-fit animate-rolling flex-nowrap'>{children}</div>
      <div className='flex h-full w-fit animate-rolling_clone flex-nowrap'>
        {children}
      </div>
    </div>
  );
};

export { RollingBanner };
