/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BackIcon from '@/shared/assets/images/back.svg';
import CloseIcon from '@/shared/assets/images/close.svg';
import {
  checkVerificationCode,
  idVailable,
  sendEmailVerificationCode,
  signUp,
} from '@/shared/axios/axiosPublic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
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
  timestamp: string;
}

const excludeSpaceRegExp = /^\S*$/;
const nameRegExp = /^[가-힣a-zA-Z]+$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const idRegExp = /^[0-9a-zA-Z]{4,}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isIdVerified, setIsIdVerified] = useState(false); //아이디 중복 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 인증 완료 여부
  const [idSuccessMsg, setIdSuccessMsg] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    watch,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const router = useRouter();
  const nameValue = watch('name');
  const emailValue = watch('email');
  const verificationCodeValue = watch('emailVerifiedCode');
  const idValue = watch('id');
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  useEffect(() => {
    if (isIdVerified) {
      setIsIdVerified(false);
      setIdSuccessMsg('');
    }
  }, [idValue]);

  //회원가입
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('회원가입 api');
    if (!isEmailVerified) setError('email', { message: '이메일 인증을 해주세요' });
    if (!isIdVerified) setError('id', { message: '아이디 중복확인을 해주세요' });
    try {
      const res: returnType = await signUp(data, 'MEMBER');
      if (res) {
        setStep((prev) => prev + 1);
      }
    } catch (error: any) {
      setError('signUp', { message: `${error.response.data.message}` });
    }
  };

  //아이디 중복확인
  const handleIsIdAvailable = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    if (idValue && idRegExp.test(idValue)) {
      try {
        const res: returnType = await idVailable(idValue);

        if (res) {
          setIsIdVerified(true);
          setIdSuccessMsg(res.message);
        }
      } catch (error: any) {
        setError('id', { message: `${error.response.data.message}` });
      }
    } else {
      setError('id', { message: '아이디는 소문자,대문자,숫자만 입력할 수 있습니다' });
    }
  };

  //이메일 인증코드 발송
  const handleSendVerificationCode = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email } = getValues();
    setValue('emailVerifiedCode', '');

    try {
      const res: returnType = await sendEmailVerificationCode(email);
      if (res) {
        if (step < 3) {
          setStep((prev) => prev + 1);
        }
      }
    } catch (error: any) {
      setError('email', { message: `${error.response.data.message}` });
    }
  };

  //인증번호 입력
  const handleCheckVerificationCode = async () => {
    try {
      const res: returnType = await checkVerificationCode(
        emailValue,
        verificationCodeValue
      );
      if (res) {
        setIsEmailVerified(true);
        setStep((prev) => prev + 1);
      }
    } catch (error: any) {
      setError('emailVerifiedCode', { message: `${error.response.data.message}` });
    }
  };

  const clickNext = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    setStep((prev) => prev + 1);
  };

  //input disabled
  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !nameValue || nameValue?.length < 2;
      case 2:
        return (!emailValue && !isEmailVerified) || !emailRegExp.test(emailValue);
      case 3:
        return (
          verificationCodeValue?.length < 6 ||
          !excludeSpaceRegExp.test(verificationCodeValue)
        );
      case 4:
        return !isIdVerified;
      case 5:
        return passwordValue?.length < 8 || passwordConfirmValue?.length < 8;
      default:
        return false;
    }
  };

  //뒤로가기
  const clickBack = () => {
    if (step === 1) {
      router.push('/signin');
    } else if (step === 3) {
      setIsEmailVerified(false);
      setStep((prev) => prev - 1);
    } else if (step === 4) {
      setStep((prev) => prev - 2);
      setIsEmailVerified(false);
      setIsIdVerified(false);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  //input x버튼 클릭시 value값 clear
  const clearFieldValue = (
    fieldName: keyof IFormInput,
    e: FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setValue(fieldName, '');

    if (fieldName === 'id') {
      setIsIdVerified(false);
      setIdSuccessMsg('');
    }
  };

  //input입력시 에러메세지 초기화
  useEffect(() => {
    clearErrors();
  }, [
    nameValue,
    idValue,
    emailValue,
    verificationCodeValue,
    passwordValue,
    passwordConfirmValue,
  ]);

  return (
    <section className='h-[100vh]'>
      {step === 6 ? (
        <div className='flex h-full w-full flex-col items-center justify-between p-[20px]'>
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <Image
              className='mb-[20px]'
              src='/images/signUpComplete.png'
              width={100}
              height={100}
              alt='signUp complete'
            />
            <span className='typography-heading-4 mb-[4px] text-primary-500'>
              가입완료
            </span>
            <p className='typography-heading-1 text-gray-800'>{`${nameValue}님, 환영합니다!`}</p>
          </div>

          <div className='w-full'>
            <Button asChild>
              <Link
                href='/selectgym'
                className='h-[57px] w-full rounded-lg bg-primary-500 text-white'>
                확인
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex h-full w-full flex-col items-center justify-between'>
          <div className='flex w-full flex-col overflow-auto'>
            <header className='mb-[58px] flex items-center justify-between p-[20px] pb-0'>
              <Button className='bg-white p-0' onClick={clickBack}>
                <BackIcon />
              </Button>
              <h2 className='typography-heading-4 font-semibold'>회원가입</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-none p-0 hover:bg-transparent'>
                    <CloseIcon />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className='mb-[24px] text-left'>
                    <AlertDialogTitle className='typography-heading-4 mb-3'>
                      회원가입을 그만둘까요?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      지금까지 작성한 정보는 저장되지 않아요.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
                    <AlertDialogAction
                      asChild
                      className='mt-0 h-[48px] rounded-md bg-[#E2F1FF] text-primary-500'>
                      <Link href='/signin'>확인</Link>
                    </AlertDialogAction>
                    <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-primary-500 text-[#fff]'>
                      취소
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </header>

            <div className='overflow-y-auto p-[20px]'>
              <h3 className='typography-heading-1 mb-[63px] text-center'>
                {step === 1 && '이름을 입력해주세요.'}
                {step === 2 && '이메일을 입력해주세요.'}
                {step === 3 && (
                  <>
                    이메일로 발송된 <br />
                    인증번호를 입력해주세요.
                  </>
                )}
                {step === 4 && '아이디를 설정해주세요.'}
                {step === 5 && '비밀번호를 설정해주세요.'}
              </h3>

              <form id='submitSignUp' onSubmit={handleSubmit(onSubmit)}>
                {step >= 5 && (
                  <div>
                    <div className='mb-[16px] flex flex-col'>
                      <label htmlFor='password' className='typography-title-3 mb-[8px]'>
                        비밀번호
                      </label>
                      <PasswordInput
                        id='password'
                        className={errors.password && 'border-point focus:border-point'}
                        placeholder='영문+숫자 조합 8자리 이상'
                        {...register('password', {
                          minLength: {
                            value: 8,
                            message: '비밀번호는 8글자 이상이여야 합니다',
                          },
                          pattern: {
                            value: passwordRegExp,
                            message: '영문+숫자 조합 8자리 이상 입력해주세요.',
                          },
                        })}
                      />
                      {errors.password && (
                        <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className='mb-[16px] flex flex-col'>
                      <label
                        htmlFor='passwordConfirm'
                        className='typography-title-3 mb-[8px]'>
                        비밀번호 확인
                      </label>
                      <PasswordInput
                        id='passwordConfirm'
                        className={
                          errors.passwordConfirm && 'border-point focus:border-point'
                        }
                        placeholder='비밀번호를 한번 더 입력해주세요.'
                        {...register('passwordConfirm', {
                          validate: (value) =>
                            value === passwordValue ||
                            '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
                        })}
                      />
                      {errors.passwordConfirm && (
                        <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                          {errors.passwordConfirm.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step >= 4 && (
                  <div className='mb-[16px] flex flex-col'>
                    <label htmlFor='id' className='typography-title-3 mb-[8px]'>
                      아이디
                    </label>
                    <div className='flex items-center justify-between'>
                      <TextInput
                        id='id'
                        className='h-[44px] w-[calc(100%-76px-6px)]'
                        inputClassName={errors.id && 'border-point focus:border-point'}
                        placeholder='아이디를 입력해주세요'
                        value={idValue}
                        clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                          clearFieldValue('id', e)
                        }
                        {...register('id', {
                          pattern: {
                            value: idRegExp,
                            message: '영문, 숫자 4자리 이상 입력해주세요.',
                          },
                        })}
                      />
                      <Button
                        className='typography-heading-5 h-[44px] w-[76px] rounded-md'
                        onClick={handleIsIdAvailable}>
                        중복확인
                      </Button>
                    </div>

                    {errors.id && (
                      <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                        {errors.id.message}
                      </p>
                    )}
                    {idSuccessMsg && (
                      <p className='typography-body-4 mt-[8px] text-primary-500'>
                        {idSuccessMsg}
                      </p>
                    )}
                  </div>
                )}

                {step >= 3 && (
                  <div className='mb-[16px] flex flex-col'>
                    <label
                      htmlFor='emailVerifiedCode'
                      className='typography-title-3 mb-[8px]'>
                      인증번호 입력
                    </label>
                    <div className='flex items-center justify-between'>
                      <TextInput
                        id='emailVerifiedCode'
                        className='h-[44px] w-[calc(100%-76px-6px)]'
                        inputClassName={
                          errors.emailVerifiedCode && 'border-point focus:border-point'
                        }
                        placeholder='인증번호 6자리를 입력해주세요.'
                        isEmailVerified={isEmailVerified}
                        value={verificationCodeValue}
                        clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                          clearFieldValue('emailVerifiedCode', e)
                        }
                        {...register('emailVerifiedCode', {
                          pattern: {
                            value: excludeSpaceRegExp,
                            message: '공백 문자를 포함할 수 없습니다',
                          },
                        })}
                      />
                      <Button //버튼 글씨 크기
                        className='typography-heading-5 h-[44px] w-[76px] rounded-md'
                        onClick={handleSendVerificationCode}
                        disabled={step > 3 && isEmailVerified}>
                        재전송
                      </Button>
                    </div>

                    {errors.emailVerifiedCode && (
                      <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                        {errors.emailVerifiedCode.message}
                      </p>
                    )}
                  </div>
                )}

                {step >= 2 && (
                  <div className='mb-[16px] flex flex-col'>
                    <label htmlFor='email' className='typography-title-3 mb-[8px]'>
                      이메일
                    </label>
                    <EmailInput
                      id='email'
                      className={errors.email && 'border-point focus:border-point'}
                      placeholder='사용 가능한 이메일을 입력해주세요'
                      isEmailVerified={isEmailVerified}
                      {...register('email', {
                        pattern: {
                          value: emailRegExp,
                          message: '이메일 형식이 아닙니다',
                        },
                      })}
                    />

                    {errors.email && (
                      <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}

                {step >= 1 && (
                  <div className='flex flex-col'>
                    <label htmlFor='name' className='typography-title-3 mb-[8px]'>
                      이름
                    </label>
                    <TextInput
                      id='name'
                      className='h-[44px] w-full'
                      inputClassName={errors.name && 'border-point focus:border-point'}
                      placeholder='실명'
                      value={nameValue}
                      clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                        clearFieldValue('name', e)
                      }
                      {...register('name', {
                        minLength: {
                          value: 2,
                          message: '이름은 최소 2자 이상 입력해주세요.',
                        },
                        pattern: {
                          value: nameRegExp,
                          message: '한글 또는 영문만 입력해주세요',
                        },
                      })}
                    />
                    {errors.name && (
                      <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                {errors.signUp && <p>{errors.signUp.message}</p>}
              </form>
            </div>
          </div>

          <div className='w-full p-[20px]'>
            {step < 5 ? (
              step === 2 ? (
                <Button
                  className='typography-title-1 h-[57px] w-full rounded-lg'
                  type='button'
                  onClick={handleSendVerificationCode}
                  disabled={isNextButtonDisabled()}>
                  인증번호 발송
                </Button>
              ) : step === 3 ? (
                <Button
                  className='typography-title-1 h-[57px] w-full rounded-lg'
                  type='button'
                  onClick={handleCheckVerificationCode}
                  disabled={isNextButtonDisabled()}>
                  인증완료
                </Button>
              ) : (
                <Button
                  className='typography-body-1 h-[57px] w-full rounded-lg'
                  type='button'
                  onClick={clickNext}
                  disabled={isNextButtonDisabled()}>
                  다음
                </Button>
              )
            ) : (
              <Button
                className='typography-title-1 h-[57px] w-full rounded-lg'
                type='submit'
                form='submitSignUp'
                disabled={isNextButtonDisabled()}>
                완료
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
