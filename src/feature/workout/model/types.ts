import { ImageType } from '@/entity/image';

interface Exercise {
  exerciseId: number;
  name: string;
  setNum: number;
  weight: number;
  numberOfCycles: number;
  workoutHistoryId: number;
}

interface Workout {
  workoutHistoryId: number;
  content: string;
  liked: boolean;
  likeCnt: number;
  commentCnt: number;
  viewMySelf: boolean;
  createdAt: Date;
  files: ImageType[];
  completedExercises: Exercise[];
}

interface WorkoutComment {
  id: number;
  member: {
    memberId: number;
    name: string;
    fileUrl: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: number | null;
  orderNum: number;
  delYn: boolean;
  replies: WorkoutComment[] | null;
}

export type { Exercise, Workout, WorkoutComment };
