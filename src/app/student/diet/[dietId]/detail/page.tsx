'use client';

import { StudentDietDetailPage } from '@/page/diet';

interface Props {
  params: { dietId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <StudentDietDetailPage dietId={params.dietId} />;
};

export default Page;
