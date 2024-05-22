'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const EditPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const verifyPassword = () => {
    console.log('verify password');
    setStep(2);
  };

  const changePassword = () => {
    console.log(newPassword);
    router.replace('/trainer/mypage/info');
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Link href={'/trainer/mypage/info'}>
          <IconBack />
        </Link>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>이메일 변경</h1>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
      </Layout.Header>
      <Layout.Contents>
        {step === 1 && (
          <section className='space-y-3 px-7 pt-8'>
            <h3 className={cn(Typography.TITLE_3)}>현재 비밀번호를 입력해주세요.</h3>
            <div className='rounded-md border border-gray-200 px-6 py-[13px]'>
              <Input
                type='password'
                placeholder='비밀번호'
                onChange={(e) => setPassword(e.target.value)}
                className={cn('w-full')}
              />
            </div>
          </section>
        )}
        {step === 2 && (
          <section className='space-y-3 px-7 pt-8'>
            <h3 className={cn(Typography.TITLE_3)}>새로운 비밀번호를 입력해주세요.</h3>
            <div className='rounded-md border border-gray-200 px-6 py-[13px]'>
              <Input
                type='password'
                placeholder='영문+숫자 조합 8자리 이상'
                onChange={(e) => setNewPassword(e.target.value)}
                className={cn('w-full')}
              />
            </div>
            <div className='rounded-md border border-gray-200 px-6 py-[13px]'>
              <Input
                type='password'
                placeholder='비밀번호 재입력'
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn('w-full')}
              />
            </div>
          </section>
        )}
      </Layout.Contents>
      <Layout.BottomArea>
        {step === 1 && (
          <Button size='full' disabled={!password} onClick={verifyPassword}>
            비밀번호 확인
          </Button>
        )}
        {step === 2 && (
          <Button
            size='full'
            onClick={changePassword}
            disabled={
              !newPassword || !confirmPassword || newPassword !== confirmPassword
            }>
            비밀번호 변경하기
          </Button>
        )}
      </Layout.BottomArea>
    </Layout>
  );
};

export { EditPasswordPage };
