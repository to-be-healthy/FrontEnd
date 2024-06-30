'use client';

import dayjs from 'dayjs';

import { useTrainerScheduleQuery } from '@/feature/schedule/api/useTrainerScheduleQuery';
import { useQueryString, useShowErrorToast } from '@/shared/hooks';
import { getStartOfWeek } from '@/shared/utils';

import { useTrainerCreateSchedulesMutation } from '../api/useTrainerCreateSchedulesMutation';

const useWeeklySchedules = () => {
  const currentStartOfWeek = getStartOfWeek();
  const { getQueryString, setQueryString } = useQueryString();
  const date = getQueryString('date');
  const startDate = date ? dayjs(date, 'YYYY-MM-DD').toDate() : currentStartOfWeek;
  const { showErrorToast } = useShowErrorToast();

  const {
    data,
    isPending: queyrPending,
    refetch,
  } = useTrainerScheduleQuery({
    lessonEndDt: dayjs(startDate).add(6, 'days').format('YYYY-MM-DD'),
    lessonStartDt: dayjs(startDate).format('YYYY-MM-DD'),
  });

  const { mutate, isPending: creationPending } = useTrainerCreateSchedulesMutation();

  const changeWeek = (date: Date) => {
    setQueryString('date', dayjs(date).format('YYYY-MM-DD'));
  };

  const weeklySchedules =
    data?.schedule && data ? Object.entries(data.schedule).map((daily) => daily) : null;

  const createWeeklySchedules = () => {
    mutate(
      {
        lessonStartDt: dayjs(startDate).format('YYYY-MM-DD'),
        lessonEndDt: dayjs(startDate).add(6, 'days').format('YYYY-MM-DD'),
      },
      {
        onSuccess: async () => {
          await refetch();
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  const isPending = queyrPending || creationPending;

  return {
    startDate,
    isPending,
    weeklySchedules,
    refetch,
    changeWeek,
    createWeeklySchedules,
  };
};

export { useWeeklySchedules };
