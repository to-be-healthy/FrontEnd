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

type ContextType = ReturnType<typeof useStudentComment> | null;

const StudentCommentContext = createContext<ContextType>(null);

const useStudentCommentContext = () => {
  const context = useContext(StudentCommentContext);

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
  logId: number;
  ref: MutableRefObject<HTMLTextAreaElement | null>;
}

const useStudentComment = ({ logId, ref }: Props) => {
  const queryClient = useQueryClient();

  const [text, setText] = useState('');
  const [target, setTarget] = useState<CommentTarget>(null);

  const refreshComments = async () => {
    await queryClient.refetchQueries({
      queryKey: ['logDetail', logId],
    });
  };

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

  return {
    logId,
    ref,
    target,
    text,
    changeText,
    clearText,
    focusOnInput,
    changeTarget,
    refreshComments,
  };
};

export { StudentCommentContext, useStudentComment, useStudentCommentContext };
