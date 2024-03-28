import { FormEvent, forwardRef, useState } from 'react';

import HidePasswordIcon from '@/shared/assets/images/icon_hide_password.svg';
import ShowPasswordIcon from '@/shared/assets/images/icon_show_password.svg';
import TextDeleteIcon from '@/shared/assets/images/icon_text_delete.svg';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/tw-utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasClear?: boolean;
  className?: string;
  clearValueButton?: (e: FormEvent<HTMLButtonElement>) => void;
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, clearValueButton, ...props }: InputProps, inputRef) => {
    const [isShowPassword, setIsShowPassword] = useState(true);

    const handlePasswordIconClick = (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsShowPassword((prev) => !prev);
    };

    return (
      <div className='relative h-[44px] w-full'>
        <input
          ref={inputRef}
          type={isShowPassword ? 'password' : 'text'}
          className={cn(
            'typography-body-3 placeholder:typography-body-3 h-full w-full rounded-md border border-solid border-gray-200 p-6 text-gray-800 outline-none placeholder:text-gray-500 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus:visible focus:border focus:border-primary-500',
            className
          )}
          {...props}
        />
        <Button
          className={cn(
            'absolute right-[55px] top-[50%] hidden h-auto w-auto translate-y-[-50%] bg-transparent p-0',
            {
              block: value !== '' && value !== undefined,
            }
          )}
          onClick={clearValueButton}>
          <TextDeleteIcon />
        </Button>
        <Button
          onClick={handlePasswordIconClick}
          variant='ghost'
          className='absolute right-[20px] p-0'>
          {isShowPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
