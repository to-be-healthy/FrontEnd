interface Comment {
  id: number;
  content: string;
  member: {
    memberId: number;
    name: string;
    fileUrl: string | null;
  };
  orderNum: number;
  replies: Comment[] | null;
  files: ImageFile[];
  delYn: boolean;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
}

// For studentLogList
interface Log {
  id: number;
  title: string;
  content: string;
  commentTotalCount: number;
  createdAt: string;
  student: string;
  trainer: string;
  scheduleId: number;
  lessonDt: string;
  lessonTime: string;
  attendanceStatus: '출석' | '미출석';
  files: ImageFile[];
}

interface ImageFile {
  fileUrl: string;
  fileOrder: number;
}

interface Lesson {
  scheduleId: number;
  studentId: number;
  studentName: string;
  lessonDt: string;
  lessonTime: string;
  reservationStatus: '출석' | '미출석';
  reviewStatus: '작성' | '미작성';
}

export type { Comment, ImageFile, Lesson, Log };
