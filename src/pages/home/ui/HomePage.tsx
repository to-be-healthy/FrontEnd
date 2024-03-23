'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/shared/ui/button';

import HomeLayout from './HomeLayout';

export const HomePage = () => {
  return (
    <HomeLayout>
      <div>
        <h1>홈페이지</h1>
        <Button variant='destructive' onClick={() => signOut()}>
          로그아웃
        </Button>
      </div>
    </HomeLayout>
  );
};
