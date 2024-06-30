import {
  ChangeEvent,
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useState,
} from 'react';

import { useCreateWorkoutCommentMutation } from '../api/useCreateWorkoutCommentMutation';
import { useDeleteWorkoutCommentMutation } from '../api/useDeleteWorkoutCommentMutation';
import { useEditWorkoutCommentMutation } from '../api/useEditWorkoutCommentMutation';
import { useWorkoutCommentQuery } from '../api/useWorkoutCommentQuery';
import { WorkoutComment } from '../model/types';

type ContextType = ReturnType<typeof useWorkoutComment> | null;

const WorkoutCommentContext = createContext<ContextType>(null);

const useWorkoutCommentContext = () => {
  const context = useContext(WorkoutCommentContext);

  if (context === null) {
    throw new Error();
  }

  return context;
};

type CommentTarget = {
  comment: WorkoutComment;
  isReply: boolean;
  mode: 'create' | 'edit';
} | null;

interface Props {
  workoutHistoryId: number;
  ref: MutableRefObject<HTMLTextAreaElement | null>;
}

const useWorkoutComment = ({ workoutHistoryId, ref }: Props) => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState<CommentTarget>(null);

  const { data, refetch } = useWorkoutCommentQuery({
    workoutHistoryId,
  });
  const comments = data?.pages.flatMap((page) => page.content).filter(Boolean);

  const { mutate: createComment } = useCreateWorkoutCommentMutation(workoutHistoryId);
  const { mutate: editComment } = useEditWorkoutCommentMutation(workoutHistoryId);
  const { mutate: deleteCommentMutate } =
    useDeleteWorkoutCommentMutation(workoutHistoryId);

  const changeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  const focusOnInput = useCallback(() => {
    ref?.current?.focus();
  }, [ref]);

  const changeTarget = useCallback(
    (target: CommentTarget) => {
      target?.mode === 'create' ? clearText() : setText(target?.comment.content ?? '');

      setTarget(target);
      focusOnInput();
    },
    [clearText, focusOnInput]
  );

  const submitComment = () => {
    // 신규 댓글
    if (target === null) {
      createComment({ content: text }, commentCallback);
    }
    // 신규 대댓글
    if (target && target.mode === 'create' && target.isReply) {
      const commentId = target.comment.parentId ?? target.comment.id;
      createComment({ content: text, parentCommentId: commentId }, commentCallback);
    }
    // 댓글, 대댓글 수정
    if (target && target.mode === 'edit') {
      const commentId = target.comment.id;
      editComment({ content: text, commentId }, commentCallback);
    }
  };

  const deleteComment = (commentId: number) => {
    deleteCommentMutate({ commentId }, commentCallback);
  };

  const commentCallback = {
    onSuccess: async () => {
      await refetch();
      clearText();
      changeTarget(null);
    },
  };

  return {
    target,
    text,
    comments,
    ref,
    workoutHistoryId,
    submitComment,
    changeText,
    clearText,
    refetch,
    focusOnInput,
    changeTarget,
    deleteComment,
  };
};

export { useWorkoutComment, useWorkoutCommentContext, WorkoutCommentContext };
