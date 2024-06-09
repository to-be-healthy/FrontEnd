import { Gym } from '@/entity/gym';

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface HomeDietData {
  dietId: number;
  member: {
    id: number;
    userId: string;
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    delYn: boolean;
    profile: null | { id: number; fileUrl: string };
    memberType: 'STUDENT' | 'TRAINER';
    pushAlarmStatus: null | 'ENABLED' | 'DISABLE';
    feedbackAlarmStatus: null | 'ENABLED' | 'DISABLE';
    gym: null | Gym;
    socialType: ['NONE', 'KAKAO', 'NAVER', 'GOOGLE'];
  };
  eatDate: string;
  likeCnt: number;
  liked: boolean;
  commentCnt: number;
  feedbackChecked: boolean;
  createdAt: string;
  updatedAt: string;
  breakfast: DietWithFasting;
  lunch: DietWithFasting;
  dinner: DietWithFasting;
}

interface DietWithFasting {
  fast: boolean;
  type: MealType;
  dietFile: null | {
    id: number;
    dietId: number;
    fileUrl: string;
    type: string;
  };
}

interface DailyDiet {
  dietId: number | null;
  dietFiles: Diet[];
}

interface Diet {
  id: number;
  fileName: string;
  originalName: string;
  extension: '.jpg' | '.png';
  fileSize: number;
  fileUrl: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';
}

interface RegisterAndEditDiet {
  breakfastFile: string | null;
  lunchFile: string | null;
  dinnerFile: string | null;
  breakfastFast: boolean;
  lunchFast: boolean;
  dinnerFast: boolean;
  eatDate?: string;
}
export type {
  DailyDiet,
  Diet,
  DietWithFasting,
  HomeDietData,
  MealType,
  RegisterAndEditDiet,
};
