interface AllScheduleData {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: string;
  round: number;
  trainerName: string;
  applicantName: string | null;
  standByName: string | null;
}

interface ScheduleData {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: string;
  trainerName: string;
}

interface CourseData {
  courseId: number;
  totalLessonCnt: number;
  remainLessonCnt: number;
  createdAt: string;
}

interface MyReservationResponse {
  course: CourseData;
  reservations: ScheduleData[] | null;
}

interface MyWaitingResponse {
  course: CourseData;
  myScheduleWaitings: ScheduleData[] | null;
}

type ClassTimeOptions = 'HALF_HOUR' | 'ONE_HOUR' | 'ONE_AND_HALF_HOUR' | 'TWO_HOUR';
type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type {
  AllScheduleData,
  ClassTimeOptions,
  CourseData,
  DayOfWeek,
  MyReservationResponse,
  MyWaitingResponse,
  ScheduleData,
};
