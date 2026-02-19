import { Suspense } from 'react';
import { prisma } from '@/shared/lib/prisma';
import { Card } from '@/shared/ui/card';

async function DashboardStats() {
  const [totalPosts, totalViews, publishedPosts, totalComments] =
    await Promise.all([
      prisma.post.count({ where: { deletedAt: null } }),
      prisma.post.aggregate({
        where: { deletedAt: null },
        _sum: { viewCount: true },
      }),
      prisma.post.count({
        where: { status: 'published', deletedAt: null },
      }),
      prisma.comment.count({ where: { deletedAt: null } }),
    ]);

  const stats = {
    totalPosts,
    totalViews: totalViews._sum.viewCount || 0,
    publishedPosts,
    draftPosts: totalPosts - publishedPosts,
    totalComments,
  };

  const statCards = [
    { title: '전체 게시글', value: stats.totalPosts },
    { title: '발행됨', value: stats.publishedPosts },
    { title: '초안', value: stats.draftPosts },
    { title: '전체 조회수', value: stats.totalViews },
    { title: '댓글 수', value: stats.totalComments },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} variant="bordered" padding="lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.title}
          </p>
          <p className="text-3xl font-bold mt-2">
            {stat.value.toLocaleString()}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg"
              />
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>
    </div>
  );
}
