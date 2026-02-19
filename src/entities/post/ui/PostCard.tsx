import { cn } from '@/shared/lib/utils';
import { formatDate } from '@/shared/lib/date';
import { Badge } from '@/shared/ui/badge';
import { Avatar } from '@/shared/ui/avatar';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface PostCardProps {
  post: {
    id: string;
    title: string;
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

  return (
    <article
      className={cn(
        'flex overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1',
        isGrid ? 'flex-col' : 'flex-row items-center'
      )}
    >
      <Link href={`/posts/${post.id}`} className="block shrink-0">
        <div
          className={cn(
            'relative bg-gray-100 dark:bg-gray-700',
            isGrid ? 'h-48 w-full' : 'w-48 h-32'
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
            <div className="flex items-center justify-center h-full text-gray-400">
              <ImageIcon className="w-12 h-12" strokeWidth={1.5} />
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="primary">{post.project.name}</Badge>
          <span className="text-sm text-gray-500">
            {post.readingTime}분 읽기
          </span>
          <span className="text-sm text-gray-500">
            조회 {post.viewCount.toLocaleString()}
          </span>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <Avatar src={post.user.profile} alt={post.user.nickname} size="sm" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {post.user.nickname}
          </span>
          <span className="text-sm text-gray-400">
            {formatDate(new Date(post.createdAt))}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name}`}>
              <Badge variant="default" size="sm">
                #{tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
