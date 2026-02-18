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
    <article className="max-w-4xl mx-auto animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="primary">{post.project.name}</Badge>
        </div>

        <h1 className="text-4xl font-bold mb-4 animate-slide-in-up">
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
        className="prose prose-lg dark:prose-invert max-w-none mb-8"
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
