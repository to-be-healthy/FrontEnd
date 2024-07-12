import { TrainerWorkoutDetailPage } from '@/page/workout';

interface Props {
  params: { workoutHistoryId: number; memberId: number };
}

const Page = ({ params }: Props) => {
  const { workoutHistoryId, memberId } = params;
  return (
    <TrainerWorkoutDetailPage workoutHistoryId={workoutHistoryId} memberId={memberId} />
  );
};

export default Page;
