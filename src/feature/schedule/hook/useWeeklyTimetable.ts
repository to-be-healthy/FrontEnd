'use client';

import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { timeToDecimal } from '@/shared/utils';

import {
  SCHEDULE_ACTIVE_COLORS,
  SCHEDULE_AVAILABLE_COLOR,
  SCHEDULE_DISABLED_COLORS,
  SCHEDULE_NOSHOW_COLOR,
} from '../consts';
import {
  FlatSchedule,
  ScheduleColor,
  ScheduleOffset,
  TrainerSchedule,
} from '../model/type';

const useWeeklyTimetable = ({
  schedules,
  startDate,
  earliestLessonStartTime,
}: {
  schedules: [string, TrainerSchedule[]][];
  startDate: Date;
  earliestLessonStartTime?: string;
}) => {
  const [selectedSchedule, setSelectedSchedule] = useState<FlatSchedule | null>(null);
  const userList: number[] = [];

  const getScheduleColor = (schedule: TrainerSchedule): ScheduleColor | null => {
    const applicantId = schedule.applicantId;
    const status = schedule.reservationStatus;

    if (status === 'COMPLETED' || status === 'SOLD_OUT') {
      const userIndex =
        typeof applicantId === 'number' ? userList.indexOf(applicantId) : null;

      return SCHEDULE_ACTIVE_COLORS[(userIndex ?? 0) % SCHEDULE_ACTIVE_COLORS.length];
    }

    if (status === 'AVAILABLE') {
      return SCHEDULE_AVAILABLE_COLOR;
    }

    if (status === 'DISABLED') {
      return SCHEDULE_DISABLED_COLORS;
    }

    if (status === 'NO_SHOW') {
      return SCHEDULE_NOSHOW_COLOR;
    }

    return null;
  };

  const changeSelectedSchedule = (schedules: FlatSchedule | null) => {
    setSelectedSchedule(schedules);
  };

  const flatSchedules = useMemo(
    () =>
      schedules.flatMap(([date, trainerSchedules]) =>
        trainerSchedules.map((item) => {
          if (typeof item.applicantId === 'number') {
            userList.push(item.applicantId);
          }

          const startHour = earliestLessonStartTime
            ? timeToDecimal(earliestLessonStartTime)
            : 6;

          const offset: ScheduleOffset = {
            x: dayjs(new Date(date)).diff(startDate, 'day'),
            y: timeToDecimal(item.lessonStartTime) - startHour,
          };

          const color = getScheduleColor(item);

          return { ...item, date, offset, color };
        })
      ),
    [getScheduleColor, schedules, startDate]
  );

  return {
    flatSchedules,
    selectedSchedule,
    changeSelectedSchedule,
  };
};

export { useWeeklyTimetable };
