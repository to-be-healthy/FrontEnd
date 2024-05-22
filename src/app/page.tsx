'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth } from '@/entity/auth';
import { OnboardingPage } from '@/page/auth';

export default function Page() {
  const [role, setRole] = useState<string | null>();

  useEffect(() => {
    const { memberType } = auth();
    const newRole = memberType ?? null;
    setRole(newRole);
  }, [role]);

  if (role === undefined) {
    return '로딩중';
  }

  if (role === null) {
    return <OnboardingPage />;
  }

  return redirect(`/${role?.toLowerCase()}`);
}
