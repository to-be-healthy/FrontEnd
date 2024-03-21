/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  checkVerificationCode,
  isIdAvailable,
  sendEmailVerificationCode,
  signUp,
} from '@/shared/axios/axiosPublic';
import Button from '@/shared/ui/button/Button';
import { EmailInput } from '@/shared/ui/input';
import { PasswordInput, TextInput } from '@/shared/ui/input';

interface IFormInput {
  id: string;
  name: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailVerifiedCode: string;
  signUp: string;
}

interface returnType {
  data: string;
  message: string;
  statusCode: string;
}

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const idRegExp = /[0-9a-zA-Z]/g;

export const SignUpForm = () => {
  const [isIdVerified, setIsIdVerified] = useState(false); //아이디 중복 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 인증 완료 여부
  const [isShowEmailVerifiedCodeInput, setIsShowEmailVerifiedCodeInput] = useState(false); //이메일 인증요청 클릭시 하단 input 표시여부
  const [isShowTimer, setIsShowTimer] = useState(false); //이메일 인증요청 클릭시 타이머 표시 여부
  const [successMsg, setSuccessMsg] = useState({
    id: '',
    email: '',
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
  } = useForm<IFormInput>();

  const router = useRouter();
  const verificationCode = watch('emailVerifiedCode');

  //회원가입
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (isIdVerified && isEmailVerified) {
      clearErrors('id');
      clearErrors('email');
      try {
        const res = await signUp(data, 'MEMBER');
        //res.status 200일때
        if (res) {
          router.push('/');
        }
      } catch (error) {
        setError('signUp', { message: '회원가입에 실패했습니다' });
      }
    } else {
      if (!isIdVerified) {
        setError('id', { message: '아이디 인증을 해주세요' });
      } else if (!isEmailVerified) {
        setError('email', { message: '이메일 인증을 해주세요' });
      }
    }
  };

  //아이디 중복확인
  const handleIsIdAvailable = async () => {
    const { id } = getValues();

    if (id.trim() !== '' && idRegExp.test(id)) {
      clearErrors('id');
      try {
        const res = await isIdAvailable(id);
        if (res) {
          setIsIdVerified(true);
          setSuccessMsg((prev) => ({ ...prev, id: '사용할 수 있는 아이디입니다.' }));
        }
      } catch (error: any) {
        setError('id', { message: `${error}` });
      }
    } else {
      setError('id', { message: '아이디는 소문자,대문자,숫자만 입력할 수 있습니다' });
    }
  };

  //이메일 인증코드 발송
  const handleSendVerificationCode = async () => {
    const { email } = getValues();
    if (emailRegExp.test(email)) {
      clearErrors('email');
      try {
        const res: returnType = await sendEmailVerificationCode(email);
        if (res) {
          alert(res.message);
          setIsShowEmailVerifiedCodeInput(true);
          setIsShowTimer(true);
        }
      } catch (error: any) {
        setError('email', { message: `${error}` });
      }
    } else {
      setError('email', { message: '이메일 형식이 아닙니다' });
    }
  };

  //인증번호 입력
  const handleCheckVerificationCode = async () => {
    const { email } = getValues();
    try {
      const res = await checkVerificationCode(email, verificationCode);
      if (res) {
        setIsEmailVerified(true);
        setIsShowEmailVerifiedCodeInput(false);
        setSuccessMsg((prev) => ({ ...prev, email: '이메일 인증에 성공했습니다' }));
      }
    } catch (error: any) {
      setError('email', { message: `${error}` });
    }
  };

  useEffect(() => {
    clearErrors('email');

    if (String(verificationCode).length === 6) {
      handleCheckVerificationCode();
    }
  }, [verificationCode]);

  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            disabled={isIdVerified}
            {...register('id', {
              required: {
                value: true,
                message: '아이디를 입력해주세요',
              },
            })}
          />
          {!isIdVerified && <Button onClick={handleIsIdAvailable}>중복확인</Button>}
        </div>
        {errors.id && <p role='alert'>{errors.id.message}</p>}
        {successMsg && <p>{successMsg.id}</p>}

        <EmailInput
          onButtonClick={handleSendVerificationCode}
          isShowTimer={isShowTimer}
          setIsShowTimer={setIsShowTimer}
          isShowEmailVerifiedCodeInput={isShowEmailVerifiedCodeInput}
          isEmailVerified={isEmailVerified}
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
        {errors.email && <p role='alert'>{errors.email.message}</p>}
        {successMsg && <p>{successMsg.email}</p>}

        <div>
          <TextInput
            {...register('name', {
              required: {
                value: true,
                message: '이름을 입력해주세요',
              },
            })}
          />
        </div>
        {errors.name && <p role='alert'>{errors.name.message}</p>}

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
        {errors.password && <p role='alert'>{errors.password.message}</p>}

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
        {errors.passwordConfirm && <p role='alert'>{errors.passwordConfirm.message}</p>}

        {errors.signUp && <p role='alert'>{errors.signUp.message}</p>}

        <Button type='submit'>가입</Button>
      </form>
    </>
  );
};
