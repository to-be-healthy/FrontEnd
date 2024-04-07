import {
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import {
  authMutation,
  regexp,
  SetupEmail,
  SetupEmailVerificationCode,
  SetupId,
  SetupName,
  SetupPassword,
  SignUpFormType,
} from '@/entities/auth';
import SendEmailIcon from '@/shared/assets/images/icon_send_email.svg';
import { Button, useToast } from '@/shared/ui';

import { FunnelProps, StepProps } from '../hooks/useSignUpFunnel';

interface Props {
  step: number;
  Step: FunctionComponent<StepProps>;
  Funnel: FunctionComponent<FunnelProps>;
  setStep: Dispatch<SetStateAction<number>>;
  isIdVerified: boolean;
  setIsIdVerified: Dispatch<SetStateAction<boolean>>;
  isEmailVerified: boolean;
  setIsEmailVerified: Dispatch<SetStateAction<boolean>>;
}
export const SignUpFunnel = ({
  step,
  Step,
  Funnel,
  setStep,
  isIdVerified,
  setIsIdVerified,
  isEmailVerified,
  setIsEmailVerified,
}: Props) => {
  const { watch, setError, setValue, clearErrors } = useFormContext<SignUpFormType>();
  const { toast } = useToast();

  const { mutate: sendVerificationCodeMutate, isPending: sendVerificationCodePending } =
    authMutation.useSendVerificationCode();
  const { mutate: checkVerificationCodeMutate } = authMutation.useCheckVerificationCode();
  const { mutate: checkAvailableIdMutate, isPending: checkVailableIdPending } =
    authMutation.useCheckVailableId();

  const [idSuccessMsg, setIdSuccessMsg] = useState('');

  const clickNextStep = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdSuccessMsg('');
    setStep((prev) => prev + 1);
  };

  const nameValue = watch('name');
  const emailValue = watch('email');
  const verificationCodeValue = watch('emailVerifiedCode');
  const userIdValue = watch('userId');
  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  useEffect(() => {
    clearErrors('userId');

    if (isIdVerified) {
      setIsIdVerified(false); //중복확인 후 글자 입력시 focus아웃됨
      setIdSuccessMsg('');
    }
  }, [userIdValue]);

  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !nameValue || nameValue?.length < 2 || !regexp.NAME_REGEXP.test(nameValue);
      case 2:
        return (!emailValue && !isEmailVerified) || !regexp.EMAIL_REGEXP.test(emailValue);
      case 3:
        return (
          verificationCodeValue?.length < 6 ||
          !regexp.EXCLUDE_SPACE_REGEXP.test(verificationCodeValue)
        );
      case 4:
        return !isIdVerified;
      case 5:
        return passwordValue?.length < 8 || passwordConfirmValue?.length < 8;
      default:
        return false;
    }
  };

  //이메일 인증코드 발송
  const handleSendVerificationCode = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('emailVerifiedCode', '');

    if (!regexp.EMAIL_REGEXP.test(emailValue))
      return setError('email', { message: '이메일 형식이 아닙니다' });

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
          setStep((prev) => prev + 1);
        }
      },
      onError: (error) => {
        setError('email', { message: `${error?.response?.data.message}` });
      },
    });
  };

  //인증번호 입력
  const handleCheckVerificationCode = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    checkVerificationCodeMutate(
      {
        email: emailValue,
        emailKey: verificationCodeValue,
      },
      {
        onSuccess: () => {
          setIsEmailVerified(true);
          clearErrors('emailVerifiedCode');
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
    if (!(userIdValue && regexp.ID_REGEXP.test(userIdValue))) {
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

  return (
    <div className='flex h-full flex-col justify-between  pt-[38px]'>
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

        <div className='px-7'>
          <Funnel>
            <Step id={5}>
              <SetupPassword />
            </Step>

            <Step id={4}>
              <SetupId
                idSuccessMsg={idSuccessMsg}
                isPending={checkVailableIdPending}
                handleIsIdAvailable={handleIsIdAvailable}
              />
            </Step>

            <Step id={3}>
              <SetupEmailVerificationCode
                step={step}
                isEmailVerified={isEmailVerified}
                isPending={sendVerificationCodePending}
                handleSendVerificationCode={handleSendVerificationCode}
              />
            </Step>

            <Step id={2}>
              <SetupEmail step={step} isEmailVerified={isEmailVerified} />
            </Step>

            <Step id={1}>
              <SetupName />
            </Step>
          </Funnel>
        </div>
      </div>

      <div className='w-full p-[20px]'>
        {step < 5 ? (
          step === 2 ? (
            <Button
              className='typography-title-1 h-[57px] w-full rounded-lg'
              type='button'
              onClick={handleSendVerificationCode}
              disabled={isNextButtonDisabled() || sendVerificationCodePending}>
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
              onClick={clickNextStep}
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
