import dayjs from 'dayjs';
import { useState } from 'react';

import IconArrowLeft from '@/shared/assets/images/icon_arrow_left.svg';
import IconArrowRight from '@/shared/assets/images/icon_arrow_right.svg';
import IconClose from '@/shared/assets/images/icon_close_small.svg';
import IconTriangleDown from '@/shared/assets/images/icon_triangle_down.svg';

import { Typography } from '../mixin';
import { cn } from '../utils';
import { Button } from './button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './dialog';

interface Props {
  date?: string;
  onChangeDate: (date: string) => void;
}

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MonthPicker = ({ date, onChangeDate }: Props) => {
  const currentYear = dayjs().format('YYYY');
  const currentMonth = dayjs().format('MM');

  const [year, setYear] = useState(dayjs(date, 'YYYYMM').format('YYYY') ?? currentYear);
  const [month, setMonth] = useState(dayjs(date, 'YYYYMM').format('M') ?? currentMonth);

  const selectDate = () => {
    const newDate = dayjs(year + month, 'YYYYM').format('YYYYMM');
    onChangeDate(newDate);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className='flex items-center space-x-[4px] py-[16px]'>
          <p className={Typography.HEADING_5}>
            {dayjs(date, 'YYYY').format('YYYY')}년 {dayjs(date, 'YYYYMM').format('MM')}월
          </p>
          <IconTriangleDown />
        </DialogTrigger>
        <DialogContent className='bottom-0 top-auto flex max-w-[var(--max-width)] translate-y-0 flex-col justify-center space-y-[24px] rounded-t-[12px] px-[20px] py-[32px]'>
          <div className='flex justify-between'>
            <h4 className={Typography.TITLE_1_SEMIBOLD}>월 선택하기</h4>
            <DialogClose>
              <IconClose />
            </DialogClose>
          </div>
          <div className='flex justify-between'>
            <p className={cn(Typography.HEADING_4_BOLD)}>{year}년</p>
            <div className='flex space-x-[24px]'>
              <Button
                variant='ghost'
                size='auto'
                onClick={() => {
                  setYear((prev) => String(Number(prev) - 1));
                }}>
                <IconArrowLeft stroke={'#1990FF'} />
              </Button>
              <Button
                variant='ghost'
                size='auto'
                onClick={() => {
                  if (year >= currentYear) return;
                  setYear((prev) => String(Number(prev) + 1));
                }}>
                <IconArrowRight
                  stroke={cn(year >= currentYear ? '#86888D' : '#1990FF')}
                />
              </Button>
            </div>
          </div>
          <div className='flex flex-wrap'>
            {MONTHS.map((item) => {
              const isCurrent = year === currentYear && item === Number(currentMonth);
              const isFuture = year === currentYear && item > Number(currentMonth);
              return (
                <div
                  key={item}
                  className='flex h-[72px] w-1/4 items-center justify-center'>
                  <span
                    className={cn(
                      Typography.TITLE_1_SEMIBOLD,
                      'flex h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full',
                      isCurrent && 'text-primary-500',
                      month === String(item) && 'bg-primary-500 text-white',
                      isFuture && 'text-gray-500'
                    )}
                    onClick={() => {
                      if (isFuture) return;
                      setMonth(String(item));
                    }}>
                    {item}월
                  </span>
                </div>
              );
            })}
          </div>
          <DialogClose asChild>
            <Button size='full' className={Typography.TITLE_1_BOLD} onClick={selectDate}>
              {year}년 {month}월 선택
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { MonthPicker };
