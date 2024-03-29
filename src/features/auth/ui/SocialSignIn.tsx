import Link from 'next/link';

import {
  GOOGLE_SOCIAL_AUTH_URL,
  KAKAO_SOCIAL_AUTH_URL,
  NAVER_SOCIAL_AUTH_URL,
} from '@/entities/auth';
import GoogleLogo from '@/shared/assets/images/google_logo.svg';
import KakaoLogo from '@/shared/assets/images/kakao_logo.svg';
import NaverLogo from '@/shared/assets/images/naver_logo.svg';
import { Button } from '@/shared/ui';

interface Props {
  memberType: 'trainer' | 'member';
}

export const SocialSignIn = ({ memberType }: Props) => {
  return (
    <div className='typography-title-2 flex w-full flex-col gap-y-2.5'>
      <Button
        asChild
        className='h-[48px] gap-x-2 rounded-xl bg-[#FEE500] p-[10px] text-black'>
        <Link href={`${KAKAO_SOCIAL_AUTH_URL}&state=${memberType}`}>
          <KakaoLogo />
          카카오로 시작하기
        </Link>
      </Button>
      <Button
        asChild
        className='h-[48px] gap-x-2 rounded-xl bg-[#03C75A] p-[10px] text-white'>
        <Link href={`${NAVER_SOCIAL_AUTH_URL}&state=${memberType}`}>
          <NaverLogo />
          네이버로 시작하기
        </Link>
      </Button>
      <Button
        asChild
        className='h-[48px] gap-x-2 rounded-xl border border-gray-600 bg-white p-[10px] text-gray-600'>
        <Link href={`${GOOGLE_SOCIAL_AUTH_URL}&state=${memberType}`}>
          <GoogleLogo />
          Google로 시작하기
        </Link>
      </Button>
    </div>
  );
};
