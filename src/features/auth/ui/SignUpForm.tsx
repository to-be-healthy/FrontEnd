/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { authMutation } from '@/entities/auth';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import SendEmailIcon from '@/shared/assets/images/icon_send_email.svg';
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
  Button,
  EmailInput,
  PasswordInput,
  TextInput,
  useToast,
} from '@/shared/ui';

import { signUpForm } from '../model';

const EXCLUDE_SPACE_REGEXP = /^\S*$/;
const NAME_REGEXP = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const ID_REGEXP = /^[0-9a-zA-Z]{4,}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const trainerId = ''; //초대가입

export const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [isIdVerified, setIsIdVerified] = useState(false); //아이디 중복 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 인증 완료 여부
  const [idSuccessMsg, setIdSuccessMsg] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
  } = useForm<signUpForm>({
    mode: 'onChange',
  });

  const params = useSearchParams();
  const type = params?.get('type');
  const router = useRouter();
  const { toast } = useToast();

  const nameValue = watch('name');
  const emailValue = watch('email');
  const verificationCodeValue = watch('emailVerifiedCode');
  const userIdValue = watch('userId');
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  const { mutate: checkAvailableIdMutate, isPending } =
    authMutation.useCheckVailableIdMutation();
  const { mutate: sendVerificationCodeMutate } =
    authMutation.useSendVerificationCodeMutation();
  const { mutate: checkVerificationCodeMutate } =
    authMutation.useCheckVerificationCodeMutation();
  const { mutate: signUpMutation } = authMutation.useSignUpMutationMutation();

  //이메일 인증코드 발송
  const handleSendVerificationCode = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('emailVerifiedCode', '');

    sendVerificationCodeMutate(emailValue, {
      onSuccess: ({ message }) => {
        toast({
          description: (
            <div className='flex items-center justify-center'>
              <SendEmailIcon />
              <p className='typography-title-1 ml-[16px] text-[#fff]'>{message}</p>
            </div>
          ),
          duration: 2000,
        });
        if (step < 3) {
          setStep((prev) => prev + 1);
        }
      },
      onError: (error) => {
        setError('email', { message: `${error?.response?.data.message}` });
      },
    });
  };

  //인증번호 입력
  const handleCheckVerificationCode = () => {
    checkVerificationCodeMutate(
      {
        email: emailValue,
        emailKey: verificationCodeValue,
      },
      {
        onSuccess: () => {
          setIsEmailVerified(true);
          setStep((prev) => prev + 1);
        },
        onError: (error) => {
          setError('emailVerifiedCode', { message: `${error.response?.data.message}` });
        },
      }
    );
  };

  //아이디 중복확인
  const handleIsIdAvailable = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    if (!(userIdValue && ID_REGEXP.test(userIdValue))) {
      return setError('userId', {
        message: '아이디는 소문자,대문자,숫자만 입력할 수 있습니다',
      });
    }

    checkAvailableIdMutate(userIdValue, {
      onSuccess: ({ message }) => {
        setIsIdVerified(true);
        setIdSuccessMsg(message);
      },

      onError: (error) => {
        setError('userId', { message: `${error.response?.data.message}` });
      },
    });
  };

  //회원가입
  const onSubmit: SubmitHandler<signUpForm> = (data) => {
    if (!isEmailVerified) return setError('email', { message: '이메일 인증을 해주세요' });
    if (!isIdVerified)
      return setError('userId', { message: '아이디 중복확인을 해주세요' });
    if (!type) return;

    signUpMutation(
      {
        ...data,
        memberType: type.toUpperCase(),
        trainerId: trainerId ? trainerId : '', //초대가입
      },
      {
        onSuccess: () => {
          setStep((prev) => prev + 1);
        },
        onError: (error) => {
          toast({
            description: (
              <div className='flex items-center justify-center'>
                <ErrorIcon />
                <p className='typography-title-1 ml-[16px] text-[#fff]'>
                  {`${error.response?.data.message}`}
                </p>
              </div>
            ),
            duration: 2000,
          });
        },
      }
    );
  };

  //input disabled
  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !nameValue || nameValue?.length < 2;
      case 2:
        return (!emailValue && !isEmailVerified) || !EMAIL_REGEXP.test(emailValue);
      case 3:
        return (
          verificationCodeValue?.length < 6 ||
          !EXCLUDE_SPACE_REGEXP.test(verificationCodeValue)
        );
      case 4:
        return !isIdVerified;
      case 5:
        return passwordValue?.length < 8 || passwordConfirmValue?.length < 8;
      default:
        return false;
    }
  };

  //뒤로가기 클릭시
  const clickBack = () => {
    if (step === 1) {
      router.push(`/sign-in?type=${type}`);
    } else if (step === 3) {
      setStep((prev) => prev - 1);
      setIsEmailVerified(false);
    } else if (step === 4) {
      setStep((prev) => prev - 2);
      setIsEmailVerified(false);
      setIsIdVerified(false);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  //다음 클릭시
  const clickNext = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    setStep((prev) => prev + 1);
  };

  //input x버튼 클릭시 value값 clear
  const clearFieldValue = (
    fieldName: keyof signUpForm,
    e: FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setValue(fieldName, '');

    if (fieldName === 'userId') {
      setIsIdVerified(false);
      setIdSuccessMsg('');
    }
  };

  //input입력시 에러메세지 초기화
  useEffect(() => {
    clearErrors();
  }, [
    nameValue,
    userIdValue,
    emailValue,
    verificationCodeValue,
    passwordValue,
    passwordConfirmValue,
  ]);

  useEffect(() => {
    if (isIdVerified) {
      setIsIdVerified(false);
      setIdSuccessMsg('');
    }
  }, [userIdValue]);

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
                href={`/sign-in?type=${type}`}
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
              <Button className='bg-transparent p-0' onClick={clickBack}>
                <BackIcon />
              </Button>
              <h2 className='typography-heading-4 font-semibold'>
                {type === 'trainer' && '트레이너'} 회원가입
              </h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-none bg-transparent p-0 hover:bg-transparent'>
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
                      <Link href={`/sign-in?type=${type}`}>확인</Link>
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
                        value={passwordValue}
                        clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                          clearFieldValue('password', e)
                        }
                        placeholder='영문+숫자 조합 8자리 이상'
                        {...register('password', {
                          minLength: {
                            value: 8,
                            message: '비밀번호는 8글자 이상이여야 합니다',
                          },
                          pattern: {
                            value: PASSWORD_REGEXP,
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
                        value={passwordConfirmValue}
                        clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                          clearFieldValue('passwordConfirm', e)
                        }
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
                        id='userId'
                        containerClassName='h-[44px] w-[calc(100%-76px-6px)]'
                        className={errors.userId && 'border-point focus:border-point'}
                        placeholder='아이디를 입력해주세요'
                        value={userIdValue}
                        clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                          clearFieldValue('userId', e)
                        }
                        {...register('userId', {
                          pattern: {
                            value: ID_REGEXP,
                            message: '영문, 숫자 4자리 이상 입력해주세요.',
                          },
                        })}
                      />
                      <Button
                        className='typography-heading-5 h-[44px] w-[76px] rounded-md'
                        onClick={handleIsIdAvailable}
                        disabled={isPending}>
                        중복확인
                      </Button>
                    </div>

                    {errors.userId && (
                      <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                        {errors.userId.message}
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
                        type='number'
                        id='emailVerifiedCode'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        containerClassName='h-[44px] w-[calc(100%-76px-6px)]'
                        className={
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
                            value: EXCLUDE_SPACE_REGEXP,
                            message: '공백 문자를 포함할 수 없습니다',
                          },
                        })}
                      />
                      <Button
                        className='typography-heading-5 h-[44px] w-[76px] rounded-md bg-gray-700'
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
                      inputMode='email'
                      className={errors.email && 'border-point focus:border-point'}
                      placeholder='사용 가능한 이메일을 입력해주세요'
                      isEmailVerified={isEmailVerified}
                      value={emailValue}
                      clearValueButton={(e: FormEvent<HTMLButtonElement>) =>
                        clearFieldValue('email', e)
                      }
                      {...register('email', {
                        pattern: {
                          value: EMAIL_REGEXP,
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
                      inputMode='text'
                      containerClassName='h-[44px] w-full'
                      className={errors.name && 'border-point focus:border-point'}
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
                          value: NAME_REGEXP,
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

                {errors.signUp && (
                  <p className='typography-body-4 mt-[8px] text-[#FF4668]'>
                    {errors.signUp.message}
                  </p>
                )}
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
