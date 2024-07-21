'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { SocialSignIn } from '@/feature/auth';
import { IconBack, IconLogo } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout, RollingBanner } from '@/widget';

const SelectLoginMethodPage = ({ memberType }: { memberType: string }) => {
  const router = useRouter();

  if (memberType !== 'trainer' && memberType !== 'student') {
    return redirect('/');
  }

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
      </Layout.Header>
      <Layout.Contents>
        <div
          className={
            'mt-12 flex w-screen max-w-[var(--max-width)] flex-col items-center gap-y-9'
          }>
          <h1
            className={cn(
              Typography.HEADING_1,
              'whitespace-pre-wrap break-keep text-center'
            )}>
            {`차별화된 PT 서비스를\n경험해보세요!`}
          </h1>
          <RollingBanner>
            <div className='flex w-[120px] flex-col items-center gap-y-[14px] rounded-lg bg-[#FFDC7A] px-4 py-[17px]'>
              <Image
                src='/images/icon_bell.png'
                width={80}
                height={80}
                alt='Slide image of money'
              />
              <p className={cn(Typography.BODY_1, 'text-white')}>일정관리</p>
            </div>
            <div className='flex w-[120px] flex-col  items-center gap-y-[14px] rounded-lg bg-[#82C3FF] px-4 py-[17px]'>
              <Image
                src='/images/icon_calendar.png'
                width={80}
                height={80}
                alt='Slide image of calendar'
              />
              <p className={cn(Typography.BODY_1, 'text-white')}>회원관리</p>
            </div>
            <div className='flex w-[120px] flex-col items-center gap-y-[14px] rounded-lg bg-[#FFBFDB] px-4 py-[17px] placeholder:mx-[5px]'>
              <Image
                src='/images/icon_dumbell.png'
                width={80}
                height={80}
                alt='Slide image of calendar'
              />
              <p className={cn(Typography.BODY_1, 'text-white')}>루틴생성</p>
            </div>
          </RollingBanner>
        </div>
        <div className={'flex flex-col items-center justify-center px-7 py-12'}>
          <SocialSignIn memberType={memberType} />
          <Button
            asChild
            variant='link'
            className={cn(Typography.TITLE_3, 'mt-5 text-gray-500 hover:no-underline')}>
            <Link href={`/sign-in?type=${memberType}`}>아이디 로그인</Link>
          </Button>
          <Link
            href={'/cs'}
            className={cn(
              Typography.BODY_4_REGULAR,
              'mt-10 w-2/3 break-keep text-center text-gray-400 underline underline-offset-4'
            )}
            rel='noreferrer'>
            건강해짐 고객센터
          </Link>
        </div>
      </Layout.Contents>
    </Layout>
  );
};

export const OnboardingPage = () => {
  const params = useSearchParams();
  const type = params?.get('type');

  if (type) {
    return <SelectLoginMethodPage memberType={type} />;
  }

  return (
    <Layout className='bg-white'>
      <Layout.Header />
      <Layout.Contents className='flex h-full flex-col items-center justify-around px-7'>
        <div className='flex flex-col items-center gap-y-9'>
          <IconLogo width={64} height={64} />
          <h1
            className={cn(
              Typography.HEADING_1,
              'whitespace-pre-wrap break-keep text-center'
            )}>{`안녕하세요!\n건강해짐입니다!`}</h1>
        </div>
        <div className='flex w-full flex-col gap-y-5'>
          <Button
            className={cn(Typography.HEADING_4, 'h-[80px] bg-gray-100 text-black')}
            asChild>
            <Link href='?type=trainer'>트레이너로 시작</Link>
          </Button>
          <Button
            className={cn(Typography.HEADING_4, 'h-[80px] bg-gray-100 text-black')}
            asChild>
            <Link href='?type=student'>회원으로 시작</Link>
          </Button>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
