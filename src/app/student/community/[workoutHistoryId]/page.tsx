import { CommunityDetailPage } from '@/page/community';

interface Props {
  params: { workoutHistoryId: number };
}

const Page = ({ params }: Props) => {
  return <CommunityDetailPage workoutHistoryId={params.workoutHistoryId} />;
};

export default Page;
