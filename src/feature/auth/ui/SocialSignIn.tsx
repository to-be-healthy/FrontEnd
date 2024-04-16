import {
  GOOGLE_SOCIAL_AUTH_URL,
  KAKAO_SOCIAL_AUTH_URL,
  NAVER_SOCIAL_AUTH_URL,
} from '@/entity/auth';
import GoogleLogo from '@/shared/assets/images/google_logo.svg';
import KakaoLogo from '@/shared/assets/images/kakao_logo.svg';
import NaverLogo from '@/shared/assets/images/naver_logo.svg';
import { Button } from '@/shared/ui';

interface Props {
  memberType: 'trainer' | 'student';
  uuid?: string;
}

export const SocialSignIn = ({ memberType, uuid }: Props) => {
  const generateClientState = () => {
    const state = window.crypto.randomUUID();
    localStorage.setItem(
      state,
      JSON.stringify({
        memberType,
        ...(uuid && { uuid }),
      })
    );
    return state;
  };

  return (
    <div className='typography-title-2 flex w-full flex-col gap-y-2.5'>
      <Button
        className='h-[48px] gap-x-2 rounded-xl bg-[#FEE500] p-[10px] text-black'
        onClick={() => {
          window.location.href = `${KAKAO_SOCIAL_AUTH_URL}&state=${generateClientState()}`;
        }}>
        <KakaoLogo />
        카카오로 시작하기
      </Button>
      <Button
        className='h-[48px] gap-x-2 rounded-xl bg-[#03C75A] p-[10px] text-white'
        onClick={() => {
          window.location.href = `${NAVER_SOCIAL_AUTH_URL}&state=${generateClientState()}`;
        }}>
        <NaverLogo />
        네이버로 시작하기
      </Button>
      <Button
        className='h-[48px] gap-x-2 rounded-xl border border-gray-600 bg-white p-[10px] text-gray-600'
        onClick={() => {
          window.location.href = `${GOOGLE_SOCIAL_AUTH_URL}&state=${generateClientState()}`;
        }}>
        <GoogleLogo />
        Google로 시작하기
      </Button>
    </div>
  );
};
