import dayjs from 'dayjs';
import { PropsWithChildren } from 'react';

import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { SheetTrigger } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { HOURS_FROM, HOURS_TO } from '../../consts';

/**
 * @description Timetable Board (격자 무늬)
 */
const Board = ({
  startDate,
  openChangeClosedDay,
  children,
}: PropsWithChildren<{
  startDate: Date;
  openChangeClosedDay: (date: Date) => void;
}>) => {
  const today = new Date();
  const hourAxis = Array.from(
    { length: HOURS_TO - HOURS_FROM },
    (_, i) => i + HOURS_FROM
  );
  const dayOfWeekAxis = Array.from({ length: 7 }, (_, i) =>
    dayjs(startDate).add(i, 'day').toDate()
  );
  return (
    <div className='mt-7 flex h-full w-screen max-w-[var(--max-width)] flex-1 overflow-hidden'>
      <div className='hide-scrollbar relative ml-7 flex-1 overflow-auto'>
        <div className='w-fit pb-[100px] pr-8'>
          <div className='sticky top-0 z-20 flex bg-white'>
            <div className='sticky left-0 z-30 w-[21px] border border-gray-200 bg-white' />
            {dayOfWeekAxis.map((day, i) => {
              const dayOfWeek = dayjs(day).format('ddd');
              const textColor =
                today.toDateString() === day.toDateString()
                  ? 'text-primary-500'
                  : 'text-gray-700';
              return (
                <SheetTrigger
                  key={i}
                  className={cn(
                    Typography.BODY_4_MEDIUM,
                    FLEX_CENTER,
                    textColor,
                    'h-[48px] w-[64px] flex-1 flex-col border border-l-0 border-gray-200'
                  )}
                  onClick={() => openChangeClosedDay(day)}>
                  {dayOfWeek}
                  <p className={cn(Typography.TITLE_3, textColor)}>
                    {dayjs(day).format('D')}
                  </p>
                </SheetTrigger>
              );
            })}
          </div>
          <div className='relative flex'>
            <div className='bg-wthie sticky left-0 z-10 w-[21px] text-center'>
              {hourAxis.map((hour) => (
                <div
                  key={hour}
                  className={cn(
                    Typography.BODY_4_MEDIUM,
                    'h-16 border border-t-0 border-gray-200 bg-white text-center text-gray-700'
                  )}>
                  {hour}
                </div>
              ))}
            </div>
            {dayOfWeekAxis.map((day, i) => {
              return (
                <div key={i} className='w-[64px] flex-1'>
                  {hourAxis.map((_, j) => (
                    <div
                      key={j}
                      className='h-16 border-b border-r border-gray-200 bg-gray-100'></div>
                  ))}
                </div>
              );
            })}
            <div className='absolute left-[21px] top-0 z-0 h-full w-[calc(64*7px)]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Board };
