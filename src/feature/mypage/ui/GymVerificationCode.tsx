'use client';

import { useEffect, useRef } from 'react';

import { Typography } from '@/shared/mixin';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  authValue: string;
  setAuthValue: React.Dispatch<React.SetStateAction<string>>;
}

export const GymVerificationCode = ({ authValue, setAuthValue }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div>
      <p className={cn(Typography.HEADING_1, 'mb-[30px] text-center')}>
        인증 코드를 입력해 주세요.
      </p>
      <div className='flex justify-center'>
        <InputOTP
          ref={ref}
          className='h-60px'
          maxLength={6}
          value={authValue}
          onChange={(value) => setAuthValue(value)}>
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => i).map((_, index) => {
              return (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={cn(
                    Typography.HEADING_1,
                    'rounded-[6px] bg-gray-100 text-black'
                  )}
                />
              );
            })}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};
