import { Suspense } from 'react';
import { prisma } from '@/shared/lib/prisma';
import { PostCreateForm } from '@/features/post/create/ui/PostCreateForm';

async function NewPostContent() {
  const [projects, series] = await Promise.all([
    prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { sort: 'asc' },
    }),
    prisma.series.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return <PostCreateForm projects={projects} series={series} />;
}

export default function NewPostPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">새 게시글 작성</h1>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />
        }
      >
        <NewPostContent />
      </Suspense>
    </div>
  );
}
