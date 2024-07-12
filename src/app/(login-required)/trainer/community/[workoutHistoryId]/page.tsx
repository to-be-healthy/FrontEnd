import { CommunityDetailPage } from '@/page/workout';

interface Props {
  params: { workoutHistoryId: number };
}

const Page = ({ params }: Props) => {
  return <CommunityDetailPage workoutHistoryId={params.workoutHistoryId} />;
};

export default Page;
