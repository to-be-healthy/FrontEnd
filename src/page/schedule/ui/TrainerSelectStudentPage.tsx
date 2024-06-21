'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { StudentList } from '@/feature/manage';
import { AddStudentDialog } from '@/feature/member';
import { useAddScheduleMutation } from '@/feature/schedule';
import { IconBack } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const TrainerSelectStudentPage = ({ scheduleId }: { scheduleId: number }) => {
  const router = useRouter();
  const { mutate } = useAddScheduleMutation();
  const queryClient = useQueryClient();

  const { showErrorToast } = useShowErrorToast();

  const addSchedule = (studentId: number) => {
    mutate(
      { studentId, scheduleId },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: ['schedule'].filter(Boolean),
          });
          router.push('/trainer/schedule');
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  return (
    <Layout>
      <Layout.Header>
        <Link href={'/trainer/schedule'}>
          <IconBack />
        </Link>
        <h2 className={cn(Typography.HEADING_4)}>수업할 회원 선택</h2>
        <AddStudentDialog />
      </Layout.Header>
      <Layout.Contents>
        <StudentList callback={addSchedule} />
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerSelectStudentPage };
