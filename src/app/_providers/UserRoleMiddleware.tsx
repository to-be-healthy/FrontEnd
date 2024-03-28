'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth } from '@/entities/auth';

export const UserRoleMiddleware = ({
  memberType,
  children,
}: {
  memberType: 'MEMBER' | 'TRAINER';
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState<string | null>();

  useEffect(() => {
    const { memberType: currentType } = auth();
    setRole(currentType);
  }, [memberType]);

  // 로그인 안된 상태
  if (role === null) return redirect('/');

  // 다른 역할로 접근 시
  if (typeof role === 'string' && role !== memberType)
    return redirect(`/${role.toLowerCase()}`);

  if (typeof role === 'string' && role === memberType) return children;

  return null;
};
