'use client';

import Image from 'next/image';
import { Fragment, PropsWithChildren, useState } from 'react';

import { useAuthSelector } from '@/entity/auth';
import { IconProfileDefault } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useDeleteCommentMutation } from '../api/useDeleteCommentMutation';
import { useStudentCommentContext } from '../hooks/useStudentComment';
import type { Comment } from '../model/types';

type Props = PropsWithChildren<{
  comments: Comment[];
  depth?: number;
}>;

const StudentCommentList = ({ comments, depth = 0 }: Props) => {
  return (
    <ul className={cn('flex-col')}>
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <CommentItem comment={comment} depth={depth} />
          {comment.replies && comment.replies.length > 0 && (
            <li>
              <StudentCommentList comments={comment.replies} depth={depth + 1} />
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

  const { target, changeTarget, focusOnInput, refreshComments } =
    useStudentCommentContext();
  const { memberId } = useAuthSelector(['memberId']);
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
    <DropdownMenu
      open={opend}
      onOpenChange={(state) => {
        if (comment.delYn) return;
        if (comment.member.memberId !== memberId) return;
        setOpend(state);
      }}
      modal={false}>
      <DropdownMenuTrigger asChild>
        <li className={cn(active && 'bg-blue-10', className)} {...props}>
          <div className={cn('flex space-x-2 px-6 py-4', depth !== 0 && 'ml-[47px]')}>
            {comment.member.fileUrl ? (
              <Image
                src={comment.member.fileUrl}
                width={80}
                height={80}
                alt='staged image'
                className={cn('aspect-square h-8 w-8 rounded-full object-cover')}
                priority
              />
            ) : (
              <IconProfileDefault width={24} height={24} />
            )}
            <div className='flex-col'>
              <div className='flex-col'>
                <p className={cn(Typography.HEADING_5)}>{comment.member.name}</p>
                <p className={cn(Typography.BODY_3, comment.delYn && 'text-gray-500')}>
                  {comment.content}
                </p>
                {!comment.delYn && comment.files.length > 0 && (
                  <div className='mt-2'>
                    {comment.files.map((file, index) => (
                      <div key={index} className='overflow-hidden'>
                        <Image
                          src={file.fileUrl}
                          width={90}
                          height={90}
                          alt='staged image'
                          className={cn('aspect-square rounded-sm')}
                          priority
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!comment.delYn && depth === 0 && (
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
                  onClick={() => {
                    focusOnInput();
                  }}>
                  답글달기
                </Button>
              )}
            </div>
          </div>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
        <DropdownMenuGroup className='flex flex-col'>
          <DropdownMenuItem
            className={cn(Typography.TITLE_3, 'px-6 py-5')}
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
            className={cn(Typography.TITLE_3, 'px-6 py-5')}
            onClick={() => {
              deleteComment(comment.id);
              setOpend(false);
            }}>
            댓글 삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { StudentCommentList };
