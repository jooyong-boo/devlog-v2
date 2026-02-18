import { prisma } from '@/shared/lib/prisma';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Series | Jooyong DevLog',
  description: '시리즈별로 정리된 글 모음',
};

async function getAllSeries() {
  return prisma.series.findMany({
    where: { deletedAt: null },
    include: {
      _count: {
        select: {
          posts: {
            where: { status: 'published', deletedAt: null },
          },
        },
      },
      posts: {
        where: { status: 'published', deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { createdAt: true },
      },
    },
    orderBy: { sort: 'asc' },
  });
}

export default async function SeriesPage() {
  const seriesList = await getAllSeries();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Series</h1>

      {seriesList.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          아직 등록된 시리즈가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seriesList.map((series) => (
            <Link key={series.id} href={`/series/${series.id}`}>
              <Card
                variant="bordered"
                padding="lg"
                hoverable
                className="h-full"
              >
                <h2 className="text-xl font-bold mb-2">{series.title}</h2>
                {series.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {series.description}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <Badge variant="primary" size="sm">
                    {series._count.posts}개의 글
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
