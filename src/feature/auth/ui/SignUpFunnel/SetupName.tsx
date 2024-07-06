'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { NAME_REGEXP, SignUpFormType } from '@/entity/auth';
import { Typography } from '@/shared/mixin';
import { TextInput } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useInvitationInfoQuery } from '../../api/useInvitationInfoQuery';

export const SetupName = () => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  const searchParams = useSearchParams();
  const uuid = searchParams?.get('uuid');

  const { data } = useInvitationInfoQuery(uuid ?? '');

  const nameValue = data ? data.name : watch('name');

  useEffect(() => {
    clearErrors('name');
  }, [nameValue]);

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
    }
  }, [data]);

  return (
    <div className='flex flex-col'>
      <label htmlFor='name' className={cn(Typography.TITLE_3, 'mb-3 text-gray-800')}>
        이름
      </label>
      <TextInput
        id='name'
        inputMode='text'
        containerClassName='h-[50px] w-full'
        className={errors.name && 'border-point focus:border-point'}
        value={nameValue}
        placeholder='실명을 입력해주세요'
        clearValueButton={() => setValue('name', '')}
        {...register('name', {
          minLength: {
            value: 2,
            message: '이름은 최소 2자 이상 입력해주세요.',
          },
          pattern: {
            value: NAME_REGEXP,
            message: '한글 또는 영문만 입력해주세요',
          },
        })}
      />
      {errors.name && (
        <p className={cn(Typography.BODY_4, 'mt-3 text-point')}>{errors.name.message}</p>
      )}
    </div>
  );
};
