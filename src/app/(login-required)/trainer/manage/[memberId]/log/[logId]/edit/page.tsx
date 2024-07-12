import { TrainerEditLogPage } from '@/page/manage';

interface Props {
  params: { logId: number; memberId: number };
}

const Page = ({ params }: Props) => {
  return <TrainerEditLogPage logId={params.logId} />;
};

export default Page;
