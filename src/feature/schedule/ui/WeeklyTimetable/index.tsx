import { Sheet, SheetTrigger } from '@/shared/ui';

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
  const { flatSchedules, selectedSchedule, changeSelectedSchedule } = useWeeklyTimetable({
    schedules,
    startDate,
  });

  return (
    <Board startDate={startDate}>
      <Sheet>
        {flatSchedules.map((schedule) => {
          return (
            <SheetTrigger
              key={schedule.scheduleId}
              onPointerDown={() => changeSelectedSchedule(schedule)}>
              <Cell schedule={schedule} />
            </SheetTrigger>
          );
        })}
        {selectedSchedule && <BottomSheet schedule={selectedSchedule} />}
      </Sheet>
    </Board>
  );
};

export { WeeklyTimetable };
