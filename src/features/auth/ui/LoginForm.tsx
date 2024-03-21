'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/shared/ui/button/Button';
import { PasswordInput, TextInput } from '@/shared/ui/input';

interface LoginForm {
  username: string;
  password: string;
  trainer: string;
}

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (credentials) => {
    const { username, password } = credentials;
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) {
      // 로그인 실패
      console.log('실패', res);
      return;
    }

    // 로그인 성공
    router.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder='아이디'
        {...register('username', {
          required: {
            value: true,
            message: '아이디를 입력해주세요.',
          },
        })}
      />
      {errors.username && <span style={{ color: 'red' }}>Id is required</span>}
      <PasswordInput
        placeholder='비밀번호'
        {...register('password', { required: true })}
      />
      {errors.password && <span style={{ color: 'red' }}>Password is required</span>}
      <Button type='submit' asChild>
        <button>로그인</button>
      </Button>
    </form>
  );
};
