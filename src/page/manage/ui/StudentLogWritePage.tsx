'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useImages } from '@/entity/image';
import { useCreateLogMutation } from '@/feature/log';
import IconCamera from '@/shared/assets/images/icon_camera.svg';
import IconClose from '@/shared/assets/images/icon_close.svg';
import { Typography } from '@/shared/mixin';
import { Button, Input, Layout, Textarea } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  memberId: number;
}

const MAX_IMAGES_COUNT = 3;

const StudentLogWritePage = ({ memberId }: Props) => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [scheduleId] = useState(5740); // TODO
  const { images, uploadFiles } = useImages({ maxCount: MAX_IMAGES_COUNT });

  const { mutate } = useCreateLogMutation();

  const submit = () => {
    mutate(
      {
        title: '무제',
        content,
        studentId: memberId,
        scheduleId,
        uploadFileResponse: images,
      },
      {
        onSuccess: () => {
          router.push(`/trainer/manage/${memberId}/log`);
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
  };

  const submitButtonDisabled = !content;

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          className='p-0'
          onClick={() => router.push(`/trainer/manage/${memberId}/log`)}>
          <IconClose width={20} height={20} />
        </Button>
        <p className='typography-heading-4 flex h-full items-center'>수업 일지 작성</p>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
      </Layout.Header>
      <Layout.Contents className='p-[20px]'>
        <div className='flex-col space-y-[8px]'>
          <div className='flex items-center justify-between'>
            <h3 className={cn(Typography.TITLE_3)}>작성할 수업</h3>
            <Button variant='ghost' size='auto' className='text-gray-500'>
              변경하기
            </Button>
          </div>
          <div className='flex-col space-y-[10px] rounded-lg border border-gray-200 p-[16px]'>
            <p className={cn(Typography.TITLE_3, 'text-gray-600')}>12월 31일 목요일</p>
            <div className='space-x-[6px]'>
              <span className={cn(Typography.TITLE_1_BOLD)}>10:00 ~ 11:00</span>
              <span className='rounded-sm bg-blue-50 px-[10px] py-[4px] text-primary-500'>
                출석
              </span>
            </div>
          </div>
        </div>
        <div className='mt-[32px] flex space-x-[5.5px]'>
          {/* TODO - image input 컴포넌트 개발 */}
          <div className='flex h-[60px] w-[60px] cursor-pointer flex-col items-center justify-center space-y-[4px] rounded-sm border border-gray-200'>
            <Input
              id='image-input'
              type='file'
              className='hidden'
              onChange={uploadFiles}
            />
            <label htmlFor='image-input'>
              <IconCamera />
              <span className={cn(Typography.BODY_4_REGULAR)}>0 / 3</span>
            </label>
          </div>
          {/* TODO - 업로드 된 이미지 리스트 */}
          {images.map((image, index) => (
            <div key={index} className='overflow-hidden'>
              <Image
                src={image.fileUrl}
                width={60}
                height={60}
                alt='staged image'
                className='rounded-sm'
              />
            </div>
          ))}
        </div>
        <div className='mt-[24px] space-y-[8px]'>
          <h3 className={cn(Typography.TITLE_3)}>내용</h3>
          <Textarea
            placeholder='수업 일지 내용을 작성해 주세요.'
            className={cn(
              Typography.BODY_2,
              'h-[200px] resize-none rounded-lg border border-gray-200 bg-transparent p-[16px] placeholder:text-gray-500'
            )}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button size='full' onClick={submit} disabled={submitButtonDisabled}>
          작성 완료
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};

export { StudentLogWritePage };
