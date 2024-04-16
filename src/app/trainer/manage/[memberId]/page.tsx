import { StudentDetailPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <StudentDetailPage memberId={memberId} />;
};
export default Page;
