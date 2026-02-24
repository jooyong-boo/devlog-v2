import { Suspense } from 'react';
import { AdminSidebar } from '@/widgets/admin-sidebar/ui/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense
        fallback={
          <aside className="min-h-screen w-64 flex-shrink-0 bg-gray-900" />
        }
      >
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 bg-gray-50 p-8 dark:bg-gray-900">{children}</main>
    </div>
  );
}
