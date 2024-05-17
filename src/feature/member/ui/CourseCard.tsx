'use client';

import { HTMLAttributes, ReactNode } from 'react';

import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Progress } from '../../../shared/ui/progress';

interface CourseCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const CourseCard = ({ className, children }: CourseCardProps) => {
  return (
    <Card className={cn('w-full gap-y-0 bg-primary-500 p-0 text-[#fff]', className)}>
      {children}
    </Card>
  );
};

interface CourseCardHeaderProps {
  gymName?: string;
  remainLessonCnt?: number;
  totalLessonCnt?: number;
  expiration?: boolean;
}

export const CourseCardHeader = ({
  gymName,
  remainLessonCnt,
  totalLessonCnt,
  expiration,
}: CourseCardHeaderProps) => (
  <CardHeader className='px-6 pb-8 pt-7'>
    <div className='typography-body-3 mb-1 flex items-center justify-between text-white'>
      <p className={cn(Typography.BODY_3, 'text-gray-100')}>{gymName}</p>
      <span className={cn(Typography.BODY_3, 'text-gray-100')}>
        {`PT ${totalLessonCnt}회 수강권`}
      </span>
    </div>
    <p className={cn(Typography.HEADING_3, 'text-white')}>
      {expiration ? `${totalLessonCnt}회 PT수강 만료` : `${remainLessonCnt}`}회
      남아있어요!
    </p>
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
    <div className='px-6 pb-7'>
      <p className='typography-heading-5 mb-[6px] text-[#fff]'>
        PT 진행 횟수 {remainLessonCnt}
        <span className={cn('typography-body-3 text-[#8EC7FF]', className)}>
          /{totalLessonCnt}
        </span>
      </p>
      <Progress
        className='h-[2px]'
        progressClassName={progressClassName}
        value={(remainLessonCnt / totalLessonCnt) * 100}
      />
    </div>
  </CardContent>
);
