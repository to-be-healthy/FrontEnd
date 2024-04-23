'use client';

import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Progress } from '../../../shared/ui/progress';

interface CourseCardHeaderProps {
  gymName?: string;
  remainLessonCnt?: number;
  expiration?: boolean;
}

interface CourseCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CourseCard = ({ className, children }: CourseCardProps) => {
  return (
    <Card
      className={cn('w-full gap-y-8 bg-primary-500 px-6 py-7 text-[#fff]', className)}>
      {children}
    </Card>
  );
};

export const CourseCardHeader = ({
  gymName,
  remainLessonCnt,
  expiration,
}: CourseCardHeaderProps) => (
  <CardHeader>
    {gymName ? (
      <>
        <div className='typography-body-3 mb-1 flex items-center justify-between text-[#fff]'>
          <p>{gymName}</p>
          <span>{expiration ? '만료' : 'PT 수강권'}</span>
        </div>
        <p className='typography-heading-3'>{remainLessonCnt}회 남아있어요!</p>
      </>
    ) : (
      <div className='flex items-center justify-between'>
        <p className='typography-heading-4 text-[#fff]'>잔여 {remainLessonCnt}회</p>
        <span className='typography-body-3 text-[#fff]'>
          {expiration ? '만료' : 'PT 수강권'}
        </span>
      </div>
    )}
  </CardHeader>
);

interface CourseCardContentProps {
  totalLessonCnt: number;
  remainLessonCnt: number;
}

export const CourseCardContent = ({
  totalLessonCnt,
  remainLessonCnt,
}: CourseCardContentProps) => (
  <CardContent>
    <div>
      <p className='typography-heading-5 mb-[6px] text-[#fff]'>
        PT 진행 횟수 {totalLessonCnt - remainLessonCnt}
        <span className='typography-body-3 text-[#8EC7FF]'>/ {totalLessonCnt}</span>
      </p>
      <Progress
        className='h-[2px]'
        value={((totalLessonCnt - remainLessonCnt) / totalLessonCnt) * 100}
      />
    </div>
  </CardContent>
);
