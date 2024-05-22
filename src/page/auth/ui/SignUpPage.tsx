'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { SignUpRequest, useSignUpMutation } from '@/entity/auth';
import { SignUpCancelDialog, SignUpFunnel, useSignUpFunnel } from '@/feature/auth';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import { Button, GenericForm, useToast } from '@/shared/ui';
import { Layout } from '@/widget';

const SignUpPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params?.get('type');
  const { toast } = useToast();
  const { step, Step, Funnel, setStep } = useSignUpFunnel(1);
  const { mutate: signUpMutation } = useSignUpMutation();

  const [isIdVerified, setIsIdVerified] = useState(false); //아이디 중복 확인 완료 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); //이메일 인증 완료 여부

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
      return toast({
        className: 'h-12',
        description: (
          <div className='flex items-center justify-center'>
            <ErrorIcon />
            <p className='typography-heading-5 ml-6 text-[#fff]'>
              이메일 인증을 해주세요
            </p>
          </div>
        ),
        duration: 2000,
      });
    }
    if (!isIdVerified) {
      return toast({
        className: 'h-12',
        description: (
          <div className='flex items-center justify-center'>
            <ErrorIcon />
            <p className='typography-heading-5 ml-6 text-[#fff]'>
              아이디 중복확인을 해주세요
            </p>
          </div>
        ),
        duration: 2000,
      });
    }
    if (!type) return;

    signUpMutation(
      {
        ...data,
        memberType: type.toUpperCase(),
        uuid: '', //초대가입
      },
      {
        onSuccess: () => {
          router.push(`/sign-up/complete?type=${type}&name=${data.name}`);
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

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button className='bg-transparent p-0' onClick={clickBack}>
          <BackIcon />
        </Button>
        <h2 className='typography-heading-4 font-semibold'>
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
