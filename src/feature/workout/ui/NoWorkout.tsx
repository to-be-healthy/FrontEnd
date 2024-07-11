'use client';

import { IconAlertCircle } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

const NoWorkout = () => {
  return (
    <div className='flex-center h-full flex-col gap-4'>
      <IconAlertCircle width={36} height={36} />
      <p className={cn(Typography.TITLE_1_BOLD, 'text-gray-700')}>
        등록된 운동 기록이 없습니다.
      </p>
    </div>
  );
};

export { NoWorkout };
