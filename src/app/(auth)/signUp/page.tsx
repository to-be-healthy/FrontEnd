'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '@/shared/ui/button/Button';
import { PasswordInput } from '@/shared/ui/input/passwordInput';
import { EmailInput } from '@/shared/ui/input/phoneInput';
import { TextInput } from '@/shared/ui/input/textInput';

const ErrorMsg = styled.p`
  color: red;
`;

interface IFormInput {
  nickname: string;
  password: string;
  passwordConfirm: string;
  email: number;
  emailVerifiedCode: number;
}

const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const SignUp = () => {
  const [isEmailVerified] = useState(false);
  const [isShowEmailVerifiedCodeInput, setIsShowEmailVerifiedCodeInput] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (isEmailVerified) {
      console.log(data);
    } else {
      setError('email', {
        message: '이메일 인증을 해주세요',
      });
    }
  };

  const handleSendVerificationCode = () => {
    const { email } = getValues();

    if (emailRegEx.test(String(email))) {
      setError('email', {
        message: '',
      });
      fetch(`/api/auth/send-auth-mail?email=${email}`, {
        method: 'GET',
      })
        .then((res) => {
          setIsShowEmailVerifiedCodeInput(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError('email', {
        message: '이메일 형식이 아닙니다',
      });
    }
  };

  //인증번호 입력 후 확인되면 setIsEmailVerified(true)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          onButtonClick={handleSendVerificationCode}
          disabled={isEmailVerified}
          {...register('email', {
            required: {
              value: true,
              message: '이메일을 입력해주세요',
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '이메일 형식이 아닙니다',
            },
          })}
        />
        {isShowEmailVerifiedCodeInput && (
          <TextInput
            {...register('emailVerifiedCode', {
              required: {
                value: true,
                message: '인증번호를 입력해주세요',
              },
            })}
          />
        )}

        {errors.email && <ErrorMsg role='alert'>{errors.email.message}</ErrorMsg>}

        <TextInput
          {...register('nickname', {
            required: {
              value: true,
              message: '닉네임을 입력해주세요',
            },
          })}
        />
        {errors.nickname && <ErrorMsg role='alert'>{errors.nickname.message}</ErrorMsg>}

        <PasswordInput
          {...register('password', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
            minLength: {
              value: 8,
              message: '비밀번호는 8글자 이상이여야 합니다',
            },
          })}
        />
        {errors.password && <ErrorMsg role='alert'>{errors.password.message}</ErrorMsg>}

        <PasswordInput
          {...register('passwordConfirm', {
            required: {
              value: true,
              message: '비밀번호를 확인해주세요',
            },
            validate: (value) => {
              const { password } = getValues();
              return password === value || '비밀번호가 일치하지 않습니다';
            },
          })}
        />
        {errors.passwordConfirm && (
          <ErrorMsg role='alert'>{errors.passwordConfirm.message}</ErrorMsg>
        )}

        <Button type='submit'>가입</Button>
      </form>
    </>
  );
};

export default SignUp;
