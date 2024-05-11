import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import { useState } from 'react';

import {
  getStartOfWeek,
  scheduleAdaptor,
  TrainerWeeklyTimetable,
  useTrainerScheduleQuery,
} from '@/feature/schedule';
import { IconGear } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { WeekPicker } from '@/widget';

export const TrainerSchedulePage = () => {
  const currentStartOfWeek = getStartOfWeek();
  const [startDate, setStartDate] = useState(currentStartOfWeek);

  const { data, isPending } = useTrainerScheduleQuery({
    lessonEndDt: dayjs(startDate).add(6, 'days').format('YYYY-MM-DD'),
    lessonStartDt: dayjs(startDate).format('YYYY-MM-DD'),
  });

  const schedules = data?.schedule;

  const handleWeekChange = (date: Date) => {
    setStartDate(date);
  };

  const weeklySchedules =
    !isPending && schedules !== null && scheduleAdaptor({ schedules, startDate });

  return (
    <Layout type='trainer' className='bg-white'>
      <Layout.Header className='py-[16px]'>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>내 스케줄</h1>
        <IconGear />
      </Layout.Header>
      <Layout.Contents className='mt-[16px] overflow-hidden'>
        <WeekPicker startDate={startDate} onWeekChange={handleWeekChange} />
        {!isPending && weeklySchedules && (
          <TrainerWeeklyTimetable weeklySchedules={weeklySchedules} />
        )}
        {!isPending && weeklySchedules === null && (
          <div className='flex h-full w-full flex-col items-center justify-center space-y-[16px]'>
            <Button size='lg'>일정 등록</Button>
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
