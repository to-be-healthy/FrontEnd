import { StudentEditPage } from '@/pages/manage';

interface Props {
  params: { memberId: string };
}

const Page = ({ params }: Props) => {
  const memberId = params.memberId;
  return <StudentEditPage memberId={memberId} />;
};
export default Page;
