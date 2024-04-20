'use client';

import { useSearchParams } from 'next/navigation';
import { createContext } from 'react';

import { EditMemo } from './EditMemo';
import { EditNickname } from './EditNickname';

interface Props {
  memberId: string;
}

export const StudentEditContext = createContext<{
  memberId: string;
  name: string;
  nickname: string;
} | null>(null);

const StudentEditPage = ({ memberId }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  const name = searchParams?.get('name');
  const nickname = searchParams?.get('nickname') ?? '';

  if (!type || !name) {
    throw new Error();
  }

  return (
    <StudentEditContext.Provider
      value={{
        memberId,
        name,
        nickname,
      }}>
      {type === 'memo' && <EditMemo />}
      {type === 'nickname' && <EditNickname />}
    </StudentEditContext.Provider>
  );
};

export { StudentEditPage };
