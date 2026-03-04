import type { SeriesQueryResult } from '../model/types';

export function parseSeriesId(rawId: string): number | null {
  if (!/^\d+$/.test(rawId)) return null;

  const seriesId = Number(rawId);
  if (!Number.isSafeInteger(seriesId) || seriesId < 0) return null;

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
