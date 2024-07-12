import { TrainerStudentReservationPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <TrainerStudentReservationPage memberId={memberId} />;
};
export default Page;
