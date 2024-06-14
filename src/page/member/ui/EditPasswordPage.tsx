'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useChangePasswordMutation, useVerifyPasswordMutation } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const EditPasswordPage = () => {
  const router = useRouter();
  const { showErrorToast } = useShowErrorToast();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: verifyPassword } = useVerifyPasswordMutation();
  const { mutate: changePassword } = useChangePasswordMutation();

  const handleVerifyPassword = () => {
    verifyPassword(password, {
      onSuccess: ({ data }) => {
        if (data) {
          setStep(2);
        }
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
        setPassword('');
      },
    });
  };

  const handleChangePassword = () => {
    changePassword(
      {
        changePassword1: newPassword,
        changePassword2: confirmPassword,
      },
      {
        onSuccess: () => {
          router.replace('/trainer/mypage/info');
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
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
            <p className={cn(Typography.BODY_4_REGULAR, 'mt-7 text-gray-500')}>
              비밀번호가 기억나지 않으세요?
              <Link href={'/find/pw'} className='ml-3 text-primary-500'>
                비밀번호 찾기
              </Link>
            </p>
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
          <Button size='full' disabled={!password} onClick={handleVerifyPassword}>
            비밀번호 확인
          </Button>
        )}
        {step === 2 && (
          <Button
            size='full'
            onClick={handleChangePassword}
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
