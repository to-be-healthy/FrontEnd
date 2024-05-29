'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { ActiveModifiers } from 'react-day-picker';

import { IconArrowLeft, IconArrowRight, IconClose } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Calendar,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui';
import { cn, getStartOfWeek } from '@/shared/utils';
dayjs.locale('ko');

const DailyCalendar = ({
  defaultStartDate,
  changeWeek,
}: {
  defaultStartDate: Date;
  changeWeek: (date: Date) => void;
}) => {
  const [startOfWeek, setStartOfWeek] = useState<Date>(defaultStartDate);
  const [month, setMonth] = useState<Date>(defaultStartDate);

  const onDayClick = (day: Date, modifiers: ActiveModifiers) => {
    if (modifiers.outside) {
      setMonth(day);
    }
    const newStartOfWeek = getStartOfWeek(day);
    setStartOfWeek(newStartOfWeek);
  };

  const handleMonthChange = (month: Date) => {
    setMonth(month);
  };

  const selectWeek = () => {
    changeWeek(startOfWeek);
  };

  const buttonText = `${dayjs(startOfWeek).format('M월DD일')} ~ ${dayjs(startOfWeek).add(6, 'days').format('M월DD일')}`;

  return (
    <>
      <div className='flex justify-between'>
        <h4 className={Typography.TITLE_1_SEMIBOLD}>날짜 선택하기</h4>
        <Dialog.Close>
          <IconClose width={20} height={20} />
        </Dialog.Close>
      </div>
      <div>
        <Calendar
          classNames={{
            day_range_start: 'day-range-start',
            day_range_middle: 'aria-selected:text-black',
            cell: '[&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected])]:bg-blue-50 w-full',
            day_range_end: 'day-range-end',
          }}
          formatters={{
            formatCaption: (date) =>
              `${dayjs(date).format('YYYY')}년 ${dayjs(date).format('MMMM')}`,
          }}
          mode='range'
          selected={{
            from: dayjs(startOfWeek).toDate(),
            to: dayjs(startOfWeek).add(6, 'days').toDate(),
          }}
          onDayClick={onDayClick}
          month={month}
          onMonthChange={handleMonthChange}
        />
      </div>
      <DialogClose asChild>
        <Button size='full' className={cn(Typography.TITLE_1_BOLD)} onClick={selectWeek}>
          {buttonText}
        </Button>
      </DialogClose>
    </>
  );
};

interface WeekPickerProps {
  startDate: Date;
  onWeekChange: (date: Date) => void;
}

const WeekPicker = ({ startDate, onWeekChange }: WeekPickerProps) => {
  const currentDate = getStartOfWeek();

  const endDate = dayjs(startDate).add(6, 'day');
  const isCurrentWeek = dayjs(startDate).isSame(currentDate, 'day');

  const changeWeek = (date: Date) => {
    onWeekChange(date);
  };

  const movePrevWeek = () => {
    changeWeek(dayjs(startDate).subtract(7, 'day').toDate());
  };

  const moveNextWeek = () => {
    if (isCurrentWeek) return;
    changeWeek(dayjs(startDate).add(7, 'day').toDate());
  };

  return (
    <div className='mx-[20px] flex items-center justify-between rounded-md border border-gray-300 px-[16px] py-[10px]'>
      <Button variant='ghost' size='auto' onClick={movePrevWeek}>
        <IconArrowLeft stroke={'var(--gray-600)'} />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <p className={cn(Typography.BODY_1)}>
            {dayjs(startDate).format('YY.MM.DD')}-{endDate.format('MM.DD')}
          </p>
        </DialogTrigger>
        <DialogContent
          className={cn(
            'bottom-0 top-auto flex max-w-[var(--max-width)] translate-y-0 flex-col justify-center space-y-[24px] rounded-t-[12px] px-[20px] py-[32px]',
            'data-[state=closed]:slide-out-to-bottom-[200%] data-[state=open]:slide-in-from-bottom-[200%]'
          )}>
          <DailyCalendar defaultStartDate={startDate} changeWeek={changeWeek} />
        </DialogContent>
      </Dialog>
      <Button
        variant='ghost'
        size='auto'
        className='disabled:bg-transparent'
        onClick={moveNextWeek}
        disabled={isCurrentWeek}>
        <IconArrowRight
          stroke={cn(isCurrentWeek ? 'var(--gray-400)' : 'var(--gray-600)')}
        />
      </Button>
    </div>
  );
};

export { WeekPicker };
