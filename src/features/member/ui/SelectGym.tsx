'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthAction, useAuthSelector } from '@/entities/auth';
import { GymList } from '@/entities/auth/model/types';
import { memberMutation } from '@/entities/member';
import { BaseError } from '@/shared/api';
import { Layout } from '@/shared/ui';
import { Button } from '@/shared/ui/button';
import { toast } from '@/shared/ui/use-toast';
import { cn } from '@/shared/utils/tw-utils';

export const SelectGym = () => {
  const [selectGymId, setSelectGymId] = useState<number | null>(null);

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

  return (
    <Layout>
      <article className='h-[100vh]'>
        <div className='flex h-full w-full flex-col items-center justify-between p-[20px]'>
          <div className='flex w-full flex-col items-center justify-start overflow-y-auto pt-[104px]'>
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

          <Button
            className='h-[57px] w-full rounded-lg bg-primary-500 text-white'
            disabled={!selectGymId}
            onClick={handleRegisterGym}>
            다음
          </Button>
        </div>
      </article>
    </Layout>
  );
};
