'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthAction, useAuthSelector } from '@/entity/auth';
import { Gym, useGymListQuery, useRegisterGymMutation } from '@/entity/gym';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import { Button, InputOTP, InputOTPGroup, InputOTPSlot, useToast } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const SelectGym = () => {
  const [step, setStep] = useState(1);
  const [selectGymId, setSelectGymId] = useState<number | null>(null);
  const [authValue, setAuthValue] = useState('');

  const router = useRouter();
  const auth = useAuthSelector(['accessToken', 'memberType', 'refreshToken', 'userId']);
  const { setUserInfo } = useAuthAction();
  const { toast } = useToast();

  const { mutate } = useRegisterGymMutation();
  const { data: gymList, isPending } = useGymListQuery();

  const handleSelectGymId = (gymId: number) => {
    setSelectGymId(gymId);
  };

  const clickNext = () => {
    setStep((prev) => prev + 1);
    setAuthValue('');
  };

  const handleRegisterGym = () => {
    if (!selectGymId) return;
    if (!auth.memberType) return;

    if (auth.memberType === 'TRAINER') {
      mutate(
        { memberType: auth.memberType, gymId: selectGymId, joinCode: Number(authValue) },
        {
          onSuccess: () => {
            setUserInfo({ ...auth, gymId: selectGymId });
            router.push('/class-time-setting');
          },
          onError: (error) => {
            toast({
              className: 'py-5 px-6',
              description: (
                <div className='flex items-center justify-center'>
                  <ErrorIcon />
                  <p className='typography-heading-5 ml-6 text-[#fff]'>
                    {error.response?.data.message}
                  </p>
                </div>
              ),
              duration: 2000,
            });
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
            toast({
              className: 'py-5 px-6',
              description: (
                <div className='flex items-center justify-center'>
                  <ErrorIcon />
                  <p className='typography-heading-5 ml-6 text-[#fff]'>
                    {error.response?.data.message}
                  </p>
                </div>
              ),
              duration: 2000,
            });
          },
        }
      );
    }
  };

  const clickBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <section className='h-full'>
      {isPending ? (
        <p>로딩중...</p> //Todo :추후 아이콘을 넣어주면 좋을것 같아요
      ) : (
        <>
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
                    {gymList?.map((item: Gym) => {
                      return (
                        <li key={item.gymId} className='mb-3 h-[80px] w-full'>
                          <Button
                            className={cn(
                              'typography-heading-4 h-full text-black',
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
                        {Array.from({ length: 6 }, (_, i) => i).map((_, index) => {
                          return (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className='typography-heading-1 bg-gray-100'
                            />
                          );
                        })}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className='w-full'>
                    <Button
                      className='typography-title-1 h-[57px] w-full rounded-lg'
                      disabled={authValue.length < 6}
                      onClick={handleRegisterGym}>
                      완료
                    </Button>
                  </div>
                </div>
              </Layout.Contents>
            </div>
          )}
        </>
      )}
    </section>
  );
};
