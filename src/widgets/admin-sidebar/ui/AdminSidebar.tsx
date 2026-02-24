'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const menuItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/posts/new', label: 'New Post' },
  { href: '/admin/series', label: 'Series' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/resume', label: 'Resume' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/analytics', label: 'Analytics' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 shrink-0 bg-gray-900 p-6 text-white">
      <h2 className="mb-8 text-2xl font-bold">Admin</h2>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block rounded px-4 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-gray-700 pt-8">
        <Link
          href="/"
          className="block rounded px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
        >
          &larr; 사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
