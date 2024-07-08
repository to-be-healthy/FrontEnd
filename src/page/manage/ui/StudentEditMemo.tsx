'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { useEditMemoMutation } from '@/feature/manage';
import IconBack from '@/shared/assets/images/icon_back.svg';
import { Typography } from '@/shared/mixin';
import { Button, useToast } from '@/shared/ui';
import { Textarea } from '@/shared/ui/textarea';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

import { useStudentInfo } from '../hooks/useStudentInfo';

interface Props {
  memberId: number;
}

const StudentEditMemo = ({ memberId }: Props) => {
  const router = useRouter();
  const { successToast, errorToast } = useToast();
  const { memberInfo, refetchMemberInfo } = useStudentInfo(memberId);
  const { mutate } = useEditMemoMutation();
  const memoTextareaRef = useRef<HTMLTextAreaElement>(null);

  const updateMemo = () => {
    const newMemo = memoTextareaRef.current?.value;
    if (!newMemo) return;

    mutate(
      { studentId: memberId, memo: newMemo },
      {
        onSuccess: async () => {
          await refetchMemberInfo();
          successToast('메모를 저장했습니다.');
          router.push(`/trainer/manage/${memberId}`);
        },
        onError: (error) => {
          errorToast(error.response?.data.message);
        },
      }
    );
  };

  return (
    <Layout className='bg-white'>
      {memberInfo && (
        <>
          <Layout.Header>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => router.replace(`/trainer/manage/${memberId}`)}>
              <IconBack />
            </Button>
            <h2 className={Typography.HEADING_4_SEMIBOLD}>{memberInfo.name}님 메모장</h2>
            <Button
              variant='ghost'
              size='icon'
              className={cn(Typography.BODY_1)}
              onClick={updateMemo}>
              완료
            </Button>
          </Layout.Header>
          <Layout.Contents>
            <Textarea
              ref={memoTextareaRef}
              placeholder='메모를 입력해주세요.'
              defaultValue={memberInfo.memo ?? ''}
              className={cn(Typography.BODY_2, 'h-full resize-none px-7 py-8')}
            />
          </Layout.Contents>
        </>
      )}
    </Layout>
  );
};

export { StudentEditMemo };
