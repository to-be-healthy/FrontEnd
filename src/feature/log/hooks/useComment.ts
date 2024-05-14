import { useQueryClient } from '@tanstack/react-query';
import {
  ChangeEvent,
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Comment } from '../model/types';

type ContextType = ReturnType<typeof useComment> | null;

const CommentContext = createContext<ContextType>(null);

const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (context === null) {
    throw new Error();
  }

  return context;
};

type CommentTarget = {
  comment: Comment;
  isReply: boolean;
  mode: 'create' | 'edit';
} | null;

interface Props {
  memberId: number;
  logId: number;
  ref: MutableRefObject<HTMLInputElement | null>;
}

const useComment = ({ memberId, logId, ref }: Props) => {
  const queryClient = useQueryClient();

  const [text, setText] = useState('');
  const [target, setTarget] = useState<CommentTarget>(null);

  const refreshComments = async () => {
    await queryClient.refetchQueries({
      queryKey: ['studentLogDetail', memberId, logId],
    });
  };

  const changeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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

  return {
    memberId,
    logId,
    text,
    changeText,
    clearText,
    ref,
    focusOnInput,
    target,
    changeTarget,
    refreshComments,
  };
};

export { CommentContext, useComment, useCommentContext };
