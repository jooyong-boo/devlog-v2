export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    nickname: string;
    profile: string;
  };
  replies?: Comment[];
}
