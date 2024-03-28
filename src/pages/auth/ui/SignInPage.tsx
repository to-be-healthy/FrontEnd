'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import IconBack from '@/shared/assets/images/icon_back.svg';
import Logo from '@/shared/assets/images/logo.svg';
import { Button } from '@/shared/ui/button';
// TODO) input-shadcn -> 인풋 컴포넌트에 적용 후 파일 제거
import { Input } from '@/shared/ui/input-shadcn';
import { Separator } from '@/shared/ui/separator';

import AuthLayout from './AuthLayout';

interface LoginForm {
  username: string;
  password: string;
  trainer: string;
}

export const SignInPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get('type');

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (credentials) => {
    const { username, password } = credentials;
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      // 로그인 실패
      console.log('실패', res);
      return;
    }

    // 로그인 성공
    router.replace('/');
  };

  return (
    <AuthLayout>
      <header className='flex h-14 items-center justify-between px-5 py-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => {
            router.back();
          }}>
          <IconBack />
        </Button>
      </header>
      <div className='flex flex-col items-center px-5'>
        <div className='mb-[35px] mt-[18px]'>
          <Logo />
        </div>
        <form
          className='flex w-full flex-col items-center gap-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex w-full flex-col gap-y-2'>
            <label htmlFor='id'>아이디</label>
            <Input
              id='id'
              type='text'
              placeholder='아이디를 입력해주세요.'
              className={errors.username && 'border-point focus:border-point'}
              {...register('username', {
                required: {
                  value: true,
                  message: '아이디를 입력해주세요.',
                },
              })}
            />
            {errors.username && (
              <span className='typography-body-4 text-point'>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className='flex w-full flex-col gap-y-2'>
            <label htmlFor='password'>비밀번호</label>
            <Input
              id='password'
              type='password'
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
              <span className='typography-body-4 text-point'>
                {errors.password.message}
              </span>
            )}
          </div>
          <div className='mt-[18px] flex w-full flex-col gap-y-2.5'>
            <Button type='submit' size='full'>
              로그인
            </Button>
            <Button
              variant='outline'
              size='full'
              onClick={() => router.push(`/signup?type=${type}`)}>
              회원가입
            </Button>
          </div>
        </form>
        <ul className='mt-9 flex gap-x-3'>
          <li
            className='typography-body-3 cursor-pointer text-gray-500'
            onClick={() => router.push('/find/pw')}>
            비밀번호 찾기
          </li>
          <Separator orientation='vertical' />
          <li
            className='typography-body-3 cursor-pointer text-gray-500'
            onClick={() => router.push('/find/id')}>
            아이디 찾기
          </li>
        </ul>
      </div>
    </AuthLayout>
  );
};
