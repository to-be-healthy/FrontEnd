import Image from 'next/image';

import GoogleLogo from '@/shared/assets/images/google_logo.svg';
import KakaoLogo from '@/shared/assets/images/kakao_logo.svg';
import NaverLogo from '@/shared/assets/images/naver_logo.svg';

export const OnboardingPage = () => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정
        'w-dvh flex h-dvh items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col justify-between bg-white'>
        <div className={'mt-[140px] flex flex-col items-center gap-y-9'}>
          <h1 className='typography-heading-1 whitespace-pre-wrap break-words text-center'>
            {`차별화된 PT 서비스를\n경험해보세요!`}
          </h1>
          <div className='flex gap-x-2.5'>
            <div className='flex flex-col items-center gap-y-[14px] rounded-[12px] bg-[#95EBAB] px-4 py-[17px]'>
              <Image
                src='/images/icon_pay.png'
                width={80}
                height={80}
                alt='Slide image of money'
              />
              <p className='typography-body-1 text-white'>급여 관리</p>
            </div>
            <div className='flex flex-col items-center gap-y-[14px] rounded-[12px] bg-[#82C3FF] px-4 py-[17px]'>
              <Image
                src='/images/icon_calendar.png'
                width={80}
                height={80}
                alt='Slide image of calendar'
              />
              <p className='typography-body-1 text-white'>회원 관리</p>
            </div>
          </div>
        </div>
        <div className={'flex flex-col items-center justify-center px-5 py-12'}>
          <div className='flex w-full flex-col gap-y-2.5'>
            <button className='flex h-[48px] w-full items-center justify-center gap-x-2 rounded-xl bg-[#FEE500] p-[10px]'>
              <KakaoLogo />
              <p className='typography-title-4'>카카오로 시작하기</p>
            </button>
            <button className='flex h-[48px] w-full items-center justify-center gap-x-2 rounded-xl bg-[#03C75A] p-[10px]'>
              <NaverLogo />
              <p className='typography-title-4 text-white'>네이버로 시작하기</p>
            </button>
            <button className='flex h-[48px] w-full items-center justify-center gap-x-2 rounded-xl border border-gray-600 bg-white p-[10px]'>
              <GoogleLogo />
              <p className='typography-title-4 text-gray-600'>Google로 시작하기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
