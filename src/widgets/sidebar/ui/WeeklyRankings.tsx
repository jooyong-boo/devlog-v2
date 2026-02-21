import { getPopularPosts } from '@/entities/post/api/queries';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const RANK_LABELS = ['01', '02', '03'];

export async function WeeklyRankings() {
  const posts = await getPopularPosts(3);

  if (posts.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <h3 className="text-lg font-bold mb-4">이번 주 인기</h3>
      <ol className="space-y-4">
        {posts.map((post, index) => (
          <li key={post.id} className="flex items-start gap-3">
            <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 leading-none mt-0.5 shrink-0">
              {RANK_LABELS[index]}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={`/posts/${post.id}`}
                className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.viewCount.toLocaleString()} views
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
