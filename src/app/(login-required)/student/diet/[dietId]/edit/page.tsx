'use client';

import { DietEditProvider } from '@/page/diet';

interface Props {
  params: { dietId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <DietEditProvider dietId={params.dietId} />;
};

export default Page;
