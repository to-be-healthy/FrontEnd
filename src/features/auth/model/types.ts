import type { Trainer } from '@/entities/auth';

interface InvitationResponse {
  name: string;
  lessonCnt: number;
  trainer: Partial<Pick<Trainer, 'name'>>;
}

interface LoginForm {
  userId: string;
  password: string;
  trainer: string;
}

export type { InvitationResponse, LoginForm };
