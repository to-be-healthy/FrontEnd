'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth } from '@/entities/auth';

export const UserRoleMiddleware = ({
  memberType,
  children,
}: {
  memberType: 'STUDENT' | 'TRAINER';
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState<string | null>();
  const [gymId, setGymId] = useState<string | null>();

  useEffect(() => {
    const { memberType: currentType, gymId: currentGymId } = auth();
    setRole(currentType);
    setGymId(currentGymId);
  }, [gymId, memberType]);

  // 로그인 안된 상태
  if (role === null) return redirect('/');

  // 다른 역할로 접근 시
  if (typeof role === 'string' && role !== memberType)
    return redirect(`/${role.toLowerCase()}`);

  // 헬스장 미선택 시
  if (gymId === null) return redirect('/selectgym');

  if (typeof role === 'string' && role === memberType) return children;

  return null;
};
