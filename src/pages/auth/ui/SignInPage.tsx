'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { SignInForm } from '@/features/auth/ui';
import IconClose from '@/shared/assets/images/icon_close.svg';
import Logo from '@/shared/assets/images/logo.svg';
import { Button, Separator } from '@/shared/ui';

import AuthLayout from './AuthLayout';

export const SignInPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const memberType = params?.get('type');
  if (memberType !== 'trainer' && memberType !== 'student') {
    throw new Error('잘못된 접근입니다.');
  }

  const title = memberType === 'student' ? '회원 로그인' : '트레이너 로그인';

  return (
    <AuthLayout>
      <header className='flex items-center justify-between px-5 py-4'>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
        <p className='typography-heading-4 flex h-full items-center'>{title}</p>
        <Button variant='ghost' onClick={() => router.push('/')}>
          <IconClose />
        </Button>
      </header>
      <div className='flex flex-col items-center px-5'>
        <div className='mb-[35px] mt-[18px]'>
          <Logo />
        </div>
        <SignInForm memberType={memberType} />
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
