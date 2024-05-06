'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { SignInForm } from '@/feature/auth';
import IconClose from '@/shared/assets/images/icon_close.svg';
import Logo from '@/shared/assets/images/logo.svg';
import { Button, Layout, Separator } from '@/shared/ui';

export const SignInPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const memberType = params?.get('type');
  if (memberType !== 'trainer' && memberType !== 'student') {
    throw new Error('잘못된 접근입니다.');
  }

  const title = memberType === 'student' ? '로그인' : '트레이너 로그인';

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
        <p className='typography-heading-4 flex h-full items-center'>{title}</p>
        <Button variant='ghost' className='p-0' onClick={() => router.push('/')}>
          <IconClose width={20} height={20} />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <div className='flex flex-col items-center px-[20px]'>
          <div className='mb-[35px] mt-[18px]'>
            <Logo width='88px' height='88px' />
          </div>
          <SignInForm memberType={memberType} />
          <ul className='mt-9 flex items-center gap-x-5'>
            <li
              className='typography-body-3 cursor-pointer text-gray-500'
              onClick={() => router.push('/find/pw')}>
              비밀번호 찾기
            </li>
            <li>
              <Separator className='h-[12px]' orientation='vertical' />
            </li>
            <li
              className='typography-body-3 cursor-pointer text-gray-500'
              onClick={() => router.push('/find/id')}>
              아이디 찾기
            </li>
          </ul>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
