import { TrainerEditLogPage } from '@/page/manage';

interface Props {
  params: { logId: number; memberId: number };
}

const Page = ({ params }: Props) => {
  return <TrainerEditLogPage logId={params.logId} memberId={params.memberId} />;
};

export default Page;
