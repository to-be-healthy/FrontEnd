import { TrainerCreateLogPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerCreateLogPage memberId={params.memberId} />;
};

export default Page;
