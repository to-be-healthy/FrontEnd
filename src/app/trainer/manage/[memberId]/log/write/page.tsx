import { StudentLogWritePage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <StudentLogWritePage memberId={params.memberId} />;
};

export default Page;
