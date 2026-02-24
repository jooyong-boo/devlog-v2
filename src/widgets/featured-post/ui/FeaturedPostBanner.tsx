import { getFeaturedPost } from '@/entities/post/api/queries';
import { formatDate } from '@/shared/lib/date';
import { Clock, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function FeaturedPostBanner() {
  const post = await getFeaturedPost();

  if (!post) return null;

  const fullText = extractTextFromHtml(post.content);
  const excerpt = fullText.slice(0, 150);

  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-[#101622]">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
          <span className="mb-4 inline-block w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            {post.project.name}
          </span>

          <Link href={`/posts/${post.id}`}>
            <h2 className="mb-3 line-clamp-2 text-2xl font-bold text-white transition-colors hover:text-blue-400 md:text-3xl">
              {post.title}
            </h2>
          </Link>

          {excerpt && (
            <p className="mb-6 line-clamp-2 text-sm text-gray-400">
              {excerpt}
              {fullText.length > 150 ? '...' : ''}
            </p>
          )}

          <Link
            href={`/posts/${post.id}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Read Full Guide
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}분 읽기
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.viewCount.toLocaleString()} views
            </span>
            <span>{post.user.nickname}</span>
            <span>{formatDate(new Date(post.createdAt))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
