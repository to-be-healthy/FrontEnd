'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthAction, useAuthSelector } from '@/entity/auth';
import { useRegisterGymMutation } from '@/entity/gym';
import { GymVerificationCode, SelectGym } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, useToast } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const SelectGymPage = () => {
  const [step, setStep] = useState(1);
  const [selectGymId, setSelectGymId] = useState<number | null>(null);
  const [authValue, setAuthValue] = useState('');
  const { errorToast } = useToast();
  const router = useRouter();
  const auth = useAuthSelector(['accessToken', 'memberType', 'refreshToken', 'userId']);
  const { setUserInfo } = useAuthAction();

  const { mutate } = useRegisterGymMutation();

  const clickNext = () => {
    setStep((prev) => prev + 1);
    setAuthValue('');
  };

  const handleRegisterGym = () => {
    if (!selectGymId) return;
    if (!auth.memberType) return;

    if (auth.memberType === 'TRAINER') {
      mutate(
        { memberType: auth.memberType, gymId: selectGymId, joinCode: authValue },
        {
          onSuccess: () => {
            setUserInfo({ ...auth, gymId: selectGymId });
            router.push('/trainer/class-time-setting');
          },
          onError: (error) => {
            errorToast(error?.response?.data.message);
          },
        }
      );
    } else {
      mutate(
        { memberType: auth.memberType, gymId: selectGymId },
        {
          onSuccess: () => {
            setUserInfo({ ...auth, gymId: selectGymId });
            router.push('/student');
          },
          onError: (error) => {
            errorToast(error?.response?.data.message);
          },
        }
      );
    }
  };

  const clickBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Layout className='bg-white'>
      {step === 1 && (
        <>
          <Layout.Contents className='p-7 pt-[100px]'>
            <p className={cn(Typography.HEADING_1, 'mb-[80px] text-center')}>
              {auth && auth.memberType === 'TRAINER' ? '수업하시는' : '다니시는'} 헬스장을
              <br />
              선택해주세요.
            </p>
            <SelectGym selectGymId={selectGymId} setSelectGymId={setSelectGymId} />
          </Layout.Contents>

          <Layout.BottomArea className='w-full p-7'>
            {auth.memberType === 'TRAINER' ? (
              <Button
                variant='default'
                className={cn(
                  Typography.TITLE_1_BOLD,
                  'h-[57px] w-full rounded-lg text-white'
                )}
                disabled={!selectGymId}
                onClick={clickNext}>
                다음
              </Button>
            ) : (
              <Button
                variant='default'
                className={cn(
                  Typography.TITLE_1_BOLD,
                  'h-[57px] w-full rounded-lg text-white'
                )}
                disabled={!selectGymId}
                onClick={handleRegisterGym}>
                다음
              </Button>
            )}
          </Layout.BottomArea>
        </>
      )}

      {step === 2 && (
        <>
          <Layout.Header className='h-[56px]'>
            <Button className='bg-transparent p-0' onClick={clickBack}>
              <IconBack />
            </Button>
          </Layout.Header>

          <Layout.Contents className='p-7 pt-[60px]'>
            <GymVerificationCode authValue={authValue} setAuthValue={setAuthValue} />
          </Layout.Contents>

          <Layout.BottomArea className='w-full'>
            <Button
              className={cn(Typography.TITLE_1_BOLD, 'h-[57px] w-full rounded-lg')}
              disabled={authValue.length < 6}
              onClick={handleRegisterGym}>
              완료
            </Button>
          </Layout.BottomArea>
        </>
      )}
    </Layout>
  );
};
