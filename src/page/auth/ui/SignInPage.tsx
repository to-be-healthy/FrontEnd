'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { SignInForm } from '@/feature/auth';
import { IconBack, IconLogo } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Separator } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const SignInPage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const memberType = params?.get('type');

  if (memberType !== 'trainer' && memberType !== 'student') {
    throw new Error('잘못된 접근입니다.');
  }

  const title = memberType === 'student' ? '회원 로그인' : '트레이너 로그인';

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-black'
          )}>
          {title}
        </h2>
        <Button variant='ghost' className='p-0' onClick={() => router.push('/')}>
          <IconBack />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <div className='flex flex-col items-center px-[20px]'>
          <div className='mb-[55px] mt-[40px]'>
            <IconLogo width={64} height={64} />
          </div>
          <SignInForm memberType={memberType} />
          <ul className='mt-11 flex items-center gap-x-5'>
            <li
              className={cn(Typography.BODY_3, 'cursor-pointer text-gray-500')}
              onClick={() => router.push('/find/pw')}>
              비밀번호 찾기
            </li>
            <li>
              <Separator className='h-[12px]' orientation='vertical' />
            </li>
            <li
              className={cn(Typography.BODY_3, 'cursor-pointer text-gray-500')}
              onClick={() => router.push('/find/id')}>
              아이디 찾기
            </li>
          </ul>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
