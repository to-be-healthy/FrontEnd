import { useQueryClient } from '@tanstack/react-query';
import {
  ChangeEvent,
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useState,
} from 'react';

import { ContentType } from '../model/types';

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
  comment: ContentType;
  isReply: boolean;
  mode: 'create' | 'edit';
} | null;

interface Props {
  dietId: number;
  ref: MutableRefObject<HTMLTextAreaElement | null>;
}

const useComment = ({ dietId, ref }: Props) => {
  const queryClient = useQueryClient();

  const [text, setText] = useState('');
  const [target, setTarget] = useState<CommentTarget>(null);

  const refreshComments = async () => {
    await queryClient.refetchQueries({
      queryKey: ['dietCommentList', dietId],
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
    dietId,
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
