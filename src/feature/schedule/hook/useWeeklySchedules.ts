'use client';

import dayjs from 'dayjs';

import {
  useTrainerCreateSchedulesMutation,
  useTrainerScheduleQuery,
} from '@/feature/schedule';
import { useQueryString } from '@/shared/hooks';
import { useToast } from '@/shared/ui';
import { getStartOfWeek } from '@/shared/utils';

const useWeeklySchedules = () => {
  const currentStartOfWeek = getStartOfWeek();
  const { getQueryString, setQueryString } = useQueryString();
  const date = getQueryString('date');
  const startDate = date ? dayjs(date, 'YYYY-MM-DD').toDate() : currentStartOfWeek;
  const { errorToast } = useToast();

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
          errorToast(message);
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
