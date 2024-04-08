import { StudentDetailPage } from '@/pages/manage';

interface Props {
  params: { memberId: string };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <StudentDetailPage memberId={memberId} />;
};
export default Page;
