'use client';

import { IconAlertCircle } from '@/shared/assets';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

const NoPosts = () => {
  return (
    <div className={cn(FLEX_CENTER, 'h-full flex-col gap-4 py-[200px]')}>
      <IconAlertCircle width={36} height={36} />
      <p className={cn(Typography.TITLE_1_BOLD, 'text-gray-700')}>
        등록된 게시물이 없습니다.
      </p>
    </div>
  );
};

export { NoPosts };
