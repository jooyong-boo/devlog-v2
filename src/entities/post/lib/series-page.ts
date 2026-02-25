type SeriesQueryUser = {
  id: string;
  name: string | null;
  nickname: string | null;
  profile: string | null;
  image: string | null;
};

type SeriesQueryPost = {
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

type SeriesQueryResult = {
  id: number;
  title: string;
  description: string | null;
  posts: SeriesQueryPost[];
};

export function parseSeriesId(rawId: string): number | null {
  const seriesId = Number.parseInt(rawId, 10);
  if (Number.isNaN(seriesId)) return null;
  return seriesId;
}

export function normalizeSeriesWithPosts(series: SeriesQueryResult) {
  return {
    ...series,
    posts: series.posts.map((post) => ({
      ...post,
      user: {
        ...post.user,
        nickname: post.user.nickname || post.user.name || 'Anonymous',
        profile: post.user.profile || post.user.image || '',
      },
      tags: post.postTags.map((pt) => pt.tag),
    })),
  };
}

export function buildSeriesMetadata(
  series: Pick<SeriesQueryResult, 'title' | 'description'> | null
) {
  if (!series) return {};

  return {
    title: `${series.title} | Jooyong DevLog`,
    description: series.description || `${series.title} 시리즈`,
  };
}
