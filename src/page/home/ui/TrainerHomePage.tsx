'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthAction } from '@/entity/auth';
import { IconAlarmWhite, IconPlus } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

// TODO) 스케줄 관리 entity
const TODAY_CLASSES = [
  {
    name: '박지윤',
    date: '08:00',
    userId: 'A',
  },
  {
    name: '안서영',
    date: '09:00',
    userId: 'B',
  },
  {
    name: '김태주',
    date: '10:00',
    userId: 'C',
  },
  {
    name: '박혜민',
    date: '11:00',
    userId: 'D',
  },
  {
    name: '김진영',
    date: '12:00',
    userId: 'E',
  },
];

// TODO) 회원 관리 entity
const MEMBER_COUNT = 20;

export const TrainerHomePage = () => {
  const { deleteUserInfo } = useAuthAction();
  const router = useRouter();
  const GYM_NAME = '건강해짐 홍대점';

  return (
    <Layout type='trainer' className='relative'>
      <div className='absolute left-0 top-0 z-0 h-[150px] w-full bg-primary' />
      <Layout.Header className='z-10'>
        <p className={cn(Typography.TITLE_2, 'text-white')}>{GYM_NAME}</p>
        {/* 임시로 로그아웃 기능 적용 */}
        <Button
          variant='ghost'
          onClick={() => {
            deleteUserInfo();
            router.push('/');
          }}>
          <IconAlarmWhite />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <div className=' flex w-full flex-col gap-y-5 py-6'>
          <h3
            className={cn(
              Typography.HEADING_4_BOLD,
              'z-10 flex gap-x-2 px-7 text-white'
            )}>
            오늘의 수업
          </h3>
          <ScrollArea className='w-full whitespace-nowrap'>
            <div className='flex w-max space-x-2.5 px-5'>
              {TODAY_CLASSES.map((item) => {
                return (
                  <div
                    key={item.userId}
                    className={cn(
                      'h-50 w-[100px] rounded-[12px] border border-gray-300 bg-white px-[24px] py-[26px] shadow-point'
                    )}>
                    <p className={'typography-body-1 text-gray-400'}>{item.date}</p>
                    <p className={'typography-heading-4 font-bold text-gray-800'}>
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation='horizontal' className='hidden' />
          </ScrollArea>
        </div>
        <div className='mt-[19px] flex flex-col items-center px-[20px]'>
          <div className='grid w-full grid-cols-2 gap-2'>
            <Link href={'/trainer/manage'}>
              <Card className='h-[140px] w-full'>
                <CardHeader className='relative'>
                  회원<span className='ml-1 text-primary-500'>{MEMBER_COUNT}</span>
                  <div className='absolute right-0 top-0'>
                    <IconPlus width={20} fill={'#CBCFD3'} />
                  </div>
                </CardHeader>
                <CardContent className='relative h-full'>
                  <p>{`간편한 회원 관리와\n운동 일지 공유`}</p>
                  <div className='absolute bottom-0 right-0 h-[60px] w-[60px]'>
                    <Image
                      src='/images/icon_profile_coin_shadow.png'
                      fill
                      sizes='auto'
                      priority
                      alt='Card image of account'
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={'#'}>
              <Card className='h-[140px] w-full'>
                <CardHeader>피드백 작성</CardHeader>
                <CardContent className='relative h-full'>
                  <p>{`수업 내역 관리와\n피드백 작성`}</p>
                  <div className='absolute bottom-0 right-0 h-[60px] w-[60px]'>
                    <Image
                      src='/images/icon_calendar_shadow.png'
                      fill
                      sizes='auto'
                      alt='Calendar image for classes'
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
