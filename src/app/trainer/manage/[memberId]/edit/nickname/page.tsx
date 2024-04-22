import { StudentEditNickname } from '@/page/manage/ui/StudentEditNickname';
interface Props {
  params: { memberId: number };
}
const Page = ({ params }: Props) => {
  return <StudentEditNickname memberId={params.memberId} />;
};

export default Page;
