'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Github, Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { siteConfig } from '@/shared/config/site';
import { Button } from '@/shared/ui/button';
import { UserDropdown } from './UserDropdown';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/series', label: 'Series' },
  { href: '/resume', label: 'Resume' },
  { href: '/portfolio', label: 'Portfolio' },
];

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 animate-slide-in-down">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-blue-600 transition-colors"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hidden md:inline-block',
                pathname === link.href
                  ? 'text-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
              )}
            >
              {link.label}
            </Link>
          ))}

          <button
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            title="검색"
            aria-label="검색"
          >
            <Search className="w-5 h-5" />
          </button>

          <ThemeToggle />

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          {session ? (
            <UserDropdown user={session.user} />
          ) : (
            <Link href="/auth/signin">
              <Button variant="primary" size="sm">
                로그인
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
