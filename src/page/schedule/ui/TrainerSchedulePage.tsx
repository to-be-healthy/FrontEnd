'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useWeeklySchedules, WeeklyTimetable } from '@/feature/schedule';
import { IconGear } from '@/shared/assets';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout, WeekPicker } from '@/widget';

export const TrainerSchedulePage = () => {
  const { startDate, changeWeek, weeklySchedules, isPending, createWeeklySchedules } =
    useWeeklySchedules();

  return (
    <Layout type='trainer' className='bg-white'>
      <Layout.Header className='py-6'>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>내 스케줄</h1>
        <Link href='/trainer/schedule/setting'>
          <IconGear />
        </Link>
      </Layout.Header>
      <Layout.Contents className='mt-6 overflow-hidden'>
        <WeekPicker startDate={startDate} onWeekChange={changeWeek} />
        {isPending && (
          <div className={cn(FLEX_CENTER, 'h-full w-full')}>
            <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
          </div>
        )}
        {!isPending && weeklySchedules !== null && (
          <WeeklyTimetable startDate={startDate} schedules={weeklySchedules} />
        )}
        {!isPending && weeklySchedules === null && (
          <div className={cn(FLEX_CENTER, 'h-full w-full flex-col space-y-6')}>
            <Button size='lg' onClick={createWeeklySchedules}>
              일정 등록
            </Button>
            <p
              className={cn(
                Typography.BODY_2,
                'whitespace-pre-wrap break-keep text-center text-gray-400'
              )}>{`회원님들은 매주 일요일 자정 이후에\n해당 주 예약이 가능합니다.`}</p>
          </div>
        )}
      </Layout.Contents>
    </Layout>
  );
};
