'use client';

import IconAlarm from '@/shared/assets/images/icon_alarm.svg';
import { Button } from '@/shared/ui/button';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';
import Select from '@/shared/ui/select';
import { cn } from '@/shared/utils/tw-utils';

import HomeLayout from './HomeLayout';

const TODAY_CLASSES = [
  {
    name: '박지윤',
    date: '08:00',
    userId: 'A',
  },
  {
    name: '안서영',
    date: '09:00',
    userId: 'B',
  },
  {
    name: '김태주',
    date: '10:00',
    userId: 'C',
  },
  {
    name: '박혜민',
    date: '11:00',
    userId: 'D',
  },
  {
    name: '김진영',
    date: '12:00',
    userId: 'E',
  },
];

export const TrainerHomePage = () => {
  return (
    <HomeLayout>
      <header className='flex h-14 items-center justify-between bg-white px-5 py-4'>
        <Select>
          <Select.Trigger className='typography-title-2'>건강해짐 홍대점</Select.Trigger>
          <Select.Content>건강해짐 홍대점</Select.Content>
        </Select>
        <Button variant='ghost'>
          <IconAlarm />
        </Button>
      </header>
      <div className='mb-3 flex w-full flex-col gap-y-5 bg-white py-6'>
        <div className='typography-heading-2 flex gap-x-2 px-5'>
          <span>오늘의 수업</span>
          <span className='text-primary-500'>{TODAY_CLASSES.length}</span>
        </div>
        <ScrollArea className='w-full whitespace-nowrap'>
          <div className='flex w-max space-x-2.5 px-5'>
            {TODAY_CLASSES.map((item) => {
              return (
                <div
                  key={item.userId}
                  className={cn(
                    'h-50 w-[100px] rounded-[12px] border border-gray-300 px-[24px] py-[26px] shadow-point'
                  )}>
                  <p className={'typography-body-1 text-gray-400'}>{item.date}</p>
                  <p className={'typography-heading-4 font-bold text-gray-800'}>
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation='horizontal' className='hidden' />
        </ScrollArea>
      </div>
      <div className='flex w-full flex-col items-center'>
        <div>
          {/* 회원 카드 */}
          <div>회원</div>
          {/* 수업 카드 */}
          <div>수업</div>
          {/* 루틴 카드 */}
          <div>루틴</div>
          {/* 급여 카드 */}
          <div>급여</div>
        </div>
      </div>
      <nav></nav>
    </HomeLayout>
  );
};
