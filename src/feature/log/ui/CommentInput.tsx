import IconArrowTop from '@/shared/assets/images/icon_arrow_up_background.svg';
import IconPicture from '@/shared/assets/images/icon_picture.svg';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useCreateLogCommentMutation } from '../api/useCreateLogCommentMutation';
import { useCreateLogReplyMutation } from '../api/useCreateLogReplyMutation';
import { useEditLogCommentMutation } from '../api/useEditLogCommentMutation';
import { useCommentContext } from '../hooks/useComment';

const CommentInput = () => {
  const {
    refreshComments,
    logId,
    ref,
    text,
    changeText,
    target,
    changeTarget,
    clearText,
  } = useCommentContext();
  const { mutate: createComment } = useCreateLogCommentMutation(logId);
  const { mutate: createReply } = useCreateLogReplyMutation(logId);
  const { mutate: editComment } = useEditLogCommentMutation();

  // TODO - 리팩토링 필요
  const submitComment = () => {
    // 신규 댓글
    if (target === null) {
      createComment({ comment: text }, commentCallback);
    }

    // 신규 대댓글 mode, isReply
    if (target?.mode === 'create' && target?.isReply) {
      const id = target.comment.parentId ?? target.comment.id;
      createReply({ comment: text, id }, commentCallback);
    }

    // 댓글, 대댓글 수정
    if (target?.mode === 'edit') {
      editComment({ comment: text, id: target.comment.id }, commentCallback);
    }
  };

  const commentCallback = {
    onSuccess: async () => {
      await refreshComments();
      clearText();
    },
  };

  return (
    <div
      className={cn(
        'border-t border-gray-200 bg-white p-[16px]',
        target?.isReply && 'pt-0'
      )}>
      {target?.isReply && (
        <div
          className={cn(
            Typography.BODY_4_REGULAR,
            'flex items-center justify-center gap-[6px] py-[10px]'
          )}>
          {target.comment.member.name}님에게 답글 남기는 중
          <span className='h-[2px] w-[2px] rounded-full bg-gray-500' />
          <Button
            variant='ghost'
            size='auto'
            className={cn(Typography.BODY_4_REGULAR, 'text-gray-500')}
            onClick={() => changeTarget(null)}>
            취소
          </Button>
        </div>
      )}
      <div className={cn('flex items-center justify-between space-x-[10px] ')}>
        <IconPicture />
        <div className='flex-1 rounded-md border px-[16px] py-[13px] focus-within:border-primary-500'>
          <Input
            ref={ref}
            placeholder='댓글을 입력하세요.'
            value={text}
            onChange={changeText}
            className='w-full'
          />
        </div>
        {text && (
          <Button variant='ghost' size='auto' onClick={submitComment}>
            <IconArrowTop />
          </Button>
        )}
      </div>
    </div>
  );
};

export { CommentInput };
