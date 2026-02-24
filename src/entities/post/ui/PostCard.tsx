import { cn } from '@/shared/lib/utils';
import { formatDate } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/badge';
import { Avatar } from '@/shared/ui/avatar';
import { ImageIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function extractExcerpt(html: string, maxLength = 150): string {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    readingTime: number;
    viewCount: number;
    createdAt: Date;
    user: {
      nickname: string;
      profile: string;
    };
    project: {
      name: string;
    };
    tags: Array<{ name: string }>;
  };
  layout?: 'grid' | 'list';
}

export function PostCard({ post, layout = 'grid' }: PostCardProps) {
  const isGrid = layout === 'grid';
  const excerpt = extractExcerpt(post.content);

  return (
    <article
      className={cn(
        'flex overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800',
        isGrid ? 'flex-col' : 'flex-row items-center'
      )}
    >
      <Link href={`/posts/${post.id}`} className="block shrink-0">
        <div
          className={cn(
            'relative bg-gray-100 dark:bg-gray-700',
            isGrid ? 'h-48 w-full' : 'h-32 w-48'
          )}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes={isGrid ? '(max-width: 768px) 100vw, 50vw' : '192px'}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <ImageIcon className="h-12 w-12" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="primary">{post.project.name}</Badge>
          <span className="text-sm text-gray-500">
            {post.readingTime}분 읽기
          </span>
          <span className="text-sm text-gray-500">
            조회 {post.viewCount.toLocaleString()}
          </span>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h3 className="mb-2 line-clamp-2 text-xl font-bold transition-colors hover:text-blue-600">
            {post.title}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <Avatar src={post.user.profile} alt={post.user.nickname} size="sm" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {post.user.nickname}
          </span>
          <span className="text-sm text-gray-400">
            {formatDate(new Date(post.createdAt))}
          </span>
        </div>

        {isGrid && excerpt && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag.name} href={`/tags/${tag.name}`}>
                <Badge variant="default" size="sm">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>

          {isGrid && (
            <Link
              href={`/posts/${post.id}`}
              className="ml-2 flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Read more
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
