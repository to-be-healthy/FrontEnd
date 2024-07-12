'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLessonListQuery } from '@/feature/log';
import { IconAlertCircle, IconCheckCircle } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';

const LessonFeedbackList = ({ lessonDate }: { lessonDate: string }) => {
  const { data } = useLessonListQuery({ lessonDate });

  if (!data) {
    return (
      <div className='flex-center mt-12 h-full w-full'>
        <Image src='/images/loading.gif' width={40} height={40} alt='loading' />
      </div>
    );
  }

  return (
    <div className='flex-center flex-col gap-4 py-6'>
      {data.length === 0 && (
        <div className='flex-center mt-12 h-full flex-col gap-5'>
          <IconAlertCircle />
          <p className={cn(Typography.TITLE_1_BOLD, 'text-gray-700')}>
            작성해야 할 피드백이 없습니다.
          </p>
        </div>
      )}
      {data.length > 0 &&
        data?.map((item) => {
          if (item.reviewStatus === '작성') {
            return (
              <Link
                key={item.scheduleId}
                href={`/trainer/manage/${item.studentId}/log/${item.lessonHistoryId}?scheduleId=${item.scheduleId}`}
                className='w-full'>
                <Card className='flex w-full flex-row items-center justify-between'>
                  <div className={cn('flex flex-col gap-1')}>
                    <span className={cn(Typography.TITLE_3, 'text-gray-600')}>
                      {item.lessonTime}
                    </span>
                    <p className={cn(Typography.TITLE_1_BOLD)}>{item.studentName}</p>
                  </div>
                  <IconCheckCircle />
                </Card>
              </Link>
            );
          }

          return (
            <Card
              key={item.scheduleId}
              className='flex w-full flex-row items-center justify-between'>
              <div className={cn('flex flex-col gap-1')}>
                <span className={cn(Typography.TITLE_3, 'text-gray-600')}>
                  {item.lessonTime}
                </span>
                <p className={cn(Typography.TITLE_1_BOLD)}>{item.studentName}</p>
              </div>
              <Link
                href={`/trainer/manage/${item.studentId}/log/write?scheduleId=${item.scheduleId}`}>
                <Button variant='secondary' size='lg'>
                  작성하기
                </Button>
              </Link>
            </Card>
          );
        })}
    </div>
  );
};

export { LessonFeedbackList };
