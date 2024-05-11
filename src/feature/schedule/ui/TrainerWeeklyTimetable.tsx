import dayjs from 'dayjs';

import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

import { HOURS_FROM, HOURS_TO, SCHEDULE_COLOR_LIST } from '../consts';
import { DailySchedule, HourlySchedule } from '../model/type';

const HourlyTimetable = ({ schedule }: { schedule: HourlySchedule }) => {
  const { status, event } = schedule;
  const style = SCHEDULE_COLOR_LIST[event?.color ?? 1 % SCHEDULE_COLOR_LIST.length];

  if (status === 'LESSON') {
    return (
      <button
        className={cn(
          'relative flex h-[64px] flex-col items-center justify-center bg-white',
          !event?.applicantName && 'shadow-timetable'
        )}
        style={{
          height: `${event?.duration && event?.duration > 1 && `calc(${event?.duration}*64px)`}`,
        }}
        onClick={() => console.log(schedule)}>
        <div
          className={cn('h-full w-full')}
          style={{
            borderLeftWidth: style && 3,
            borderLeftColor: style && `${style.border}`,
            background: style && `${style.bg}`,
          }}>
          <h5 className={cn(Typography.HEADING_5)}>{event?.applicantName}</h5>
          {event?.reservationStatus === 'COMPLETED' && (
            <p className={cn(Typography.BODY_4_REGULAR, 'font-[10px]')}>예약 완료</p>
          )}
          {event?.reservationStatus === 'SOLD_OUT' && (
            <p className={cn(Typography.BODY_4_REGULAR, 'font-[10px]')}>대기 마감</p>
          )}
          {event?.reservationStatus === 'NO_SHOW' && (
            <p className={cn(Typography.BODY_4_REGULAR, 'font-[10px] text-gray-400')}>
              노쇼
            </p>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      className={cn('h-[64px] bg-gray-100 shadow-timetable')}
      onClick={() => console.log(schedule)}
    />
  );
};

const DailyTimetable = ({ dayliySchedules }: { dayliySchedules: DailySchedule }) => {
  const { schedules } = dayliySchedules;
  return (
    <div className='flex h-fit w-[65px] min-w-[65px] flex-col'>
      {schedules.map((schedule, index) => (
        <HourlyTimetable key={index} schedule={schedule} />
      ))}
    </div>
  );
};

const WeeklyTimetable = ({ weeklySchedules }: { weeklySchedules: DailySchedule[] }) => {
  const hourAxis = Array.from(
    { length: HOURS_TO - HOURS_FROM },
    (_, i) => i + HOURS_FROM
  );
  const dayOfWeekAxis = weeklySchedules.map((item) => item.date);

  return (
    <div className='relative h-full w-full'>
      <div className='hide-scrollbar relative ml-[21px] mt-[20px] flex h-full overflow-auto rounded-sm pb-[80px]'>
        {/* 시간 축 */}
        <div className='sticky left-0 z-10 flex h-fit w-[21px] select-none flex-col bg-white'>
          <div className='sticky top-0 z-20 h-[48px] bg-white' />
          {hourAxis.map((hour) => (
            <div
              key={hour}
              className={cn(
                Typography,
                'h-[64px] bg-white text-center text-gray-700 shadow-timetable'
              )}>
              {hour}
            </div>
          ))}
        </div>
        <div className='relative flex h-full w-fit flex-col pr-[21px]'>
          {/* 요일 축 */}
          <div className='sticky top-0 z-10 flex'>
            {dayOfWeekAxis.map((date, index) => (
              <div
                key={index}
                className={cn(
                  Typography.BODY_4_REGULAR,
                  'flex h-[48px] w-[65px] flex-col items-center bg-white shadow-timetable'
                )}>
                {dayjs(date).format('ddd')}
                <p className={cn(Typography.TITLE_3)}>{dayjs(date).format('D')}</p>
              </div>
            ))}
          </div>
          <div className='flex h-fit'>
            {/* 스케줄 timetable */}
            {weeklySchedules.map((dayliySchedules) => {
              return (
                <div
                  key={dayjs(dayliySchedules.date).format('ddd')}
                  className='flex flex-col'>
                  <DailyTimetable dayliySchedules={dayliySchedules} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='absolute left-[21px] top-0 z-50 h-[48px] w-[20px] bg-white' />
    </div>
  );
};

export { WeeklyTimetable };
