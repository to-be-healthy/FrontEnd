interface AllScheduleData {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: string;
  round: number;
  trainerName: string;
  applicantName: string | null;
  waitingByName: string | null;
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

type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

// 트레이너 스케줄 서버 데이터
interface TrainerSchedule {
  scheduleId: number;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: 'COMPLETED' | 'AVAILABLE' | 'NO_SHOW' | 'SOLD_OUT';
  applicantName: string | null;
  waitingStudentName: string | null;
}

interface ClassTimeSettingData {
  lessonStartTime: string;
  lessonEndTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  closedDays: DayOfWeek[];
  lessonTime: number;
}

type TrainerWeeklySchedule = Record<string, TrainerSchedule[]>;

interface ScheduleEvent extends TrainerSchedule {
  duration: number;
  color?: number;
}

interface HourlySchedule {
  hour: string;
  event?: ScheduleEvent;
  status: 'LESSON' | 'DISABLED';
}

interface DailySchedule {
  date: Date;
  schedules: HourlySchedule[];
}

export type {
  AllScheduleData,
  ClassTimeSettingData,
  CourseData,
  DailySchedule,
  DayOfWeek,
  HourlySchedule,
  MyReservationResponse,
  MyWaitingResponse,
  ScheduleData,
  ScheduleEvent,
  TrainerSchedule,
  TrainerWeeklySchedule,
};
