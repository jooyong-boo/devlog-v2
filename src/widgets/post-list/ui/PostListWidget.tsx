'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { FileText } from 'lucide-react';
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
        <FileText
          className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
          strokeWidth={1.5}
        />
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
