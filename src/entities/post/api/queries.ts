'use server';

import { prisma } from '@/shared/lib/prisma';
import type { PostListParams } from '../model/types';

export async function getPublishedPosts(params: PostListParams) {
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
}

export async function getPostById(id: string) {
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
}

export async function getProjects() {
  return prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { sort: 'asc' },
    select: { id: true, name: true },
  });
}
