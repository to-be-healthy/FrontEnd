import { TrainerWorkoutPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerWorkoutPage memberId={params.memberId} />;
};

export default Page;
