import { StudentCourseDetailPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <StudentCourseDetailPage memberId={memberId} />;
};
export default Page;
