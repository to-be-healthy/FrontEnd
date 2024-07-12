import { TrainerStudentDietListPage } from '@/page/feedback';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <TrainerStudentDietListPage memberId={memberId} />;
};
export default Page;
