'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth } from '@/entity/auth';
import { OnboardingPage } from '@/page/auth';
import { FLEX_CENTER } from '@/shared/mixin';
import { cn } from '@/shared/utils';

export default function Page() {
  const [role, setRole] = useState<string | null>();

  useEffect(() => {
    const { memberType } = auth();
    const newRole = memberType ?? null;
    setRole(newRole);
  }, [role]);

  if (role === undefined) {
    return (
      <div className={cn(FLEX_CENTER, 'h-[100vh] w-[100vw] bg-primary-500')}>
        <Image src='/images/loading_splash.gif' width={88} height={88} alt='loading' />
      </div>
    );
  }

  if (role === null) {
    return <OnboardingPage />;
  }

  return redirect(`/${role?.toLowerCase()}`);
}
