import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';
import type { PostListParams } from '../model/types';

export const getPublishedPosts = unstable_cache(
  async (params: PostListParams) => {
    const {
      page = 1,
      limit = 10,
      sort = 'latest',
      projectId,
      seriesId,
      tag,
    } = params;

    const where = {
      status: 'published' as const,
      deletedAt: null,
      ...(projectId && { projectId }),
      ...(seriesId && { seriesId }),
      ...(tag && {
        postTags: {
          some: {
            tag: { name: tag },
          },
        },
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              nickname: true,
              profile: true,
              image: true,
            },
          },
          project: {
            select: { id: true, name: true },
          },
          series: {
            select: { id: true, title: true },
          },
          postTags: {
            include: {
              tag: true,
            },
          },
        },
        orderBy:
          sort === 'popular' ? { viewCount: 'desc' } : { createdAt: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      posts: posts.map((post) => ({
        ...post,
        user: {
          ...post.user,
          nickname: post.user.nickname || post.user.name || 'Anonymous',
          profile: post.user.profile || post.user.image || '',
        },
        tags: post.postTags.map((pt) => pt.tag),
      })),
      total,
      totalPages: Math.ceil(total / limit),
    };
  },
  ['published-posts'],
  { revalidate: 60, tags: ['posts'] }
);

export const getPostById = cache(async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id, status: 'published', deletedAt: null },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
          profile: true,
          image: true,
        },
      },
      project: true,
      series: true,
      postTags: {
        include: { tag: true },
      },
    },
  });

  if (!post) return null;

  return {
    ...post,
    user: {
      ...post.user,
      nickname: post.user.nickname || post.user.name || 'Anonymous',
      profile: post.user.profile || post.user.image || '',
    },
    tags: post.postTags.map((pt) => pt.tag),
  };
});

export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { sort: 'asc' },
      select: { id: true, name: true },
    });
  },
  ['projects'],
  { revalidate: 300, tags: ['projects'] }
);
