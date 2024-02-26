'use client';

import * as Tabs from '@/shared/ui/tabs';

export default function Page() {
  return (
    <main>
      <Tabs.Root defaultValue='normal'>
        <Tabs.List>
          <Tabs.Trigger value='normal'>회원!</Tabs.Trigger>
          <Tabs.Trigger value='trainer'>트레이너</Tabs.Trigger>
        </Tabs.List>
        <div>
          <Tabs.Content value='normal'>회원 로그인 UI</Tabs.Content>
          <Tabs.Content value='trainer'>트레이너 로그인 UI</Tabs.Content>
        </div>
      </Tabs.Root>
    </main>
  );
}
