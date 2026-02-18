import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPostById } from '@/entities/post/api/queries';
import { PostContent } from '@/entities/post/ui/PostContent';
import { ViewCounter } from '@/features/view-tracking/ui/ViewCounter';
import { CommentSection } from '@/features/comment/ui/CommentSection';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
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
