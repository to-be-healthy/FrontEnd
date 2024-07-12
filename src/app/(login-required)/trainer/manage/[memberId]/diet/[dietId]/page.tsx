import { TrainerStudentDietDetailPage } from '@/page/manage';

interface Props {
  params: { memberId: number; dietId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  const dietId = params.dietId;
  return <TrainerStudentDietDetailPage memberId={memberId} dietId={dietId} />;
};
export default Page;
