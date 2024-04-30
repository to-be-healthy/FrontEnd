import { StudentLogDetailPage } from '@/page/manage/ui/StudentLogDetailPage';

interface Props {
  params: { LogId: number; memberId: number };
}

const Page = ({ params }: Props) => {
  return <StudentLogDetailPage LogId={params.LogId} memberId={params.memberId} />;
};

export default Page;
