import { Skeleton } from '@/shared/ui/skeleton';

export function PostCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <Skeleton variant="rectangular" height={192} />
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={80} height={24} />
          <Skeleton variant="text" width={60} />
        </div>
        <Skeleton variant="text" height={28} />
        <Skeleton variant="text" width="60%" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={100} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rectangular" width={60} height={22} />
          <Skeleton variant="rectangular" width={80} height={22} />
        </div>
      </div>
    </div>
  );
}
