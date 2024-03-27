import { forwardRef } from 'react';

import { cn } from '@/shared/utils/tw-utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isEmailVerified: boolean;
  className?: string;
}

export const EmailInput = forwardRef<HTMLInputElement, InputProps>(
  ({ isEmailVerified, className, ...props }: InputProps, inputRef) => {
    return (
      <div className='h-[44px] w-full'>
        <input
          type='email'
          className={cn(
            'typography-body-3 placeholder:typography-body-3 diabled:bg-gray-100 h-full w-full rounded-md border border-solid border-gray-200 p-6 text-gray-800 outline-none placeholder:text-gray-500 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:visible focus:border focus:border-primary-500 disabled:shadow-gray-100',
            className
          )}
          disabled={isEmailVerified}
          ref={inputRef}
          {...props}
        />
      </div>
    );
  }
);

EmailInput.displayName = 'EmailInput';
