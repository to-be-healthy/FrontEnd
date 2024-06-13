'use client';

import dayjs from 'dayjs';

import { type Workout } from '@/feature/workout';
import { IconChat, IconLike } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { ImageSlide } from '@/widget';

import { ExercisePreview } from './ExerciseInfo';

const WorkoutPost = ({ workout }: { workout: Workout }) => {
  const { createdAt, files, content, completedExercises, liked, likeCnt, commentCnt } =
    workout;
  const formattedDate = dayjs(createdAt).format('M월 D일 (ddd)');

  return (
    <Card className={cn(Typography.TITLE_3, 'w-full gap-0')}>
      <CardHeader className={cn(Typography.TITLE_3, 'mb-4')}>{formattedDate}</CardHeader>
      <CardContent>
        <p
          className={cn(
            Typography.BODY_3,
            'mb-5 line-clamp-2 h-full overflow-ellipsis text-black'
          )}>
          {content}
        </p>
        <ImageSlide images={files} />
        <ExercisePreview exercises={completedExercises} />
      </CardContent>
      <CardFooter className='mt-6 flex gap-4'>
        <div className=' flex items-center gap-2'>
          <IconLike
            stroke={cn(liked ? 'var(--point-color)' : 'var(--gray-500)')}
            fill={cn(liked ? 'var(--point-color)' : 'transparent')}
          />
          <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>{likeCnt}</p>
        </div>
        <div className='flex items-center gap-2'>
          <IconChat />
          <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
            댓글 <span>{commentCnt}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export { WorkoutPost };
