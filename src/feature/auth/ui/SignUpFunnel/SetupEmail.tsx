import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { EMAIL_REGEXP, SignUpFormType } from '@/entity/auth';
import { EmailInput } from '@/shared/ui';

interface SetupEmailProps {
  step: number;
  isEmailVerified: boolean;
}

export const SetupEmail = ({ isEmailVerified }: SetupEmailProps) => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  const emailValue = watch('email');

  useEffect(() => {
    clearErrors('email');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue]);

  return (
    <div className='mb-[16px] flex flex-col'>
      <label htmlFor='email' className='typography-title-3 mb-3 text-gray-800'>
        이메일
      </label>
      <EmailInput
        id='email'
        inputMode='email'
        className={errors.email && 'border-point focus:border-point'}
        value={emailValue}
        placeholder='사용 가능한 이메일을 입력해주세요'
        isEmailVerified={isEmailVerified}
        clearValueButton={() => setValue('email', '')}
        {...register('email', {
          pattern: {
            value: EMAIL_REGEXP,
            message: '이메일 형식이 아닙니다',
          },
        })}
      />

      {errors.email && (
        <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
          {errors.email.message}
        </p>
      )}
    </div>
  );
};
