'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { SocialProvider, useAuthAction, useSocialSignInMutation } from '@/entity/auth';

interface StateType {
  memberType: 'trainer' | 'student';
  uuid?: string;
}

interface Props {
  params: { provider: SocialProvider };
}

export default function Page({ params }: Props) {
  const provider = params.provider;
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  const state = searchParams?.get('state');

  const router = useRouter();
  const { mutate } = useSocialSignInMutation();
  const { setUserInfo } = useAuthAction();

  useEffect(() => {
    if (!code || !state) return router.replace('/');

    const stringifiedValue = localStorage.getItem(state);
    localStorage.removeItem(state);
    if (!stringifiedValue) {
      throw new Error();
    }

    const { memberType, uuid } = JSON.parse(stringifiedValue) as StateType;

    mutate(
      {
        provider,
        code,
        state,
        memberType: memberType.toUpperCase(),
        ...(uuid && { uuid }),
      },
      {
        onSuccess: (result) => {
          const data = result.data;
          setUserInfo(data);
          router.replace(`/${data.memberType.toLowerCase()}`);
        },
        onError: (error) => {
          const message = error.response?.data.message ?? '문제가 발생했습니다.';
          alert(message);
          router.replace('/');
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!code || !state) throw new Error();

  return null;
}
