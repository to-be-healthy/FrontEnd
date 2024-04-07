import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { regexp, SignUpFormType } from '@/entities/auth';
import { TextInput } from '@/shared/ui';

export const SetupName = () => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpFormType>();

  const nameValue = watch('name');

  useEffect(() => {
    clearErrors('name');
  }, [nameValue]);

  return (
    <div className='flex flex-col'>
      <label htmlFor='name' className='typography-title-3 mb-3 text-gray-800'>
        이름
      </label>
      <TextInput
        id='name'
        inputMode='text'
        containerClassName='h-[44px] w-full'
        className={errors.name && 'border-point focus:border-point'}
        value={nameValue}
        placeholder='실명'
        clearValueButton={() => setValue('name', '')}
        {...register('name', {
          minLength: {
            value: 2,
            message: '이름은 최소 2자 이상 입력해주세요.',
          },
          pattern: {
            value: regexp.NAME_REGEXP,
            message: '한글 또는 영문만 입력해주세요',
          },
        })}
      />
      {errors.name && (
        <p className='typography-body-4 mt-[8px] text-[#FF4668]'>{errors.name.message}</p>
      )}
    </div>
  );
};
