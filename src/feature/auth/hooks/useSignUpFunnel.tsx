import { ReactElement, ReactNode, useState } from 'react';

export interface StepProps {
  id: number;
  children: ReactNode;
}

export interface FunnelProps {
  children: ReactElement<StepProps>[];
}

export const useSignUpFunnel = (defaultStep: number) => {
  const [step, setStep] = useState<number>(defaultStep);

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const stepsToShow = children.filter((child) => child.props.id <= step);
    return <>{stepsToShow}</>;
  };

  return { step, setStep, Step, Funnel } as const;
};
