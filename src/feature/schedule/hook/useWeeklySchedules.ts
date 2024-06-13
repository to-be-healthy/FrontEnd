import dayjs from 'dayjs';
import { useState } from 'react';

import { useTrainerScheduleQuery } from '@/feature/schedule/api/useTrainerScheduleQuery';
import { getStartOfWeek } from '@/shared/utils';

const useWeeklySchedules = () => {
  const currentStartOfWeek = getStartOfWeek();
  const [startDate, setStartDate] = useState(currentStartOfWeek);

  const { data, isPending, refetch } = useTrainerScheduleQuery({
    lessonEndDt: dayjs(startDate).add(6, 'days').format('YYYY-MM-DD'),
    lessonStartDt: dayjs(startDate).format('YYYY-MM-DD'),
  });

  const changeWeek = (date: Date) => {
    setStartDate(date);
  };

  const weeklySchedules =
    data?.schedule && data ? Object.entries(data.schedule).map((daily) => daily) : null;

  return { startDate, isPending, weeklySchedules, refetch, changeWeek };
};

export { useWeeklySchedules };
