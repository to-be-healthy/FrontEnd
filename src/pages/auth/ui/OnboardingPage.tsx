'use client';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { SocialSignIn } from '@/features/auth/ui';
import IconBack from '@/shared/assets/images/icon_back.svg';
import Logo from '@/shared/assets/images/logo.svg';
import { Button, RollingBanner } from '@/shared/ui';

import AuthLayout from './AuthLayout';

const SelectMemberTypePage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-around px-5'>
      <div className='flex flex-col items-center gap-y-9'>
        <Logo />
        <h1 className='typography-heading-1 whitespace-pre-wrap break-keep text-center'>{`안녕하세요!\n건강해짐입니다!`}</h1>
      </div>
      <div className='typography-heading-4 flex w-full flex-col gap-y-3'>
        <Button
          className='h-20 bg-gray-100 p-0 px-[42px] py-[10px] font-bold text-black'
          asChild>
          <Link href='?type=trainer'>트레이너로 시작</Link>
        </Button>
        <Button
          className='h-20 bg-gray-100 p-0 px-[42px] py-[10px] font-bold text-black'
          asChild>
          <Link href='?type=student'>회원으로 시작</Link>
        </Button>
      </div>
    </div>
  );
};

const SelectLoginMethodPage = ({ memberType }: { memberType: string }) => {
  const router = useRouter();

  if (memberType !== 'trainer' && memberType !== 'student') {
    return redirect('/');
  }

  return (
    <>
      <header className='flex h-14 items-center justify-between px-[20px] py-[16px]'>
        <Button variant='ghost' size='icon' onClick={() => router.back()}>
          <IconBack />
        </Button>
      </header>
      <div className={'mt-[60px] flex flex-col items-center gap-y-9'}>
        <h1 className='typography-heading-1 whitespace-pre-wrap break-keep text-center'>
          {`차별화된 PT 서비스를\n경험해보세요!`}
        </h1>
        <RollingBanner>
          <div className='mx-[5px] flex w-[120px] flex-col items-center gap-y-[14px] rounded-[12px] bg-[#FFDC7A] px-4 py-[17px]'>
            <Image
              src='/images/icon_bell.png'
              width={80}
              height={80}
              alt='Slide image of money'
            />
            <p className='typography-body-1 text-white'>일정관리</p>
          </div>
          <div className='mx-[5px] flex w-[120px] flex-col items-center gap-y-[14px] rounded-[12px] bg-[#95EBAB] px-4 py-[17px]'>
            <Image
              src='/images/icon_pay.png'
              width={80}
              height={80}
              alt='Slide image of money'
            />
            <p className='typography-body-1 text-white'>급여관리</p>
          </div>
          <div className='mx-[5px] flex w-[120px] flex-col  items-center gap-y-[14px] rounded-[12px] bg-[#82C3FF] px-4 py-[17px]'>
            <Image
              src='/images/icon_calendar.png'
              width={80}
              height={80}
              alt='Slide image of calendar'
            />
            <p className='typography-body-1 text-white'>회원관리</p>
          </div>
          <div className='mx-[5px] flex w-[120px] flex-col items-center gap-y-[14px] rounded-[12px] bg-[#FFBFDB] px-4 py-[17px]'>
            <Image
              src='/images/icon_dumbell.png'
              width={80}
              height={80}
              alt='Slide image of calendar'
            />
            <p className='typography-body-1 text-white'>루틴생성</p>
          </div>
        </RollingBanner>
      </div>
      <div className={'flex flex-col items-center justify-center px-5 py-12'}>
        <SocialSignIn memberType={memberType} />
        <Button
          asChild
          variant='link'
          className='typography-title-3 mt-5 font-semibold text-gray-500 hover:no-underline'>
          <Link href={`/signin?type=${memberType}`}>아이디 로그인</Link>
        </Button>
        <p className='w-2/3 break-keep text-center text-[11px] font-normal text-gray-400'>
          로그인 시{' '}
          <Link href='#' className='underline'>
            개인정보 처리방침
          </Link>{' '}
          및{' '}
          <Link href='#' className='underline'>
            서비스 이용약관에
          </Link>{' '}
          동의함으로 간주합니다.
        </p>
      </div>
    </>
  );
};

export const OnboardingPage = () => {
  const params = useSearchParams();
  const type = params?.get('type');

  return (
    <AuthLayout>
      {!type && <SelectMemberTypePage />}
      {type && <SelectLoginMethodPage memberType={type} />}
    </AuthLayout>
  );
};
