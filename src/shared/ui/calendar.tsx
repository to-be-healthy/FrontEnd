'use client';

import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/shared/ui/button';
import { cn } from '@/shared/utils/tw-utils';

import { Typography } from '../mixin';

export type CalendarProps = ComponentProps<typeof DayPicker>;

type isToggleProps = CalendarProps & {
  isToggle?: boolean;
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  isToggle,
  ...props
}: isToggleProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months: 'flex flex-col space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center',
        caption_label: Typography.HEADING_4_BOLD,
        nav: 'flex items-center justify-between w-[80px]',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 hover:opacity-100'
        ),
        nav_button_previous:
          'absolute left-1 w-[30px] h-[30px] disabled:bg-transparent opacity-100',
        nav_button_next:
          'absolute right-1 w-[30px] h-[30px] disabled:bg-transparent opacity-100',
        table: 'w-full border-collapse space-y-1 h-[200px]',
        head_row: 'flex justify-between items-center',
        head_cell: cn(
          Typography.BODY_2,
          'w-[40px] h-[40px] flex justify-center items-center text-muted-foreground rounded-md font-normal'
        ),
        row: 'flex w-full justify-between items-center',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-primary-500 [&:has([aria-selected])]:text-[#fff] [&:has([aria-selected])]:rounded-[50%] focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'w-[40px] h-[40px] p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected: 'bg-primary text-[#fff]',
        day_today: 'bg-primary text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50 disabled:bg-transparent',
        day_range_middle: 'aria-selected:bg-primary aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <ChevronLeft className={cn(isToggle && 'hidden', 'h-[30px] w-[30px]')} />
        ),
        IconRight: () => (
          <ChevronRight className={cn(isToggle && 'hidden', 'h-[30px] w-[30px]')} />
        ),
      }}
      locale={ko}
      weekStartsOn={0}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
