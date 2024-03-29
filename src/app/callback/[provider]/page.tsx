'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useSocialSignInMutation } from '@/entities/auth/api';
import { Provider, useAuthAction } from '@/entities/auth/model';

interface Props {
  params: { provider: Provider };
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

    const memberType = state.toUpperCase();

    mutate(
      { provider, code, state, memberType },
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
