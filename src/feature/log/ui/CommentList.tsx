'use client';

import { Fragment, PropsWithChildren, useState } from 'react';

import IconProfile from '@/shared/assets/images/icon_default_profile_small.svg';
import { Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

import { useDeleteCommentMutation } from '../api/useDeleteCommentMutation';
import { useCommentContext } from '../hooks/useComment';
import type { Comment } from '../model/types';

type Props = PropsWithChildren<{
  comments: Comment[];
  depth?: number;
}>;

const CommentList = ({ comments, depth = 0 }: Props) => {
  return (
    <ul className={cn('flex-col')}>
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <CommentItem comment={comment} depth={depth} />
          {comment.replies && (
            <li>
              <CommentList comments={comment.replies} depth={depth + 1} />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

const CommentItem = ({
  comment,
  depth,
  className,
  ...props
}: {
  comment: Comment;
  depth: number;
  className?: string;
}) => {
  const [opend, setOpend] = useState(false);

  const { target, changeTarget, focusOnInput, refreshComments } = useCommentContext();
  const { mutate } = useDeleteCommentMutation();

  const active = opend || target?.comment.id === comment.id;

  const deleteComment = (commentId: number) => {
    mutate(
      { id: commentId },
      {
        onSuccess: async () => {
          await refreshComments();
        },
      }
    );
  };

  return (
    <DropdownMenu onOpenChange={(state) => setOpend(state)} modal={false}>
      <DropdownMenuTrigger asChild>
        <li className={cn(active && 'bg-blue-10', className)} {...props}>
          <div
            className={cn(
              'flex space-x-[6px] px-[16px] py-[10px]',
              depth !== 0 && 'ml-[47px]'
            )}>
            <IconProfile width={24} height={24} />
            <div className='flex-col'>
              <div className='flex-col'>
                <p className={cn(Typography.HEADING_5)}>{comment.member.name}</p>
                <p className={cn(Typography.BODY_3, comment.delYn && 'text-gray-500')}>
                  {comment.content}
                </p>
              </div>
              <Button
                variant='ghost'
                size='auto'
                className={cn(Typography.BODY_4_REGULAR, 'z-50 text-gray-500')}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  changeTarget({
                    comment,
                    isReply: true,
                    mode: 'create',
                  });
                }}
                onClick={() => focusOnInput()}>
                답글달기
              </Button>
            </div>
          </div>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
        <DropdownMenuGroup className='flex flex-col'>
          <DropdownMenuItem
            className='typography-title-3 px-[16px] py-[12px]'
            onClick={() => {
              changeTarget({
                comment,
                isReply: false,
                mode: 'edit',
              });
              focusOnInput();
            }}>
            댓글 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className='typography-title-3 px-[16px] py-[12px]'
            onClick={() => deleteComment(comment.id)}>
            댓글 삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CommentList };
