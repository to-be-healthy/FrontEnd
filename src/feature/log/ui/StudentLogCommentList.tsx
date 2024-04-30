'use client';

import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Fragment, PropsWithChildren, useState } from 'react';

import { Comment } from '@/entity/comment';
import IconProfile from '@/shared/assets/images/icon_default_profile_small.svg';
import { Typography } from '@/shared/mixin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

type Props = PropsWithChildren<{
  comments: Comment[];
  depth?: number;
}>;

const StudentLogCommentList = ({ comments, depth = 0 }: Props) => {
  return (
    <ul className={cn('flex-col', depth !== 0 && 'ml-[47px]')}>
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <StudentLogCommentItem comment={comment} />
          {comment.reply && (
            <StudentLogCommentList comments={comment.reply} depth={depth + 1} />
          )}
        </Fragment>
      ))}
    </ul>
  );
};

const StudentLogCommentItem = ({
  comment,
  className,
  ...props
}: {
  comment: Comment;
  className?: string;
}) => {
  const [opend, setOpend] = useState(false);

  const editComment = () => {
    console.log('Edit', comment.id);
  };

  const deleteComment = () => {
    console.log('Delete', comment.id);
  };

  return (
    <DropdownMenu onOpenChange={(open) => setOpend(open)}>
      <DropdownMenuTrigger asChild>
        <li
          className={cn(
            'flex space-x-[6px] px-[16px] py-[10px]',
            opend && 'bg-blue-10',
            className
          )}
          {...props}>
          <IconProfile width={24} height={24} />
          <div className='flex-col'>
            <p className={cn(Typography.HEADING_5)}>{comment.writerName}</p>
            <p className={cn(Typography.BODY_3)}>{comment.content}</p>
          </div>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
        <DropdownMenuGroup className='flex flex-col'>
          <DropdownMenuItem
            className='typography-title-3 px-[16px] py-[12px]'
            onClick={editComment}>
            댓글 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            className='typography-title-3 px-[16px] py-[12px]'
            onClick={deleteComment}>
            댓글 삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { StudentLogCommentList };
