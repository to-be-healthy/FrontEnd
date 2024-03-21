'use client';

// import { useState } from 'react';

import Button from '@/shared/ui/button/Button';

export const SignUpStep2 = () => {
  // const [clickedButton, setClickedButton] = useState<number | null>(null);

  // const handleClickButton = (id: number) => {
  //   console.log(id);
  //   setClickedButton(id);
  // };

  return (
    <article>
      <div>
        <p className='text-blue-500'>
          다니시는 헬스장을
          <br />
          선택해주세요.
        </p>
      </div>

      <ul>
        <li>
          <Button
            id='1'
            // onClick={() => handleClickButton(1)}
            // $isActive={clickedButton === null ? false : clickedButton === 1}
          >
            건강해짐 헬스장 홍대점
          </Button>
        </li>
        <li>
          <Button
            id='2'
            // onClick={() => handleClickButton(2)}
            // $isActive={clickedButton === null ? false : clickedButton === 2}
          >
            바른숨 헬스장 홍대점
          </Button>
        </li>
      </ul>

      <Button>다음</Button>
    </article>
  );
};
