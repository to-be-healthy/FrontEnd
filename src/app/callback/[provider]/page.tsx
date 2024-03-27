'use client';

import { useSearchParams } from 'next/navigation';

interface Props {
  params: { provider: string };
}

export default function Page({ params }: Props) {
  const provider = params.provider;
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  // TODO) 추후 csrf 공격 방지 로직 추가
  const state = searchParams?.get('state');

  console.log(provider, code, state);

  if (!code || !state) throw new Error();

  return (
    <div>
      <p>code: {code}</p>
      <p>state: {state}</p>
    </div>
  );
}
