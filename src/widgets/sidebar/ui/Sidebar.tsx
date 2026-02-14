import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Avatar } from '@/shared/ui/avatar';
import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';
import { prisma } from '@/shared/lib/prisma';

async function getPopularTags() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { postTags: true },
      },
    },
    orderBy: {
      postTags: {
        _count: 'desc',
      },
    },
    take: 10,
  });

  return tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    count: tag._count.postTags,
  }));
}

async function getRecentSeries() {
  return prisma.series.findMany({
    where: { deletedAt: null },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
}

export async function Sidebar() {
  const [tags, seriesList] = await Promise.all([
    getPopularTags(),
    getRecentSeries(),
  ]);

  return (
    <div className="space-y-6">
      {/* 프로필 카드 */}
      <Card variant="bordered" padding="lg">
        <div className="flex flex-col items-center text-center">
          <Avatar alt={siteConfig.author.name} size="lg" />
          <h3 className="text-lg font-bold mt-3">{siteConfig.author.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{siteConfig.description}</p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            GitHub 방문하기
          </a>
        </div>
      </Card>

      {/* 인기 태그 */}
      {tags.length > 0 && (
        <Card variant="bordered" padding="lg">
          <h3 className="text-lg font-bold mb-4">인기 태그</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.name}`}>
                <Badge variant="default" size="sm">
                  #{tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* 시리즈 */}
      {seriesList.length > 0 && (
        <Card variant="bordered" padding="lg">
          <h3 className="text-lg font-bold mb-4">시리즈</h3>
          <ul className="space-y-3">
            {seriesList.map((series) => (
              <li key={series.id}>
                <Link
                  href={`/series/${series.id}`}
                  className="flex items-center justify-between hover:text-blue-600 transition-colors"
                >
                  <span className="text-sm font-medium truncate">
                    {series.title}
                  </span>
                  <Badge variant="default" size="sm">
                    {series._count.posts}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
