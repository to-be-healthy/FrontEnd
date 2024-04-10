import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '../utils';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative h-[4px] w-full overflow-hidden rounded-full bg-blue-600/20',
        className
      )}
      {...props}>
      <div
        className='h-full w-full flex-1 rounded-full bg-white transition-all'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
);
Progress.displayName = 'Progress';

export { Progress };
