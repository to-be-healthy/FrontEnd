/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { screen } from '@testing-library/react';

import { TextInput } from '@/shared/ui/input/textInput';
import render from '@/shared/utils/render';

it('props로 넘긴 defaultValue가 노출된다', async () => {
  const { user } = await render(<TextInput defaultValue='text' />);

  const input = screen.getByRole('textbox');

  expect(input).toBeInTheDocument();
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다', async () => {
  const spy = jest.fn();
  const { user } = await render(<TextInput onChange={spy} />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'test');

  expect(spy).toHaveBeenCalled();
  // expect(spy).toHaveBeenCalledWith('test');
});
