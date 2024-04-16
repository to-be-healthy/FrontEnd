import { FormEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { ID_REGEXP, SignUpFormType } from '@/entity/auth';
import { Button, TextInput } from '@/shared/ui';

interface Props {
  idSuccessMsg: string;
  handleIsIdAvailable: (e: FormEvent<HTMLButtonElement>) => void;
  isPending: boolean;
}
export const SetupId = ({ idSuccessMsg, isPending, handleIsIdAvailable }: Props) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  const userIdValue = watch('userId');

  return (
    <div className='mb-[16px] flex flex-col'>
      <label htmlFor='id' className='typography-title-3 mb-3 text-gray-800'>
        아이디
      </label>
      <div className='flex items-center justify-between'>
        <TextInput
          id='userId'
          containerClassName='h-[44px] w-[calc(100%-76px-6px)]'
          className={
            (errors.userId && 'border-point focus:border-point') ??
            (idSuccessMsg && 'border-primary-500')
          }
          value={userIdValue}
          placeholder='아이디를 입력해주세요'
          clearValueButton={() => setValue('userId', '')}
          {...register('userId', {
            pattern: {
              value: ID_REGEXP,
              message: '영문, 숫자 4자리 이상 입력해주세요.',
            },
          })}
        />
        <Button
          type='button'
          className='typography-heading-5 h-[44px] w-[76px] rounded-md'
          onClick={handleIsIdAvailable}
          disabled={isPending}>
          중복확인
        </Button>
      </div>

      {errors.userId && (
        <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
          {errors.userId.message}
        </p>
      )}
      {idSuccessMsg && (
        <p className='typography-body-4 mt-[8px] text-primary-500'>{idSuccessMsg}</p>
      )}
    </div>
  );
};
