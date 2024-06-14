'use client';

import dayjs from 'dayjs';

import { IconCheck, IconNoSchedule } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardHeader } from '@/shared/ui';
import { cn, convertTo12HourFormat } from '@/shared/utils';

import { ScheduleData } from '../model/type';

const NoReservation = () => {
  return (
    <li
      className={cn(
        Typography.TITLE_1_BOLD,
        'flex flex-col items-center justify-center py-28 text-gray-400'
      )}>
      <span className='mb-5 w-[35px]'>
        <IconNoSchedule />
      </span>
      예약된 수업이 없습니다.
    </li>
  );
};

interface Props {
  data: ScheduleData | null;
}

export const TrainerStudentReservationSchedule = ({ data }: Props) => {
  const [lessonStartTime, period] = convertTo12HourFormat(
    data?.lessonStartTime ?? '00:00:00'
  );
  const [lessonEndTime] = convertTo12HourFormat(data?.lessonEndTime ?? '00:00:00');

  const reservatioDate = dayjs(data?.lessonDt).format('MM월 DD일 dddd');

  if (!data) {
    return <NoReservation />;
  }

  return (
    data && (
      <Card className='mb-5 w-full px-6 py-7 text-left'>
        <CardHeader className={cn(Typography.TITLE_3, 'text-gray-600')}>
          {reservatioDate}
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              Typography.TITLE_1_BOLD,
              'flex items-center justify-start text-black'
            )}>
            {period} {lessonStartTime} - {lessonEndTime}
            <span className='ml-1'>
              <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
            </span>
          </p>
        </CardContent>
      </Card>
    )
  );
};
