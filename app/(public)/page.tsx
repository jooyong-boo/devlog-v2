import { Suspense } from 'react';
import { getPublishedPosts, getProjects } from '@/entities/post/api/queries';
import {
  PostListWidget,
  PostListSkeleton,
} from '@/widgets/post-list/ui/PostListWidget';
import { PostFilter } from '@/features/post/filter/ui/PostFilter';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    project?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const sort = (params.sort as 'latest' | 'popular') || 'latest';
  const projectId = params.project ? parseInt(params.project) : undefined;

  const [{ posts, totalPages }, projects] = await Promise.all([
    getPublishedPosts({ page, sort, projectId }),
    getProjects(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={null}>
            <PostFilter projects={projects} />
          </Suspense>

          <Suspense fallback={<PostListSkeleton />}>
            <PostListWidget
              posts={posts}
              currentPage={page}
              totalPages={totalPages}
            />
          </Suspense>
        </div>

        <aside className="lg:col-span-1">
          <Suspense fallback={null}>
            <Sidebar />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
