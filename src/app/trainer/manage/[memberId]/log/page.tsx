import { StudentLogPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <StudentLogPage memberId={params.memberId} />;
};

export default Page;
