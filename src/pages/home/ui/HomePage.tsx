'use client';

import 'react-calendar/dist/Calendar.css';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

import Dialog from '@/shared/ui/dialog';
import Select from '@/shared/ui/select';
import * as Tabs from '@/shared/ui/tabs';

import { StyledCalendar } from './calendar';

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

const DialogContent = styled(Dialog.Content)`
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #fff;
`;

const DialogClose = styled(Dialog.Close)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
`;

interface TestResponse {
  postId: number;
  postName: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const getTest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/test`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<TestResponse>;
};

export const HomePage = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  const [value, onChange] = useState<Value>(new Date());

  const handleFetch = async () => {
    const result = await getTest();
    console.log(result);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }).then(() => {
      router.replace('/');
    });
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

      <Dialog>
        <Dialog.Trigger>calendar</Dialog.Trigger>
        <DialogContent className='Dialog'>
          <Dialog.Description>
            <StyledCalendar
              locale='en'
              onChange={onChange}
              value={value}
              calendarType='gregory'
              tileContent={({ date, view }) =>
                view === 'month' && date.getDay() === 2 ? (
                  <span className='dot'>1300kcal</span>
                ) : null
              }
            />
          </Dialog.Description>
          <DialogClose>X</DialogClose>
        </DialogContent>
      </Dialog>
      <Calendar locale='en' onChange={onChange} value={value} calendarType='gregory' />
      <button onClick={handleLogout}>로그아웃</button>
    </main>
  );
};
