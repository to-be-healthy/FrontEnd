import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

import { FlatSchedule } from '../../model/type';

const Cell = ({ schedule }: { schedule: FlatSchedule }) => {
  const { reservationStatus, duration, applicantName, offset, color } = schedule;

  return (
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
  );
};

export { Cell };
