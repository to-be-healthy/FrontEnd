'use client';

import { useSearchParams } from 'next/navigation';

import { TrainerSelectStudentPage } from '@/page/schedule';

const Page = () => {
  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get('scheduleId');
  if (!scheduleId) {
    throw new Error();
  }

  return <TrainerSelectStudentPage scheduleId={Number(scheduleId)} />;
};

export default Page;
