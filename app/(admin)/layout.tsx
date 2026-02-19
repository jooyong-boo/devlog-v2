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
          <aside className="w-64 bg-gray-900 min-h-screen flex-shrink-0" />
        }
      >
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">{children}</main>
    </div>
  );
}
