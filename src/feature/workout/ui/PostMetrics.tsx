'use cilent';

import { useQueryClient } from '@tanstack/react-query';

import {
  useWorkoutCancelLikeMutation,
  useWorkoutCommentContext,
  useWorkoutLikeMutation,
} from '@/feature/workout';
import { IconChat, IconLike } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

const PostMetrics = ({
  workoutHistoryId,
  liked,
  likeCnt,
  commentCnt,
}: {
  workoutHistoryId: number;
  liked: boolean;
  likeCnt: number;
  commentCnt: number;
}) => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useShowErrorToast();
  const { refetch } = useWorkoutCommentContext();

  const { mutate: like } = useWorkoutLikeMutation();
  const { mutate: dislike } = useWorkoutCancelLikeMutation();

  const refreshMetrics = async () => {
    await refetch();

    const queryKey = ['workoutDetail', workoutHistoryId];
    const cachedData = queryClient.getQueryData(queryKey);
    if (cachedData) {
      await queryClient.refetchQueries({
        queryKey,
      });
    }
  };

  const toggleLike = () => {
    if (!liked) {
      like(workoutHistoryId, {
        onSuccess: async () => {
          await refreshMetrics();
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      });
    }

    if (liked) {
      dislike(workoutHistoryId, {
        onSuccess: async () => {
          await refreshMetrics();
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      });
    }
  };

  return (
    <div className='mt-6 flex gap-4'>
      <button className='flex items-center gap-2' onClick={toggleLike}>
        <IconLike
          stroke={cn(liked ? 'var(--point-color)' : 'var(--gray-500)')}
          fill={cn(liked ? 'var(--point-color)' : 'transparent')}
        />
        <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>{likeCnt}</p>
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
