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
  originalFileName: string;
  fileUrl: string;
  fileOrder: number;
  createdAt: string;
}

export type { Comment, ImageFile, Log };
