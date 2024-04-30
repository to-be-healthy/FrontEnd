interface Comment {
  content: string;
  id: number;
  parentId: number | null;
  writerId: number;
  writerName: string;
  reply?: Omit<Comment, 'reply'>[];
}

export type { Comment };
