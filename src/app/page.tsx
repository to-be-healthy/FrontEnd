'use client';

import styled from 'styled-components';

import Select from '@/shared/ui/select';
import * as Tabs from '@/shared/ui/tabs';

const TRAINER_LIST = ['김진영 트레이너', '박혜민 트레이너'];

const SelectTrigger = styled(Select.Trigger)`
  width: 360px;
  padding: 10px;
  border: 1px solid gray;
`;

const SelectContent = styled(Select.Content)`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid gray;
`;

const SelectItem = styled(Select.Item)`
  background-color: white;
`;

interface TestResponse {
  postId: number;
  postName: string;
}

const getTest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/test`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<TestResponse>;
};

export default function Page() {
  const handleFetch = async () => {
    const result = await getTest();
    console.log(result);
  };

  return (
    <main>
      <Tabs.Root defaultValue='normal'>
        <Tabs.List>
          <Tabs.Trigger value='normal'>회원</Tabs.Trigger>
          <Tabs.Trigger value='trainer'>트레이너</Tabs.Trigger>
        </Tabs.List>
        <div>
          <Tabs.Content value='normal'>회원 로그인 UI</Tabs.Content>
          <Tabs.Content value='trainer'>트레이너 로그인 UI</Tabs.Content>
        </div>
      </Tabs.Root>
      <h2>트레이너 선택하기</h2>
      <Select>
        <SelectTrigger>
          {({ selectedIndex }) => {
            const text =
              selectedIndex !== null
                ? TRAINER_LIST[selectedIndex]
                : '트레이너를 선택해주세요.';
            return <span>{text}</span>;
          }}
        </SelectTrigger>
        <SelectContent>
          {TRAINER_LIST.map((item) => {
            return (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <button onClick={handleFetch}>MOCK CLICK</button>
    </main>
  );
}
