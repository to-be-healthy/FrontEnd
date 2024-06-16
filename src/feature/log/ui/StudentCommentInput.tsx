import Image from 'next/image';
import { useEffect } from 'react';

import { useImages } from '@/entity/image';
import { IconArrowTop, IconPicture } from '@/shared/assets';
import IconCloseCircle from '@/shared/assets/images/icon_close_circle.svg';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useCreateLogCommentMutation } from '../api/useCreateLogCommentMutation';
import { useCreateLogReplyMutation } from '../api/useCreateLogReplyMutation';
import { useEditLogCommentMutation } from '../api/useEditLogCommentMutation';
import { useStudentCommentContext } from '../hooks/useStudentComment';

const StudentCommentInput = () => {
  const {
    logId,
    ref,
    text,
    changeText,
    clearText,
    target,
    changeTarget,
    refreshComments,
  } = useStudentCommentContext();
  const { images, uploadFiles, clearImages, updateImages } = useImages();
  const { mutate: createComment } = useCreateLogCommentMutation(logId);
  const { mutate: createReply } = useCreateLogReplyMutation(logId);
  const { mutate: editComment } = useEditLogCommentMutation();

  // TODO - 리팩토링 필요
  const submitComment = () => {
    // 신규 댓글
    if (target === null) {
      createComment({ content: text, images }, commentCallback);
    }

    // 신규 대댓글
    if (target && target.mode === 'create' && target.isReply) {
      const commentId = target.comment.parentId ?? target.comment.id;
      createReply({ content: text, images, commentId }, commentCallback);
    }

    // 댓글, 대댓글 수정
    if (target && target.mode === 'edit') {
      const commentId = target.comment.id;
      editComment({ content: text, commentId, images }, commentCallback);
    }
  };

  const commentCallback = {
    onSuccess: async () => {
      await refreshComments();
      clearText();
      changeTarget(null);
      clearImages();
    },
  };

  useEffect(() => {
    if (target && target.comment.files.length > 0) {
      updateImages(target.comment.files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div
      className={cn(
        'border-t border-gray-200 bg-white px-[16px] pb-[16px]',
        target === null && 'pt-[16px]'
      )}>
      {/* Input 상단 상태바 - 신규 답글 남기기 */}
      {target !== null && target.mode === 'create' && target.isReply && (
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
            onClick={() => {
              changeTarget(null);
              clearImages();
            }}>
            취소
          </Button>
        </div>
      )}
      {/* Input 상단 상태바 - 기존 댓글, 대댓글 수정하기 */}
      {target !== null && target.mode === 'edit' && (
        <div
          className={cn(
            Typography.BODY_4_REGULAR,
            'flex items-center justify-center gap-[6px] py-[10px]'
          )}>
          댓글 수정 중
          <span className='h-[2px] w-[2px] rounded-full bg-gray-500' />
          <Button
            variant='ghost'
            size='auto'
            className={cn(Typography.BODY_4_REGULAR, 'text-gray-500')}
            onClick={() => {
              changeTarget(null);
              clearImages();
            }}>
            취소
          </Button>
        </div>
      )}
      {/* Input 상단 업로드 할 이미지 */}
      {images.length > 0 && (
        <div className='mb-[8px] flex gap-2'>
          {images.map((image, index) => (
            <div key={index} className='flex items-start space-x-[4px] overflow-hidden'>
              <Image
                src={image.fileUrl}
                width={80}
                height={80}
                alt='staged image'
                className='h-[80px] w-[80px] rounded-sm object-cover'
              />
              <IconCloseCircle
                className='cursor-pointer'
                onClick={() => {
                  updateImages(images.filter((_, idx) => idx !== index));
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className={cn('flex items-center justify-between space-x-[10px]')}>
        <label htmlFor='image-input' className='cursor-pointer'>
          <IconPicture />
          <Input
            id='image-input'
            type='file'
            multiple
            className='hidden'
            accept='image/*'
            onChange={uploadFiles}
          />
        </label>
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

export { StudentCommentInput };
