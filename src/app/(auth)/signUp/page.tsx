'use client';

import { ChangeEvent, useRef, useState } from 'react';

import Button from '@/shared/ui/button/Button';
import PasswordInput from '@/shared/ui/input/passwordInput/PasswordInput';
import PhoneInput from '@/shared/ui/input/phoneInput/PhoneInput';
import TextInput from '@/shared/ui/input/textInput/TextInput';

const SignUp = () => {
  const [value1, setValue1] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue1(value);
  };

  const handleButtonClick = () => {
    setValue1('sdf');
  };

  const ref = useRef(null);

  return (
    <>
      <PasswordInput ref={ref} value={value1} onChange={handleInputChange} />
      <TextInput value={value1} onChange={handleInputChange} />
      <PhoneInput
        ref={ref}
        value={value1}
        onChange={handleInputChange}
        onButtonClick={handleButtonClick}
      />
      <Button onClick={handleButtonClick}>버튼</Button>
    </>
  );
};

export default SignUp;
