'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { StudentList } from '@/feature/manage';
import { AddStudentDialog } from '@/feature/member';
import { useAddScheduleMutation } from '@/feature/schedule';
import { IconBack } from '@/shared/assets';
import { Layout } from '@/widget';

const TrainerSelectStudentPage = ({ scheduleId }: { scheduleId: number }) => {
  const router = useRouter();
  const { mutate } = useAddScheduleMutation();
  const queryClient = useQueryClient();

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
          console.log(error);
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
        <h2 className='typography-heading-4 font-semibold'>수업할 회원 선택</h2>
        <AddStudentDialog />
      </Layout.Header>
      <Layout.Contents>
        <StudentList callback={addSchedule} />
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerSelectStudentPage };
