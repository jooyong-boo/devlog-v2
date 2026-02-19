import { notFound } from 'next/navigation';
import { prisma } from '@/shared/lib/prisma';
import { PostCreateForm } from '@/features/post/create/ui/PostCreateForm';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, projects, series] = await Promise.all([
    prisma.post.findUnique({
      where: { id, deletedAt: null },
      include: {
        postTags: {
          include: { tag: { select: { name: true } } },
        },
      },
    }),
    prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { sort: 'asc' },
    }),
    prisma.series.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  if (!post) {
    notFound();
  }

  const initialData = {
    title: post.title,
    content: post.content,
    thumbnail: post.thumbnail || '',
    projectId: post.projectId,
    seriesId: post.seriesId ?? undefined,
    tags: post.postTags.map((pt) => pt.tag.name).join(', '),
    status: post.status as 'draft' | 'published',
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">게시글 수정</h1>
      <PostCreateForm
        projects={projects}
        series={series}
        mode="edit"
        initialData={initialData}
        postId={post.id}
      />
    </div>
  );
}
