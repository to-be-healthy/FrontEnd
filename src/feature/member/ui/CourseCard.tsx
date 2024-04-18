import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Progress } from '../../../shared/ui/progress';

interface CourseCardHeaderType {
  gymName?: string;
  title?: string;
  remainLessonCnt?: number;
}

export const CourseCardHeader = ({
  gymName,
  title,
  remainLessonCnt,
}: CourseCardHeaderType) => (
  <CardHeader>
    {gymName ? (
      <>
        <div className='typography-body-4 mb-1 flex items-center justify-between text-[#E2F1FF]'>
          <p>{gymName}</p>
          <span>PT 수강권</span>
        </div>
        <p className='typography-heading-3'>{remainLessonCnt}회 남아있어요!</p>
      </>
    ) : (
      <div className='flex items-center justify-between'>
        <p className='typography-heading-4 text-[#fff]'>{title}</p>
        <span className='typography-body-3 text-[#fff]'>
          PT {remainLessonCnt}회 수강권
        </span>
      </div>
    )}
  </CardHeader>
);

interface CourseCardContentType {
  lessonCnt: number;
  remainLessonCnt: number;
}

export const CourseCardContent = ({
  lessonCnt,
  remainLessonCnt,
}: CourseCardContentType) => (
  <CardContent>
    <div>
      <p className='typography-heading-5 mb-[6px] text-[#fff]'>
        PT 진행 횟수 {lessonCnt}
        <span className='typography-body-3 text-[#8EC7FF]'>/ {remainLessonCnt}</span>
      </p>
      <Progress className='h-[2px]' value={(lessonCnt / remainLessonCnt) * 100} />
    </div>
  </CardContent>
);

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
