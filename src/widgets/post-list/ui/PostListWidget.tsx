'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { PostCard } from '@/entities/post/ui/PostCard';
import { PostCardSkeleton } from '@/entities/post/ui/PostCardSkeleton';
import { Pagination } from '@/shared/ui/pagination';

interface PostListWidgetProps {
  posts: Array<{
    id: string;
    title: string;
    thumbnail: string;
    readingTime: number;
    viewCount: number;
    createdAt: Date;
    user: { nickname: string; profile: string };
    project: { name: string };
    tags: Array<{ name: string }>;
  }>;
  currentPage: number;
  totalPages: number;
}

export function PostListWidget({
  posts,
  currentPage,
  totalPages,
}: PostListWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-lg font-medium">아직 게시글이 없습니다</p>
        <p className="text-sm mt-1">첫 번째 게시글을 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} layout="grid" />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
