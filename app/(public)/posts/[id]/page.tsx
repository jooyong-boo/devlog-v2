import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPostById } from '@/entities/post/api/queries';
import { PostContent } from '@/entities/post/ui/PostContent';
import { ViewCounter } from '@/features/view-tracking/ui/ViewCounter';
import { CommentSection } from '@/features/comment/ui/CommentSection';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

async function PostDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ViewCounter postId={post.id} />
      <PostContent post={post} />

      <div className="max-w-4xl mx-auto mt-12">
        <Suspense
          fallback={
            <div className="py-8 text-center text-gray-400">
              댓글 로딩 중...
            </div>
          }
        >
          <CommentSection postId={post.id} />
        </Suspense>
      </div>
    </div>
  );
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />
        </div>
      }
    >
      <PostDetailContent params={params} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) return {};

  return {
    title: `${post.title} | Jooyong DevLog`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}
