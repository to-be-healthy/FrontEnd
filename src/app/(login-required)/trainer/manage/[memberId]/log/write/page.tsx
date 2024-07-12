import { TrainerCreateLogPage } from '@/page/feedback';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerCreateLogPage memberId={params.memberId} />;
};

export default Page;
