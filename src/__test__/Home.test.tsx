/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  it('home이라는글자라 렌더링되는지 ', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'home',
    });

    expect(heading).toBeInTheDocument();
  });
});
