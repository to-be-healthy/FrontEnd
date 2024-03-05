'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { PasswordInput } from '@/shared/ui/input/passwordInput';
import { TextInput } from '@/shared/ui/input/textInput';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`;

interface Inputs {
  id: string;
  password: string;
  trainer: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>로그인</h2>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          defaultValue='test'
          placeholder='아이디'
          {...register('id', { required: true })}
        />
        {errors.id && <span style={{ color: 'red' }}>Id is required</span>}
        <PasswordInput
          placeholder='비밀번호'
          {...register('password', { required: true })}
        />
        {errors.password && <span style={{ color: 'red' }}>Password is required</span>}
        <button type='submit'>로그인</button>
      </FormWrapper>
    </div>
  );
};

export default SignIn;
