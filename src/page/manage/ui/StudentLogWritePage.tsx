'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateLogMutation } from '@/feature/log';
import IconCamera from '@/shared/assets/images/icon_camera.svg';
import IconClose from '@/shared/assets/images/icon_close.svg';
import { Typography } from '@/shared/mixin';
import { Button, Layout, Textarea } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  memberId: number;
}

const StudentLogWritePage = ({ memberId }: Props) => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [scheduleId] = useState(0); // TODO

  const { mutate } = useCreateLogMutation();

  const submit = () => {
    mutate(
      {
        request: {
          title: '', // TODO - figma에는 타이틀 없음
          content,
          studentId: memberId,
          scheduleId,
        },
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
          <IconClose />
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
        <div className='mt-[32px]'>
          {/* TODO - image input 컴포넌트 개발 */}
          <div className='flex h-[60px] w-[60px] flex-col items-center justify-center space-y-[4px] rounded-sm border border-gray-200'>
            <IconCamera />
            <span className={cn(Typography.BODY_4_REGULAR)}>0 / 3</span>
          </div>
          {/* TODO - 업로드 된 이미지 리스트 */}
          <div></div>
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
