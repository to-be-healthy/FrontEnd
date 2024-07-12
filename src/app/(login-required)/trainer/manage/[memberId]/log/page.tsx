import { TrainerLogPage } from '@/page/feedback';

interface Props {
  params: { memberId: number };
}

const Page = ({ params }: Readonly<Props>) => {
  return <TrainerLogPage memberId={params.memberId} />;
};

export default Page;
