import { TrainerAppendStudentPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <TrainerAppendStudentPage memberId={memberId} />;
};
export default Page;
