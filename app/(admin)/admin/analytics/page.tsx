import { Suspense } from 'react';
import { connection } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { Card } from '@/shared/ui/card';

async function ViewTrends() {
  await connection();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const trends = await prisma.viewTrend.groupBy({
    by: ['viewDate'],
    where: { viewDate: { gte: thirtyDaysAgo } },
    _sum: { viewCount: true },
    orderBy: { viewDate: 'asc' },
  });

  return (
    <Card variant="bordered" padding="lg">
      <h2 className="mb-4 text-lg font-semibold">최근 30일 조회수 추이</h2>
      {trends.length === 0 ? (
        <p className="text-gray-500">아직 조회수 데이터가 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {trends.map((trend) => (
            <div
              key={trend.viewDate.toISOString()}
              className="flex items-center gap-4"
            >
              <span className="w-24 text-sm text-gray-500">
                {trend.viewDate.toLocaleDateString()}
              </span>
              <div className="h-4 flex-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className="h-4 rounded-full bg-blue-600"
                  style={{
                    width: `${Math.min(
                      ((trend._sum.viewCount || 0) /
                        Math.max(...trends.map((t) => t._sum.viewCount || 1))) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <span className="w-12 text-right text-sm font-medium">
                {trend._sum.viewCount}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

async function TopPosts() {
  const topPosts = await prisma.post.findMany({
    where: { status: 'published', deletedAt: null },
    orderBy: { viewCount: 'desc' },
    take: 10,
    select: {
      id: true,
      title: true,
      viewCount: true,
      createdAt: true,
    },
  });

  return (
    <Card variant="bordered" padding="lg">
      <h2 className="mb-4 text-lg font-semibold">인기 게시글 Top 10</h2>
      {topPosts.length === 0 ? (
        <p className="text-gray-500">아직 게시글이 없습니다.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2 font-medium">#</th>
              <th className="pb-2 font-medium">제목</th>
              <th className="pb-2 text-right font-medium">조회수</th>
            </tr>
          </thead>
          <tbody>
            {topPosts.map((post, index) => (
              <tr
                key={post.id}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                <td className="py-2 text-gray-500">{index + 1}</td>
                <td className="max-w-md truncate py-2">{post.title}</td>
                <td className="py-2 text-right font-medium">
                  {post.viewCount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <Suspense
        fallback={
          <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
        }
      >
        <ViewTrends />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-48 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
        }
      >
        <TopPosts />
      </Suspense>
    </div>
  );
}
