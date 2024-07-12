import { StudentWorkoutDetailPage } from '@/page/workout';

interface Props {
  params: { workoutHistoryId: number };
}

const Page = ({ params }: Props) => {
  return <StudentWorkoutDetailPage workoutHistoryId={params.workoutHistoryId} />;
};

export default Page;
