import { FormEvent, forwardRef } from 'react';

import TextDeleteIcon from '@/shared/assets/images/icon_text_delete.svg';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/tw-utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  value: string;
  clearValueButton: (e: FormEvent<HTMLButtonElement>) => void;
  isEmailVerified?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      defaultValue,
      className,
      inputClassName,
      value,
      clearValueButton,
      isEmailVerified,
      ...props
    }: InputProps,
    inputRef
  ) => {
    return (
      <div className={cn('relative', className)}>
        <input
          className={cn(
            'typography-body-3 placeholder:typography-body-3 h-full w-full rounded-md border border-solid border-gray-200 p-6 text-gray-800 outline-none placeholder:text-gray-500 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:visible focus:border focus:border-primary-500 disabled:bg-gray-100 disabled:shadow-gray-100',
            inputClassName
          )}
          type='text'
          defaultValue={defaultValue}
          disabled={isEmailVerified}
          ref={inputRef}
          {...props}
        />
        {!isEmailVerified && (
          <Button
            className={cn(
              'absolute right-[16px] top-[50%] hidden h-auto w-auto translate-y-[-50%] bg-transparent p-0',
              {
                block: value !== '' && value !== undefined,
              }
            )}
            onClick={clearValueButton}>
            <TextDeleteIcon />
          </Button>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
