import { StudentEditMemo } from '@/page/manage/ui/StudentEditMemo';
interface Props {
  params: { memberId: number };
}
const Page = ({ params }: Props) => {
  return <StudentEditMemo memberId={params.memberId} />;
};

export default Page;
