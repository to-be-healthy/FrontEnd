'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import {
  ExerciseDetail,
  PostMetrics,
  useWorkoutComment,
  useWorkoutDetailQuery,
  WorkoutCommentContext,
  WorkoutCommentInput,
  WorkoutCommentsWrapper,
} from '@/feature/workout';
import { IconAvatar, IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader } from '@/shared/ui';
import { cn, formatTimestampToRelativeTime } from '@/shared/utils';
import { ImageSlide, Layout } from '@/widget';

const CommunityDetailPage = ({ workoutHistoryId }: { workoutHistoryId: number }) => {
  const router = useRouter();

  const { data } = useWorkoutDetailQuery(workoutHistoryId);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const value = useWorkoutComment({
    workoutHistoryId,
    ref: inputRef,
  });

  return (
    <WorkoutCommentContext.Provider value={value}>
      <Layout>
        <Layout.Header>
          <Button variant='ghost' className='p-0' onClick={() => router.back()}>
            <IconBack />
          </Button>
        </Layout.Header>
        <Layout.Contents className='hide-scrollbar px-7 py-6'>
          {data && (
            <Card className='w-full gap-0 px-0 py-0'>
              <CardHeader className={cn(Typography.TITLE_3, 'px-6 pt-6')}>
                <Link
                  href={`../community?memberId=${data.member.id}`}
                  className='flex w-fit items-center gap-3'>
                  {data.member.profile ? (
                    <Image
                      src={data.member.profile.fileUrl}
                      alt='profile'
                      width={32}
                      height={32}
                      className='h-10 w-10 rounded-full border border-gray-300 object-cover'
                      priority
                    />
                  ) : (
                    <IconAvatar width={32} height={32} />
                  )}
                  <div className='flex flex-col'>
                    <h3 className={cn(Typography.TITLE_3)}>{data.member.name}</h3>
                    <p className={cn(Typography.BODY_4_REGULAR, 'text-gray-500')}>
                      {formatTimestampToRelativeTime(data.createdAt)}
                    </p>
                  </div>
                </Link>
              </CardHeader>
              <CardContent className='px-6 pb-7 pt-6'>
                <p className={cn(Typography.BODY_3, 'mb-5 text-black')}>{data.content}</p>
                <ImageSlide images={data.files} enlargeMode />
                <ExerciseDetail exercises={data.completedExercises} />
                <PostMetrics
                  workoutHistoryId={workoutHistoryId}
                  liked={data.liked}
                  likeCnt={data.likeCnt}
                  commentCnt={data.commentCnt}
                />
              </CardContent>
              <WorkoutCommentsWrapper />
            </Card>
          )}
        </Layout.Contents>
        <WorkoutCommentInput />
      </Layout>
    </WorkoutCommentContext.Provider>
  );
};

export { CommunityDetailPage };
