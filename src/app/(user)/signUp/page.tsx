'use client';

import { ChangeEvent, useRef, useState } from 'react';

import Button from '@/shared/ui/button/Button';
import PasswordInput from '@/shared/ui/input/passwordInput/PasswordInput';
import PhoneInput from '@/shared/ui/input/phoneInput/PhoneInput';
import TextInput from '@/shared/ui/input/textInput/TextInput';

const SignUp = () => {
  const [value1, setValue1] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue1(value);
  };

  const clickHandler = () => {
    setValue1('sdf');
  };

  const ref = useRef(null);

  return (
    <div>
      <PasswordInput ref={ref} value={value1} onChange={changeHandler} />
      <TextInput value={value1} onChange={changeHandler} />
      <PhoneInput
        ref={ref}
        value={value1}
        onChange={changeHandler}
        onClick={clickHandler}
      />
      <Button onClick={clickHandler} color='#fff' bgColor='blue'>
        버튼
      </Button>
    </div>
  );
};

export default SignUp;
