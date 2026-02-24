import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/shared/lib/prisma';
import { PostCard } from '@/entities/post/ui/PostCard';

interface SeriesDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getSeriesWithPosts(id: number) {
  const series = await prisma.series.findUnique({
    where: { id, deletedAt: null },
    include: {
      posts: {
        where: { status: 'published', deletedAt: null },
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
          project: { select: { id: true, name: true } },
          postTags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!series) return null;

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

async function SeriesDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const seriesId = parseInt(id);

  if (isNaN(seriesId)) notFound();

  const series = await getSeriesWithPosts(seriesId);

  if (!series) notFound();

  return (
    <div className="animate-fade-in container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{series.title}</h1>
        {series.description && (
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {series.description}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          {series.posts.length}개의 글
        </p>
      </header>

      <div className="space-y-4">
        {series.posts.map((post, index) => (
          <div key={post.id} className="flex items-start gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {index + 1}
            </span>
            <div className="flex-1">
              <PostCard post={post} layout="list" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
      }
    >
      <SeriesDetailContent params={params} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: SeriesDetailPageProps) {
  const { id } = await params;
  const seriesId = parseInt(id);

  if (isNaN(seriesId)) return {};

  const series = await prisma.series.findUnique({
    where: { id: seriesId },
  });

  if (!series) return {};

  return {
    title: `${series.title} | Jooyong DevLog`,
    description: series.description || `${series.title} 시리즈`,
  };
}
