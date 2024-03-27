/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import { useState } from 'react';

import IconBack from '@/shared/assets/images/icon_back.svg';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/tw-utils';

import AuthLayout from './AuthLayout';

const data = [
  {
    gymId: 0,
    gym: '건강해짐 헬스장 홍대점',
    trainers: [
      {
        trainerId: 0,
        name: '김진영',
        profile: '../../../shared/assets/images/kakao_logo.svg',
      },
      { trainerId: 1, name: '신우빈', profile: '@/shared/assets/images/icon_back.svg' },
      { trainerId: 2, name: '정선우', profile: '@/shared/assets/images/icon_back.svg' },
    ],
  },
  {
    gymId: 1,
    gym: '건강해짐 헬스장 청라점',
    trainers: [
      { trainerId: 0, name: '박지윤', profile: '@/shared/assets/images/icon_back.svg' },
      { trainerId: 1, name: '박혜민', profile: '@/shared/assets/images/icon_back.svg' },
      { trainerId: 2, name: '임채린', profile: '@/shared/assets/images/icon_back.svg' },
    ],
  },
];

interface GymType {
  gymId: number;
  gym: string;
  trainers: trainerType[];
}

interface trainerType {
  trainerId: number;
  name: string;
  profile: string;
}

interface selectDataType {
  gymId: string;
  trainerId: string;
}

export const SignUpSelectGymPage = () => {
  const [step, setStep] = useState(1);
  const [gymData, setGymData] = useState({
    gymId: null,
    trainerId: null,
  });

  const selectGym = (key: keyof selectDataType, value: number) => {
    setGymData((prev) => ({ ...prev, [key]: value }));
  };

  const clickNext = () => {
    setStep((prev) => prev + 1);
  };

  const clickBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <AuthLayout>
      <article className='h-[100vh]'>
        {step === 1 && (
          <div className='flex h-full w-full flex-col items-center justify-between p-[20px]'>
            <div className='flex w-full flex-col items-center justify-start pt-[104px]'>
              <p className='typography-heading-1 mb-[80px] text-center'>
                다니시는 헬스장을
                <br />
                선택해주세요.
              </p>
              <ul className='w-full'>
                {data.map((item: GymType) => {
                  return (
                    <li key={item.gymId} className='mb-3 h-[80px] w-full'>
                      <Button
                        className={cn(
                          'typography-heading-4 h-full text-[#000]',
                          gymData.gymId === item.gymId
                            ? 'border-2 border-solid border-primary-500 bg-[#fff]'
                            : 'bg-gray-100'
                        )}
                        size='full'
                        id={item.gymId.toString()}
                        onClick={() => selectGym('gymId', item.gymId)}>
                        {item.gym}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button
              className='typography-title-1 h-[58px]'
              size='full'
              onClick={clickNext}>
              다음
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className='flex h-full w-full flex-col items-center justify-between p-[20px]'>
            <div className='w-full'>
              <header className='flex w-full items-center justify-between pb-0'>
                <Button className='p-0' variant='ghost' onClick={clickBack}>
                  <IconBack />
                </Button>
                <Button asChild variant='ghost'>
                  <Link href='/signin'>건너뛰기</Link>
                </Button>
              </header>

              <div className='flex w-full flex-col items-center justify-start pt-[60px]'>
                <p className='typography-heading-1 mb-[80px] text-center'>
                  수업 받으실 트레이너를
                  <br />
                  선택해주세요.
                </p>
                <ul className='grid w-full grid-cols-2 gap-3'>
                  {data
                    .filter((item: GymType) => item.gymId === gymData.gymId)[0]
                    .trainers.map((trainer: trainerType) => {
                      return (
                        <li key={trainer.trainerId} className='h-[60px] w-full'>
                          <Button
                            className={cn(
                              'typography-heading-4 h-full text-[#000]',
                              gymData.trainerId === trainer.trainerId
                                ? 'border-2 border-solid border-primary-500 bg-[#fff]'
                                : 'bg-gray-100'
                            )}
                            size='full'
                            id={trainer.trainerId.toString()}
                            onClick={() => selectGym('trainerId', trainer.trainerId)}>
                            <span className='mr-5'>
                              <img src={trainer.profile} />
                            </span>
                            {trainer.name}
                          </Button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <Button asChild>
              <Link
                href='/signin'
                className='h-[57px] w-full rounded-lg bg-primary-500 text-white'>
                다음
              </Link>
            </Button>
          </div>
        )}
      </article>
    </AuthLayout>
  );
};
