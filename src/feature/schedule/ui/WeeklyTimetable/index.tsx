'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { IconCalendarRefresh } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { DialogClose, Sheet, SheetContent, SheetTrigger } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useTrainerChangeReservationMutation } from '../../api/useTrainerChangeReservationMutation';
import { useWeeklyTimetable } from '../../hook/useWeeklyTimetable';
import { TrainerSchedule } from '../../model/type';
import { Board } from './Board';
import { BottomSheet } from './BottomSheet';
import { Cell } from './Cell';

const WeeklyTimetable = ({
  schedules,
  startDate,
}: {
  schedules: [string, TrainerSchedule[]][];
  startDate: Date;
}) => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useShowErrorToast();

  const { flatSchedules, selectedSchedule, changeSelectedSchedule } = useWeeklyTimetable({
    schedules,
    startDate,
  });
  const { mutate } = useTrainerChangeReservationMutation();

  const [dailyBottomSheet, setDailyBottomSheet] = useState<string | null>(null);

  const openChangeClosedDay = (date: Date) => {
    setDailyBottomSheet(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleChangeClosedDay = () => {
    const scheduleIds = flatSchedules
      .filter(
        (item) =>
          item.date === dayjs(dailyBottomSheet).format('YYYY-MM-DD') &&
          item.reservationStatus !== 'DISABLED'
      )
      .map((item) => item.scheduleId);

    if (scheduleIds.length === 0) {
      return;
    }

    mutate(
      { status: 'DISABLED', scheduleIds },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: ['schedule'].filter(Boolean),
          });
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open && dailyBottomSheet) {
          setDailyBottomSheet(null);
          return;
        }
        if (open && dailyBottomSheet) {
          changeSelectedSchedule(null);
        }
      }}>
      <Board startDate={startDate} openChangeClosedDay={openChangeClosedDay}>
        {flatSchedules.map((schedule) => {
          const isBefore = dayjs(schedule.date + ' ' + schedule.lessonStartTime).isBefore(
            dayjs()
          );
          return (
            <SheetTrigger
              key={schedule.scheduleId}
              onPointerDown={() => {
                if (
                  isBefore &&
                  (schedule.reservationStatus === 'AVAILABLE' ||
                    schedule.reservationStatus === 'DISABLED')
                ) {
                  showErrorToast('시간이 지난 스케줄입니다.');
                }
                changeSelectedSchedule(schedule);
              }}>
              <Cell schedule={schedule} />
            </SheetTrigger>
          );
        })}
        {selectedSchedule && <BottomSheet schedule={selectedSchedule} />}
        {dailyBottomSheet && (
          <SheetContent side='bottom'>
            <div className='flex w-full flex-col'>
              <h3 className={cn(Typography.HEADING_3)}>
                {dayjs(dailyBottomSheet).format('M.DD(ddd)')}
              </h3>
              <div className={cn('mt-7 flex w-full justify-center gap-6')}>
                <DialogClose
                  className={cn(
                    Typography.TITLE_1_SEMIBOLD,
                    'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
                  )}
                  onClick={handleChangeClosedDay}>
                  <IconCalendarRefresh />
                  휴무일로 변경
                </DialogClose>
              </div>
            </div>
          </SheetContent>
        )}
      </Board>
    </Sheet>
  );
};

export { WeeklyTimetable };
