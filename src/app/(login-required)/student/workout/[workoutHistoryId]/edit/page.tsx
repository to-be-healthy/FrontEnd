import { EditWorkoutPage } from '@/page/workout';

interface Props {
  params: { workoutHistoryId: number };
}

const Page = ({ params }: Props) => {
  return <EditWorkoutPage workoutHistoryId={params.workoutHistoryId} />;
};

export default Page;
