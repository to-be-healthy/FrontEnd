'use client';

import { StudentDietEditPage } from '@/page/diet';

interface Props {
  params: { dietId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <StudentDietEditPage dietId={params.dietId} />;
};

export default Page;
