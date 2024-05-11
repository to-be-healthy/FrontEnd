import 'dayjs/locale/ko';

import dayjs from 'dayjs';

import { HOURS_FROM, HOURS_TO } from '../consts';
import {
  DailySchedule,
  HourlySchedule,
  TrainerSchedule,
  TrainerWeeklySchedule,
} from './type';

const scheduleAdaptor = ({
  schedules,
  startDate,
}: {
  schedules: TrainerWeeklySchedule;
  startDate: Date;
}): DailySchedule[] => {
  const days = Array.from({ length: 7 }, (_, index) =>
    dayjs(startDate)
      .startOf('week')
      .add(index + 1, 'day')
      .format('YYYY-MM-DD')
  );

  const getDuration = (from: string, to: string) => {
    return (
      Math.abs(
        new Date(`1970-01-01T${to}`).getTime() - new Date(`1970-01-01T${from}`).getTime()
      ) /
      (1000 * 3600)
    );
  };

  const userList: string[] = [];
  let size = 0;

  const generateDailySchedules = (
    hour: string,
    event?: TrainerSchedule
  ): HourlySchedule => {
    if (event) {
      const duration = getDuration(event.lessonEndTime, event.lessonStartTime);
      if (duration > 1) {
        size = size + duration - 1;
      }

      const name = event.applicantName;
      if (name && !userList.includes(name)) {
        userList.push(name);
      }
      return {
        hour,
        status: 'LESSON',
        event: {
          ...event,
          duration,
          color: userList.indexOf(name ?? ''),
        },
      } as HourlySchedule;
    }

    return { hour, status: 'DISABLED' } as HourlySchedule;
  };

  return days.reduce((acc: DailySchedule[], date) => {
    size = 0;
    const dailyEvents = schedules[date] ?? [];
    const dailySchedule = Array.from({ length: HOURS_TO - HOURS_FROM }, (_, index) => {
      const numberOfHour = index + HOURS_FROM + size;

      // 24시 이후 제거
      if (numberOfHour > HOURS_TO - 1) {
        return false;
      }
      const hour = dayjs().startOf('day').add(numberOfHour, 'hour').format('HH:00:00');
      const event = dailyEvents.find((schedule) => schedule.lessonStartTime === hour);

      return generateDailySchedules(hour, event);
    }).filter((schedule): schedule is HourlySchedule => schedule !== false);

    acc.push({
      date: new Date(date),
      schedules: dailySchedule,
    });

    return acc;
  }, []);
};

export { scheduleAdaptor };
