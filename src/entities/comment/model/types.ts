export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
  user: {
    id: string;
    nickname: string;
    profile: string;
  };
  replies?: Comment[];
}
