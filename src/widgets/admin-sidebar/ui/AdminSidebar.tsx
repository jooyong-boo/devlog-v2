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
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen flex-shrink-0">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded transition-colors text-sm',
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          href="/"
          className="block px-4 py-2 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm"
        >
          &larr; 사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
