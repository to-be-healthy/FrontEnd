import { Pageable } from '@/shared/api';

type MealType = 'breakfast' | 'lunch' | 'dinner';
interface DietImageData {
  fast: boolean;
  fileOrder: number;
  fileUrl: string | null;
  type: MealType;
}

interface DietImageType {
  fileUrl: string | null;
  fileOrder: number;
  type: MealType;
  fast: boolean;
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

interface ContentType {
  id: number;
  member: {
    memberId: number;
    name: string;
    fileUrl: string | null;
  };
  content: string;
  orderNum: number;
  replies: ContentType[] | null;
  delYn: boolean;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
}

interface Comment extends Pageable {
  content: ContentType[];
  mainData: null;
}

export type {
  Comment,
  ContentType,
  DietImageData,
  DietImageType,
  DietWithFasting,
  MealType,
};
