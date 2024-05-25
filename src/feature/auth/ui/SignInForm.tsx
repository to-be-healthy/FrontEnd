import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthAction, useSignInMutation } from '@/entity/auth';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import { Button, TextInput, useToast } from '@/shared/ui';

import { LoginForm } from '../model/types';

export const SignInForm = ({ memberType }: { memberType: 'trainer' | 'student' }) => {
  const router = useRouter();
  const { mutate } = useSignInMutation();
  const { setUserInfo } = useAuthAction();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (credentials) => {
    mutate(
      { ...credentials, memberType: memberType.toUpperCase() },
      {
        onSuccess: ({ data }) => {
          setUserInfo(data);
          router.replace(`/${data.memberType?.toLowerCase()}`);
        },
        onError: (error) => {
          const message = error.response?.data?.message ?? '문제가 발생했습니다.';

          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <ErrorIcon />
                <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
              </div>
            ),
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <form
      className='flex w-full flex-col items-center gap-y-6'
      onSubmit={handleSubmit(onSubmit)}>
      <div className='flex w-full flex-col gap-y-3'>
        <label htmlFor='id' className='typography-title-3 text-gray-800'>
          아이디
        </label>
        <TextInput
          id='id'
          type='text'
          inputMode='text'
          placeholder='아이디를 입력해주세요.'
          containerClassName='h-[44px] w-full'
          className={errors.userId && 'border-point focus:border-point'}
          {...register('userId', {
            required: {
              value: true,
              message: '아이디를 입력해주세요.',
            },
          })}
        />
        {errors.userId && (
          <span className='typography-body-4 text-point'>{errors.userId.message}</span>
        )}
      </div>
      <div className='flex w-full flex-col gap-y-3'>
        <label htmlFor='password' className='typography-title-3 text-gray-800'>
          비밀번호
        </label>
        <TextInput
          id='password'
          type='password'
          inputMode='text'
          containerClassName='h-[44px] w-full'
          className={errors.password && 'border-point focus:border-point'}
          placeholder='비밀번호를 입력해주세요.'
          {...register('password', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요.',
            },
          })}
        />
        {errors.password && (
          <span className='typography-body-4 text-point'>{errors.password.message}</span>
        )}
      </div>
      <div className='mt-[18px] flex w-full flex-col gap-y-2.5'>
        <Button className='typography-title-1' type='submit' size='full'>
          로그인
        </Button>
        <Button
          className='typography-title-1 border-primary-500 text-primary-500'
          variant='outline'
          size='full'
          asChild>
          <Link href={`/sign-up?type=${memberType}`}>회원가입</Link>
        </Button>
      </div>
    </form>
  );
};
