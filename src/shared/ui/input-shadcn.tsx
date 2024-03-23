import * as React from 'react';

import { cn } from '@/shared/utils/tw-utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'typography-body-3 flex h-11 w-full rounded-md border border-gray-200 bg-background px-4 text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border focus:border-primary-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
