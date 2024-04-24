'use client';

import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Progress } from '../../../shared/ui/progress';

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

interface CourseCardHeaderProps {
  gymName?: string;
  remainLessonCnt?: number;
  totalLessonCnt?: number;
  expiration?: boolean;
  title?: string;
  indication?: string;
}

export const CourseCardHeader = ({
  gymName,
  remainLessonCnt,
  title,
  indication,
}: CourseCardHeaderProps) => (
  <CardHeader>
    {gymName ? (
      <>
        <div className='typography-body-3 mb-1 flex items-center justify-between text-[#fff]'>
          <p>{gymName}</p>
          <span>{title}</span>
        </div>
        <p className='typography-heading-3'>{remainLessonCnt}회 남아있어요!</p>
      </>
    ) : (
      <div className='flex items-center justify-between'>
        <p className='typography-heading-4 text-[#fff]'>{title}</p>
        <span className='typography-body-3 text-[#fff]'>{indication}</span>
      </div>
    )}
  </CardHeader>
);

interface CourseCardContentProps {
  totalLessonCnt: number;
  remainLessonCnt: number;
  className?: string;
  progressClassName?: string;
}

export const CourseCardContent = ({
  totalLessonCnt,
  remainLessonCnt,
  className,
  progressClassName,
}: CourseCardContentProps) => (
  <CardContent>
    <div>
      <p className='typography-heading-5 mb-[6px] text-[#fff]'>
        PT 진행 횟수 {remainLessonCnt}
        <span className={cn('typography-body-3 text-[#8EC7FF]', className)}>
          / {totalLessonCnt}
        </span>
      </p>
      <Progress
        className='h-[2px]'
        progressClassName={progressClassName}
        value={((totalLessonCnt - remainLessonCnt) / totalLessonCnt) * 100}
      />
    </div>
  </CardContent>
);
