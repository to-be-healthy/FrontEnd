'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCalendar from '@/shared/assets/images/icon_calendar_blue.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile.svg';
import IconEdit from '@/shared/assets/images/icon_edit.svg';
import IconPhone from '@/shared/assets/images/icon_phone.svg';
import { Button, Card, CardContent, CardHeader, Layout, Progress } from '@/shared/ui';

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
        <h2 className='typography-heading-4 font-semibold'>나의 회원</h2>
        <Link
          href={`/trainer/manage/${memberId}/edit`}
          className='typography-title-2 font-semibold'>
          수정
        </Link>
      </Layout.Header>
      <Layout.Contents className='px-[20px]'>
        <div className='flex w-full items-center gap-x-[24px]  py-[24px]'>
          <IconDefaultProfile />
          <div className='flex flex-col'>
            <h2 className='typography-heading-2 flex gap-x-[8px]'>
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
            <p className='typography-heading-5'>일정 등록</p>
          </Button>
          <Button
            variant='ghost'
            className='flex w-full items-center justify-center gap-x-[6px] bg-white py-[11px]'>
            <IconEdit />
            <p className='typography-heading-5'>수업 내역</p>
          </Button>
        </div>
        <Card className='mb-[16px] w-full gap-y-[36px] bg-primary-500 text-white'>
          <CardHeader className='flex justify-between'>
            <p className='typography-heading-4 font-semibold'>
              잔여 <span className='font-bold'>{data.course.remain}</span>회
            </p>
            <p className='typography-body-3'>{data.course.title}</p>
          </CardHeader>
          <CardContent className='flex flex-col gap-y-[8px]'>
            <p className='typography-heading-5 text-white'>
              PT 진행 횟수 {data.course.progress}
              <span className='text-blue-200'>/{data.course.total}</span>
            </p>
            <Progress value={50} />
          </CardContent>
        </Card>
        <Card className='mb-[16px] w-full gap-y-[24px] px-[16px] py-[20px]'>
          <CardHeader className='flex items-center justify-between text-gray-800'>
            <h4 className='typography-title-2 text-gray-800'>다음 PT예정일</h4>
            <Link href='#'>
              <p className='typography-body-3 font-semibold text-gray-500'>예약 전체</p>
            </Link>
          </CardHeader>
          <CardContent>
            <p className='typography-heading-4 flex items-center gap-x-[8px] text-black'>
              <IconPhone />
              {data.schedule.nextCourse}
            </p>
          </CardContent>
        </Card>
        <Card className='mb-[16px] w-full gap-y-[12px] px-[16px] py-[20px]'>
          <CardHeader className='flex items-center justify-between text-gray-800'>
            <h4 className='typography-title-2 text-gray-800'>오늘 식단</h4>
            <Link href='#'>
              <p className='typography-body-3 font-semibold text-gray-500'>
                등록 식단 전체
              </p>
            </Link>
          </CardHeader>
          <CardContent className='flex justify-center gap-x-[6px]'>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
            <div className='h-[95px] w-[95px] bg-gray-300'></div>
          </CardContent>
        </Card>
        <Card className='w-full gap-y-[12px] px-[16px] py-[20px]'>
          <CardHeader>
            <h4 className='typography-title-2 text-gray-800'>운동 기록</h4>
          </CardHeader>
        </Card>
      </Layout.Contents>
    </Layout>
  );
};
