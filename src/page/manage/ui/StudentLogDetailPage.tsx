import { Layout } from '@/widget';

interface Props {
  logId: number;
  memberId: number;
}

const StudentLogDetailPage = ({ memberId, logId }: Props) => {
  console.log(memberId, logId);
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout.Contents></Layout.Contents>
    </Layout>
  );
};

export { StudentLogDetailPage };
