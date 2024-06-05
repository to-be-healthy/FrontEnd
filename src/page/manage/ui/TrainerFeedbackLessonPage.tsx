'use client';

import { useSearchParams } from 'next/navigation';

import { Layout } from '@/widget';

const TrainerFeedbackLessonPage = () => {
  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get('scheduleId');
  if (!scheduleId) {
    throw new Error();
  }
  console.log(scheduleId);
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Contents>{scheduleId}</Layout.Contents>
    </Layout>
  );
};

export { TrainerFeedbackLessonPage };
