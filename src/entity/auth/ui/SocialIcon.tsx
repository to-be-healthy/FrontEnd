import { ReactElement } from 'react';

import {
  IconAppleLogo,
  IconGoogleLogoCircle,
  IconKakaoLogoCircle,
  IconNaverLogoCircle,
} from '@/shared/assets';
import { cn } from '@/shared/utils';

import { SocialType } from '../model/types';

interface socialProvider {
  name: string;
  logo: ReactElement;
  style: string;
}
const socialProviders: Record<Exclude<SocialType, 'NONE'>, socialProvider> = {
  NAVER: {
    name: '네이버',
    logo: <IconNaverLogoCircle />,
    style: 'bg-[#03C75A]',
  },
  GOOGLE: {
    name: '구글',
    logo: <IconGoogleLogoCircle />,
    style: 'border border-gray-200',
  },
  KAKAO: {
    name: '카카오',
    logo: <IconKakaoLogoCircle />,
    style: 'bg-[#FEE500]',
  },
  APPLE: { name: '애플', logo: <IconAppleLogo />, style: 'bg-black' },
};

const SocialIcon = ({ socialType }: { socialType: Exclude<SocialType, 'NONE'> }) => {
  const social = socialProviders[socialType];

  return (
    <span className={cn('flex-center h-[44px] w-[44px] rounded-full', social.style)}>
      {social.logo}
    </span>
  );
};

export { SocialIcon, socialProviders };
