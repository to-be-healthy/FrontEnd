import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, inputRef) => {
    return (
      <input
        className={cn(
          'outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]',
          className
        )}
        type='text'
        ref={inputRef}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
