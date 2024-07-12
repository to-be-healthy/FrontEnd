import { StudentLogDetailPage } from '@/page/feedback';

interface Props {
  params: { logId: number };
}

const Page = ({ params }: Props) => {
  return <StudentLogDetailPage logId={params.logId} />;
};

export default Page;
