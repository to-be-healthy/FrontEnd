'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { SignUpRequest, useSignUpMutation } from '@/entity/auth';
import { SignUpCancelDialog, SignUpFunnel, useSignUpFunnel } from '@/feature/auth';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, GenericForm } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const SignUpPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get('type');
  const uuid = params?.get('uuid');
  const { step, Step, Funnel, setStep } = useSignUpFunnel(1);
  const { showErrorToast } = useShowErrorToast();

  const [isIdVerified, setIsIdVerified] = useState(false); //아이디 중복 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 인증 완료 여부

  const { mutate: signUpMutation } = useSignUpMutation();

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

  const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
    if (!isEmailVerified) {
      return showErrorToast('이메일 인증을 해주세요');
    }
    if (!isIdVerified) {
      return showErrorToast('아이디 중복확인을 해주세요');
    }
    if (!type) return;

    signUpMutation(
      {
        ...data,
        memberType: type.toUpperCase(),
        uuid: uuid ? uuid : null,
      },
      {
        onSuccess: () => {
          router.push(`/sign-up/complete?type=${type}&name=${data.name}`);
        },
        onError: (error) => {
          showErrorToast(error.response?.data.message ?? '회원가입에 실패했습니다');
        },
      }
    );
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button className='bg-transparent p-0' onClick={clickBack}>
          <BackIcon />
        </Button>
        <h2 className={cn(Typography.HEADING_4, 'font-semibold')}>
          {type === 'trainer' && '트레이너'} 회원가입
        </h2>
        <SignUpCancelDialog type={type} />
      </Layout.Header>

      <Layout.Contents className='overflow-y-hidden'>
        <GenericForm
          id='submitSignUp'
          onSubmit={onSubmit}
          formOptions={{ mode: 'onChange' }}>
          <SignUpFunnel
            step={step}
            Step={Step}
            Funnel={Funnel}
            setStep={setStep}
            isIdVerified={isIdVerified}
            setIsIdVerified={setIsIdVerified}
            isEmailVerified={isEmailVerified}
            setIsEmailVerified={setIsEmailVerified}
          />
        </GenericForm>
      </Layout.Contents>
    </Layout>
  );
};

export { SignUpPage };
