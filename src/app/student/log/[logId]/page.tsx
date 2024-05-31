import { StudentLogDetailPage } from '@/page/manage';

interface Props {
  params: { logId: number; memberId: number };
}

const Page = ({ params }: Props) => {
  return <StudentLogDetailPage logId={params.logId} memberId={params.memberId} />;
};

export default Page;
