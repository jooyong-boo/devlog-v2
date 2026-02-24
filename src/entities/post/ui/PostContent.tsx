'use client';

import { formatDate } from '@/shared/lib/date';
import { Avatar } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';

interface PostContentProps {
  post: {
    title: string;
    content: string;
    createdAt: Date;
    readingTime: number;
    viewCount: number;
    user: {
      nickname: string;
      profile: string;
    };
    project: {
      name: string;
    };
    tags: Array<{ name: string }>;
  };
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="animate-fade-in mx-auto max-w-4xl">
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="primary">{post.project.name}</Badge>
        </div>

        <h1 className="animate-slide-in-up mb-4 text-4xl font-bold">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar
              src={post.user.profile}
              alt={post.user.nickname}
              size="sm"
            />
            <span>{post.user.nickname}</span>
          </div>
          <span>{formatDate(new Date(post.createdAt))}</span>
          <span>{post.readingTime}분 읽기</span>
          <span>조회 {post.viewCount.toLocaleString()}</span>
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert mb-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="border-t pt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name}`}>
              <Badge variant="default">#{tag.name}</Badge>
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}
