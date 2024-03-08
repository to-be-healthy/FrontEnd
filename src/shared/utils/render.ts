/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-anonymous-default-export */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default async (component: React.ReactNode) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(component),
  };
};
