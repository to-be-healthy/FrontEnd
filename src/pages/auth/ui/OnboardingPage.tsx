'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import GoogleLogo from '@/shared/assets/images/google_logo.svg';
import KakaoLogo from '@/shared/assets/images/kakao_logo.svg';
import Logo from '@/shared/assets/images/logo.svg';
import NaverLogo from '@/shared/assets/images/naver_logo.svg';
import { Button } from '@/shared/ui/button';
import { RollingBanner } from '@/shared/ui/rolling-banner';

import AuthLayout from './AuthLayout';

const SelectMemberTypePage = () => {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col items-center justify-around px-5'>
      <div className='flex flex-col items-center gap-y-9'>
        <Logo />
        <h1 className='typography-heading-1 whitespace-pre-wrap break-words text-center'>{`안녕하세요!\n건강해짐입니다!`}</h1>
      </div>
      <div className='flex w-full flex-col gap-y-3'>
        <Button
          className='rounded[12px] h-20 bg-gray-100 p-0 px-[42px] py-[10px]  hover:bg-gray-200'
          onClick={() => {
            router.push('/?type=trainer');
          }}>
          <p className='typography-heading-4 font-bold text-black'>트레이너로 시작</p>
        </Button>
        <Button
          className=' rounded[12px] h-20 bg-gray-100 p-0 px-[42px] py-[10px]  hover:bg-gray-200'
          onClick={() => router.push('/?type=member')}>
          <p className='typography-heading-4 font-bold text-black'>회원으로 시작</p>
        </Button>
      </div>
    </div>
  );
};

const SelectLoginMethodPage = () => {
  const router = useRouter();

  return (
    <>
      <div className={'mt-[140px] flex flex-col items-center gap-y-9'}>
        <h1 className='typography-heading-1 whitespace-pre-wrap break-words text-center'>
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
          <div className='mx-[5px] flex w-[120px] flex-col  items-center gap-y-[14px] rounded-[12px] bg-[#FFBFDB] px-4 py-[17px]'>
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
        <div className='flex w-full flex-col gap-y-2.5'>
          <Button className='h-[48px] gap-x-2 rounded-xl bg-[#FEE500] p-[10px] hover:bg-[#FEE500]'>
            <KakaoLogo />
            <p className='typography-title-4 text-black'>카카오로 시작하기</p>
          </Button>
          <Button className='h-[48px] gap-x-2 rounded-xl bg-[#03C75A] p-[10px] hover:bg-[#03C75A]'>
            <NaverLogo />
            <p className='typography-title-4 text-white'>네이버로 시작하기</p>
          </Button>
          <Button className='h-[48px] gap-x-2 rounded-xl border border-gray-600 bg-white p-[10px] hover:bg-white'>
            <GoogleLogo />
            <p className='typography-title-4 text-gray-600'>Google로 시작하기</p>
          </Button>
        </div>
        <Button
          variant='link'
          className='typography-title-5 mt-5 font-semibold text-gray-500 hover:no-underline'
          onClick={() => {
            router.push('/signin');
          }}>
          아이디 로그인
        </Button>
        <p className='w-2/3 break-words text-center text-[11px] font-normal text-gray-400'>
          로그인 시 개인정보 처리방침 및 서비스 이용약관에 동의함으로 간주합니다.
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
      {type && <SelectLoginMethodPage />}
    </AuthLayout>
  );
};
