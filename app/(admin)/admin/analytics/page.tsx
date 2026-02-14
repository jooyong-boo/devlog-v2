import { prisma } from '@/shared/lib/prisma';
import { Card } from '@/shared/ui/card';

async function getTopPosts() {
  return prisma.post.findMany({
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
}

async function getViewTrends() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return prisma.viewTrend.groupBy({
    by: ['viewDate'],
    where: { viewDate: { gte: thirtyDaysAgo } },
    _sum: { viewCount: true },
    orderBy: { viewDate: 'asc' },
  });
}

export default async function AdminAnalyticsPage() {
  const [topPosts, trends] = await Promise.all([
    getTopPosts(),
    getViewTrends(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Card variant="bordered" padding="lg">
        <h2 className="text-lg font-semibold mb-4">최근 30일 조회수 추이</h2>
        {trends.length === 0 ? (
          <p className="text-gray-500">아직 조회수 데이터가 없습니다.</p>
        ) : (
          <div className="space-y-2">
            {trends.map((trend) => (
              <div
                key={trend.viewDate.toISOString()}
                className="flex items-center gap-4"
              >
                <span className="text-sm text-gray-500 w-24">
                  {trend.viewDate.toLocaleDateString()}
                </span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{
                      width: `${Math.min(
                        ((trend._sum.viewCount || 0) /
                          Math.max(
                            ...trends.map((t) => t._sum.viewCount || 1)
                          )) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">
                  {trend._sum.viewCount}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card variant="bordered" padding="lg">
        <h2 className="text-lg font-semibold mb-4">인기 게시글 Top 10</h2>
        {topPosts.length === 0 ? (
          <p className="text-gray-500">아직 게시글이 없습니다.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 font-medium">#</th>
                <th className="pb-2 font-medium">제목</th>
                <th className="pb-2 font-medium text-right">조회수</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <td className="py-2 text-gray-500">{index + 1}</td>
                  <td className="py-2 truncate max-w-md">{post.title}</td>
                  <td className="py-2 text-right font-medium">
                    {post.viewCount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
