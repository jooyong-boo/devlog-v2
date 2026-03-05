export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  status: 'draft' | 'published';
  readingTime: number;
  viewCount: number;
  createdAt: Date;
  user: {
    id: string;
    nickname: string;
    profile: string;
  };
  project: {
    id: number;
    name: string;
  };
  series?: {
    id: number;
    title: string;
  } | null;
  tags: Array<{
    id: number;
    name: string;
  }>;
}

export interface PostListParams {
  page?: number;
  limit?: number;
  sort?: 'latest' | 'popular';
  projectId?: number;
  seriesId?: number;
  tag?: string;
}

export interface PostListResult {
  posts: Post[];
  total: number;
  totalPages: number;
}

export type SeriesQueryUser = {
  id: string;
  name: string | null;
  nickname: string | null;
  profile: string | null;
  image: string | null;
};

export type SeriesQueryPost = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  readingTime: number;
  viewCount: number;
  createdAt: Date;
  user: SeriesQueryUser;
  project: { id: number; name: string };
  postTags: Array<{ tag: { id: number; name: string } }>;
};

export type SeriesQueryResult = {
  id: number;
  title: string;
  description: string | null;
  posts: SeriesQueryPost[];
};
