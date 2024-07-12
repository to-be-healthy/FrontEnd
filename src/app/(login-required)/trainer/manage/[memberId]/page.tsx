import { TrainerStudentDetailPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerStudentDetailPage memberId={params.memberId} />;
};

export default Page;
