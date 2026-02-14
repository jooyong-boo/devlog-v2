import { prisma } from '@/shared/lib/prisma';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { formatDate } from '@/shared/lib/date';
import Link from 'next/link';

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    where: { deletedAt: null },
    include: {
      project: { select: { name: true } },
      user: { select: { nickname: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">게시글 관리</h1>
        <Link href="/admin/posts/new">
          <Button>새 게시글 작성</Button>
        </Link>
      </div>

      <Card variant="bordered" padding="none">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">프로젝트</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">조회수</th>
              <th className="px-4 py-3 font-medium">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/posts/${post.id}`}
                    className="font-medium hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="default" size="sm">
                    {post.project.name}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      post.status === 'published' ? 'success' : 'warning'
                    }
                    size="sm"
                  >
                    {post.status === 'published' ? '발행됨' : '초안'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {post.viewCount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  아직 게시글이 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
