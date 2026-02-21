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
    <div className="rounded-xl overflow-hidden mb-8 bg-[#101622]">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white mb-4 w-fit">
            {post.project.name}
          </span>

          <Link href={`/posts/${post.id}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </Link>

          {excerpt && (
            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
              {excerpt}
              {fullText.length > 150 ? '...' : ''}
            </p>
          )}

          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors w-fit"
          >
            Read Full Guide
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-4 mt-6 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}분 읽기
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
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
