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

export type {
  AllScheduleData,
  CourseData,
  MyReservationResponse,
  MyWaitingResponse,
  ScheduleData,
};
