/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';

//추후 삭제예정
import { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { authMutation } from '@/entities/auth';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import SendEmailIcon from '@/shared/assets/images/icon_send_email.svg';
import { Button, EmailInput, PasswordInput, TextInput, useToast } from '@/shared/ui';

import { SignUpFormType } from '../model/type';

const EXCLUDE_SPACE_REGEXP = /^\S*$/;
const NAME_REGEXP = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const ID_REGEXP = /^[0-9a-zA-Z]{4,}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const trainerId = ''; //초대가입

interface Props {
  step: number;
  type: string | null | undefined;
  NextStep: any;
  isIdVerified: boolean;
  setIsIdVerified: any;
  isEmailVerified: boolean;
  setIsEmailVerified: any;
}
export const SignUpForm = ({
  step,
  type,
  NextStep,
  isIdVerified,
  setIsIdVerified,
  isEmailVerified,
  setIsEmailVerified,
}: Props) => {
  const validType = type ?? '';

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

  const { toast } = useToast();

  const nameValue = watch('name');
  const emailValue = watch('email');
  const verificationCodeValue = watch('emailVerifiedCode');
  const userIdValue = watch('userId');
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  const { mutate: checkAvailableIdMutate, isPending } = authMutation.useCheckVailableId();
  const { mutate: sendVerificationCodeMutate } = authMutation.useSendVerificationCode();
  const { mutate: checkVerificationCodeMutate } = authMutation.useCheckVerificationCode();
  const { mutate: signUpMutation } = authMutation.useSignUp();

  //이메일 인증코드 발송
  const handleSendVerificationCode = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('emailVerifiedCode', '');

    sendVerificationCodeMutate(emailValue, {
      onSuccess: ({ message }) => {
        toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <SendEmailIcon />
              <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
            </div>
          ),
          duration: 2000,
        });
        if (step < 3) {
          NextStep();
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
          NextStep();
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
    if (!validType) return;

    signUpMutation(
      {
        ...data,
        memberType: validType.toUpperCase(),
        trainerId: trainerId ? trainerId : '', //초대가입
      },
      {
        onSuccess: () => {
          NextStep();
        },
        onError: (error) => {
          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <ErrorIcon />
                <p className='typography-heading-5 ml-6 text-[#fff]'>
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

  //다음 클릭시
  const clickNext = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    NextStep();
  };

  //input x버튼 클릭시 value값 clear
  const clearFieldValue = (
    fieldName: keyof SignUpFormType,
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
    <div className='flex h-full flex-col justify-between pt-[38px]'>
      <div className='w-full overflow-auto'>
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

        <form
          id='submitSignUp'
          onSubmit={handleSubmit(onSubmit)}
          className='p-[20px] pt-0'>
          {step >= 5 && (
            <div>
              <div className='mb-[16px] flex flex-col'>
                <label
                  htmlFor='password'
                  className='typography-title-3 mb-3 text-gray-800'>
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
                  className='typography-title-3 mb-3 text-gray-800'>
                  비밀번호 확인
                </label>
                <PasswordInput
                  id='passwordConfirm'
                  className={errors.passwordConfirm && 'border-point focus:border-point'}
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
              <label htmlFor='id' className='typography-title-3 mb-3 text-gray-800'>
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
                className='typography-title-3 mb-3 text-gray-800'>
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
              <label htmlFor='email' className='typography-title-3 mb-3 text-gray-800'>
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
              <label htmlFor='name' className='typography-title-3 mb-3 text-gray-800'>
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
              className='typography-title-1 h-[57px] w-full rounded-lg'
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
  );
};
