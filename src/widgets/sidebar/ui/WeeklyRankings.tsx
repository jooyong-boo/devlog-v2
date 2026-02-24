import { getPopularPosts } from '@/entities/post/api/queries';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const RANK_LABELS = ['01', '02', '03'];

export async function WeeklyRankings() {
  const posts = await getPopularPosts(3);

  if (posts.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-bold">이번 주 인기</h3>
      <ol className="space-y-4">
        {posts.map((post, index) => (
          <li key={post.id} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-2xl leading-none font-bold text-gray-200 dark:text-gray-700">
              {RANK_LABELS[index]}
            </span>
            <div className="min-w-0 flex-1">
              <Link
                href={`/posts/${post.id}`}
                className="line-clamp-2 text-sm font-medium text-gray-800 transition-colors hover:text-blue-600 dark:text-gray-200"
              >
                {post.title}
              </Link>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <Eye className="h-3 w-3" />
                {post.viewCount.toLocaleString()} views
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
