import { TrainerLogPage } from '@/page/manage';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerLogPage memberId={params.memberId} />;
};

export default Page;
