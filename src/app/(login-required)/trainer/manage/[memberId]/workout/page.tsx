import { TrainerWorkoutPage } from '@/page/workout';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerWorkoutPage memberId={params.memberId} />;
};

export default Page;
