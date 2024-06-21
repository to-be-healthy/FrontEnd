import dayjs from 'dayjs';
import { PropsWithChildren } from 'react';

import { Typography } from '@/shared/mixin';
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
    <div className='relative h-full w-full'>
      <div
        className={cn(`absolute left-7 top-0 z-50 h-[48px] w-[21px] border bg-white`)}
      />
      <div className='hide-scrollbar relative ml-7 mt-7 flex h-full overflow-auto rounded-sm'>
        <div className='relative mr-[21px] flex h-full w-fit flex-col'>
          {/* Day of Week Axis */}
          <div className='sticky top-0 z-10 ml-7 flex border-l'>
            {dayOfWeekAxis.map((day) => {
              const dayOfWeek = dayjs(day).format('ddd');
              const isToday = today.toDateString() === day.toDateString();
              return (
                <SheetTrigger
                  key={dayOfWeek}
                  className={cn(
                    Typography.BODY_4_MEDIUM,
                    'flex h-[48px] w-[64px] flex-col items-center justify-center border-b border-r border-t bg-white text-gray-700',
                    isToday && 'text-blue-300'
                  )}
                  onClick={() => openChangeClosedDay(day)}>
                  {dayOfWeek}
                  <p className={cn(Typography.TITLE_3, isToday && 'text-primary-500')}>
                    {dayjs(day).format('D')}
                  </p>
                </SheetTrigger>
              );
            })}
          </div>
          <div className='flex h-fit'>
            {/* Timetable */}
            <div
              className='relative mb-[80px] border-b bg-gray-100'
              style={{
                width: `100%`,
                height: `${64 * (HOURS_TO - HOURS_FROM) + 1}px`,
                backgroundImage: 'url(/images/grid-pattern.svg)',
                backgroundSize: `64px 64px`,
                backgroundPositionX: '20px',
              }}>
              {/* Hour Axis */}
              <div className='sticky left-0 z-10 flex h-fit w-[21px] select-none flex-col border-t bg-transparent'>
                {hourAxis.map((hour) => (
                  <div
                    key={hour}
                    className={cn(
                      Typography.BODY_4_MEDIUM,
                      'h-[64px] border-x border-b bg-white text-center text-gray-700'
                    )}>
                    {hour}
                  </div>
                ))}
              </div>
              <div className='absolute left-[21px] top-[1px] h-full w-[calc(100%-21px)]'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Board };
