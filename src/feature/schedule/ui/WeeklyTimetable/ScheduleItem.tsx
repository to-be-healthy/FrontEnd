import dayjs from 'dayjs';

import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Sheet, SheetTrigger } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { FlatSchedule } from '../../model/type';
import { ScheduleItemBottomSheet } from './ScheduleItemBottomSheet';

const ScheduleItem = ({ schedule }: { schedule: FlatSchedule }) => {
  const { showErrorToast } = useShowErrorToast();
  const { reservationStatus, duration, applicantName, offset, color } = schedule;

  const isBefore = dayjs(schedule.date + ' ' + schedule.lessonStartTime).isBefore(
    dayjs()
  );

  return (
    <Sheet key={schedule.scheduleId}>
      <SheetTrigger
        tabIndex={-1}
        onPointerDown={() => {
          if (
            isBefore &&
            (reservationStatus === 'AVAILABLE' || reservationStatus === 'DISABLED')
          ) {
            showErrorToast('시간이 지난 스케줄입니다.');
          }
        }}
        asChild>
        <div
          className={cn(
            'absolute flex w-[63px] flex-col items-center justify-center border-transparent'
          )}
          style={{
            top: `${offset.y * 64}px`,
            left: `${offset.x * 64}px`,
            height: `${duration * 64 - 1}px`,
            backgroundColor: `${color?.bg}`,
          }}>
          {(reservationStatus === 'COMPLETED' || reservationStatus === 'SOLD_OUT') && (
            <>
              <div
                className='absolute left-0 top-0 h-full w-[3px]'
                style={{
                  backgroundColor: `${color?.border}`,
                }}
              />
              <p className={cn(Typography.HEADING_5)}>{applicantName}</p>
            </>
          )}
          {reservationStatus === 'NO_SHOW' && (
            <>
              <p className={cn(Typography.HEADING_5)}>{applicantName}</p>
              <span className='text-[10px] text-gray-400'>미출석</span>
            </>
          )}
        </div>
      </SheetTrigger>
      <ScheduleItemBottomSheet schedule={schedule} />
    </Sheet>
  );
};

export { ScheduleItem };
