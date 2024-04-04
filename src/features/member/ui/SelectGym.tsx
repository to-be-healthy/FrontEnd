'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthAction, useAuthSelector } from '@/entities/auth';
import { GymList } from '@/entities/auth/model/types';
import { memberMutation } from '@/entities/member';
import { BaseError } from '@/shared/api';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import { Button, Layout } from '@/shared/ui';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { toast } from '@/shared/ui/use-toast';
import { cn } from '@/shared/utils/tw-utils';

export const SelectGym = () => {
  const [step, setStep] = useState(1);
  const [selectGymId, setSelectGymId] = useState<number | null>(null);
  const [authValue, setAuthValue] = useState('');

  const router = useRouter();
  const auth = useAuthSelector(['accessToken', 'memberType', 'refreshToken', 'userId']);
  const { setUserInfo } = useAuthAction();

  const { mutate } = memberMutation.useRegisterGymMutation();
  const { data: gymData } = useQuery<GymList[], BaseError>({
    queryKey: ['gymList'],
    queryFn: memberMutation.getGymList,
  });

  const handleSelectGymId = (gymId: number) => {
    setSelectGymId(gymId);
  };

  const clickNext = () => {
    setStep((prev) => prev + 1);
    setAuthValue('');
  };

  const handleRegisterGym = () => {
    if (!selectGymId) return;

    mutate(selectGymId, {
      onSuccess: () => {
        setUserInfo({ ...auth, gymId: selectGymId });
        if (auth.memberType === 'TRAINER') {
          router.push('/trainer');
        } else {
          router.push('/student');
        }
      },
      onError: (error) => {
        toast({
          description: (
            <div className='flex items-center justify-center'>
              <p className='typography-title-1 ml-[16px] text-[#fff]'>
                {error.response?.data.message}
              </p>
            </div>
          ),
          duration: 2000,
        });
      },
    });
  };

  const clickBack = () => {
    setStep((prev) => prev - 1);
  };

  // const sendAuthCode = () => {};

  return (
    <section className='h-full'>
      {step === 1 && (
        <Layout.Contents>
          <div className='flex h-full w-full flex-col items-center justify-between'>
            <div className='flex w-full flex-col items-center justify-start overflow-y-auto p-[20px] pt-[100px]'>
              <p className='typography-heading-1 mb-[80px] text-center'>
                {auth.memberType === 'TRAINER' ? '수업하시는' : '다니시는'} 헬스장을
                <br />
                선택해주세요.
              </p>
              <ul className='w-full'>
                {gymData?.map((item: GymList) => {
                  return (
                    <li key={item.gymId} className='mb-3 h-[80px] w-full'>
                      <Button
                        className={cn(
                          'typography-heading-4 h-full text-[#000]',
                          selectGymId === item.gymId
                            ? 'border-2 border-solid border-primary-500 bg-[#fff]'
                            : 'bg-gray-100'
                        )}
                        size='full'
                        id={item.gymId.toString()}
                        onClick={() => handleSelectGymId(item.gymId)}>
                        {item.name}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='w-full p-[20px]'>
              {auth.memberType === 'TRAINER' ? (
                <Button
                  className='h-[57px] w-full rounded-lg bg-primary-500 text-white'
                  disabled={!selectGymId}
                  onClick={clickNext}>
                  다음
                </Button>
              ) : (
                <Button
                  className='h-[57px] w-full rounded-lg bg-primary-500 text-white'
                  disabled={!selectGymId}
                  onClick={handleRegisterGym}>
                  다음
                </Button>
              )}
            </div>
          </div>
        </Layout.Contents>
      )}

      {step === 2 && (
        <div className='flex h-full w-full flex-col items-center justify-between'>
          <Layout.Header className='h-[56px]'>
            <Button className='bg-transparent p-0' onClick={clickBack}>
              <BackIcon />
            </Button>
          </Layout.Header>

          <Layout.Contents>
            <div className='flex h-full w-full flex-col items-center justify-between p-[20px] pt-[60px]'>
              <div className='flex w-full flex-col items-center justify-start'>
                <p className='typography-heading-1 mb-[30px] text-center'>
                  인증 코드를 입력해 주세요.
                </p>
                <InputOTP
                  className='h-50px'
                  maxLength={6}
                  value={authValue}
                  onChange={(value) => setAuthValue(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className='typography-heading-1 bg-gray-100'
                    />
                    <InputOTPSlot
                      index={1}
                      className='typography-heading-1 bg-gray-100'
                    />
                    <InputOTPSlot
                      index={2}
                      className='typography-heading-1 bg-gray-100'
                    />
                    <InputOTPSlot
                      index={3}
                      className='typography-heading-1 bg-gray-100'
                    />
                    <InputOTPSlot
                      index={4}
                      className='typography-heading-1 bg-gray-100'
                    />
                    <InputOTPSlot
                      index={5}
                      className='typography-heading-1 bg-gray-100'
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className='w-full'>
                <Button
                  className='typography-title-1 h-[57px] w-full rounded-lg'
                  disabled={authValue.length < 6}>
                  완료
                </Button>
              </div>
            </div>
          </Layout.Contents>
        </div>
      )}
    </section>
  );
};
