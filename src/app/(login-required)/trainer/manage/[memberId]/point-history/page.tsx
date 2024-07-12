import { StudentPointDetailPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <StudentPointDetailPage memberId={memberId} />;
};
export default Page;
