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
  const id_token = searchParams?.get('id_token');
  const user = searchParams?.get('user');

  const router = useRouter();
  const { mutate } = useSocialSignInMutation();
  const { setUserInfo } = useAuthAction();

  useEffect(() => {
    if (!code || !state) return router.replace('/');

    const stringifiedValue = localStorage.getItem(state);
    localStorage.removeItem(state);
    if (!stringifiedValue) {
      alert('문제가 발생했습니다.');
      return router.replace('/');
    }

    const { memberType, uuid } = JSON.parse(stringifiedValue) as StateType;

    mutate(
      {
        provider,
        code,
        state,
        memberType: memberType.toUpperCase(),
        ...(uuid && { uuid }),
        ...(id_token && { id_token }),
        ...(user && { user }),
      },
      {
        onSuccess: (result) => {
          const data = result.data;
          setUserInfo(data);
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            window.flutter_inappwebview.callHandler('Channel', data.memberId);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
          router.push(`/${data.memberType?.toLowerCase()}`);
        },
        onError: (error) => {
          const message = error.response?.data.message ?? '문제가 발생했습니다.';
          alert(message);
          router.replace('/');
        },
      }
    );
  }, []);

  if (!code || !state) throw new Error();

  return null;
}
