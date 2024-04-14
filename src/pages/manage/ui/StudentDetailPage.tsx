'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCalendar from '@/shared/assets/images/icon_calendar_blue.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile.svg';
import IconEdit from '@/shared/assets/images/icon_edit.svg';
import IconPhone from '@/shared/assets/images/icon_phone.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader, Layout, Progress } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  memberId: string;
}

const INIT_DATA = {
  profileImg: null,
  name: '박지윤',
  ranking: 2,
  course: {
    title: 'PT 20회 2개월',
    start: '24.03.24',
    end: '24.07.24',
    remain: 4,
    progress: 6,
    total: 10,
  },
  schedule: {
    nextCourse: '05.23 (월) 오후 1:00',
  },
};

export const StudentDetailPage = ({ memberId }: Props) => {
  console.log('fetching with', memberId);
  const router = useRouter();
  const [data] = useState(INIT_DATA);

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.replace('/trainer/manage')}>
          <IconBack />
        </Button>
        <h2 className={Typography.HEADING_4_SEMIBOLD}>나의 회원</h2>
        <Link
          href={`/trainer/manage/${memberId}/edit`}
          className={Typography.TITLE_1_SEMIBOLD}>
          수정
        </Link>
      </Layout.Header>
      <Layout.Contents className='px-[20px]'>
        <div className='flex w-full items-center gap-x-[24px]  py-[24px]'>
          <IconDefaultProfile />
          <div className='flex flex-col'>
            <h2 className={cn('flex gap-x-[8px]', Typography.HEADING_2)}>
              {data.name}
              <IconPhone />
            </h2>
            <p className='text-gray-500'>
              랭킹 <span className='text-primary-500'>{data.ranking}</span>
            </p>
          </div>
        </div>
        <div className='mb-[16px] flex items-center justify-center gap-x-[8px] '>
          <Button
            variant='ghost'
            className='flex w-full items-center justify-center gap-x-[6px] bg-white py-[11px]'>
            <IconCalendar />
            <p className={Typography.HEADING_5}>일정 등록</p>
          </Button>
          <Button
            variant='ghost'
            className='flex w-full items-center justify-center gap-x-[6px] bg-white py-[11px]'>
            <IconEdit />
            <p className={Typography.HEADING_5}>수업 내역</p>
          </Button>
        </div>
        <Card className='mb-[16px] w-full gap-y-[36px] bg-primary-500 text-white shadow-sm'>
          <CardHeader className='flex justify-between'>
            <p className={Typography.HEADING_4_SEMIBOLD}>
              잔여 <span className='font-bold'>{data.course.remain}</span>회
            </p>
            <p className={Typography.BODY_3}>{data.course.title}</p>
          </CardHeader>
          <CardContent className='flex flex-col gap-y-[8px]'>
            <p className={cn(Typography.HEADING_5, 'text-white')}>
              PT 진행 횟수 {data.course.progress}
              <span className='text-blue-200'>/{data.course.total}</span>
            </p>
            <Progress value={50} />
          </CardContent>
        </Card>
        <Card className='mb-[16px] w-full gap-y-[24px] px-[16px] py-[20px] shadow-sm'>
          <CardHeader className='flex items-center justify-between text-gray-800'>
            <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>다음 PT예정일</h4>
            <Link href='#'>
              <p className={cn(Typography.BODY_3, 'text-gray-500')}>예약 전체</p>
            </Link>
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                Typography.HEADING_4,
                'flex items-center gap-x-[8px] text-black'
              )}>
              <IconPhone />
              {data.schedule.nextCourse}
            </p>
          </CardContent>
        </Card>
        <Card className='mb-[16px] w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
          <CardHeader className='flex items-center justify-between text-gray-800'>
            <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>오늘 식단</h4>
            <Link href='#'>
              <p className={cn(Typography.BODY_3, 'text-gray-500')}>등록 식단 전체</p>
            </Link>
          </CardHeader>
          <CardContent className='flex justify-center gap-x-[6px]'>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
          </CardContent>
        </Card>
        <Card className='w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
          <CardHeader>
            <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>운동 기록</h4>
          </CardHeader>
        </Card>
      </Layout.Contents>
    </Layout>
  );
};
