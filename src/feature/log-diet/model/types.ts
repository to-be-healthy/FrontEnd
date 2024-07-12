import { MealType } from '@/entity/diet';
import { Pageable } from '@/shared/api';

interface DietImageData {
  fast: boolean;
  fileOrder?: number;
  fileUrl: string | null;
  type: MealType;
}

interface DietImageType {
  fileUrl: string | null;
  fileOrder?: number;
  type: MealType;
  fast: boolean;
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

export type { Comment, ContentType, DietImageData, DietImageType };
