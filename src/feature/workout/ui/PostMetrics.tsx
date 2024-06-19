'use cilent';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  useWorkoutCancelLikeMutation,
  useWorkoutLikeMutation,
  WorkoutDetail,
} from '@/feature/workout';
import { IconChat, IconLike } from '@/shared/assets';
import { useDebounce, useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

const PostMetrics = ({
  workoutHistoryId,
  liked: defaultLiked,
  likeCnt: defaultLikedCnt,
  commentCnt,
}: {
  workoutHistoryId: number;
  liked: boolean;
  likeCnt: number;
  commentCnt: number;
}) => {
  const queryKey = ['workoutDetail', workoutHistoryId];
  const queryClient = useQueryClient();

  const { showErrorToast } = useShowErrorToast();

  const { mutate: like } = useWorkoutLikeMutation();
  const { mutate: dislike } = useWorkoutCancelLikeMutation();

  const [likedState, setLikedState] = useState({
    liked: defaultLiked,
    likedCnt: defaultLikedCnt,
  });

  const debouncedLikedState = useDebounce(likedState, 300);

  const toggleLiked = () => {
    setLikedState((prev) => ({
      liked: !prev.liked,
      likedCnt: prev.likedCnt + (prev.liked ? -1 : 1),
    }));
  };

  const setLikedStateQueryData = async () => {
    await queryClient.cancelQueries({ queryKey });

    const prev = queryClient.getQueryData<WorkoutDetail>(queryKey);
    if (prev) {
      queryClient.setQueryData<WorkoutDetail>(queryKey, {
        ...prev,
        liked: likedState.liked,
        likeCnt: likedState.likedCnt,
      });
    }
  };

  const restoreLikedState = () => {
    setLikedState({
      liked: defaultLiked,
      likedCnt: defaultLikedCnt,
    });
  };

  const mutateLikedState = () => {
    if (likedState.liked) {
      like(workoutHistoryId, {
        onSuccess: async () => {
          await setLikedStateQueryData();
        },
        onError: (error) => {
          restoreLikedState();
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
        onSettled: async () => {
          await queryClient.invalidateQueries({ queryKey });
        },
      });
    }

    if (!likedState.liked) {
      dislike(workoutHistoryId, {
        onSuccess: async () => {
          await setLikedStateQueryData();
        },
        onError: (error) => {
          restoreLikedState();
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
        onSettled: async () => {
          await queryClient.invalidateQueries({ queryKey });
        },
      });
    }
  };

  useEffect(() => {
    if (likedState.liked !== defaultLiked) {
      mutateLikedState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLikedState]);

  return (
    <div className='mt-6 flex gap-4'>
      <button className='flex items-center gap-2' onClick={toggleLiked}>
        <IconLike
          stroke={cn(likedState.liked ? 'var(--point-color)' : 'var(--gray-500)')}
          fill={cn(likedState.liked ? 'var(--point-color)' : 'transparent')}
        />
        <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
          {likedState.likedCnt}
        </p>
      </button>
      <div className='flex items-center gap-2'>
        <IconChat />
        <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
          댓글 {commentCnt > 0 && <span>{commentCnt}</span>}
        </p>
      </div>
    </div>
  );
};

export { PostMetrics };
