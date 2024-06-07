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

export type { Exercise, Workout };
