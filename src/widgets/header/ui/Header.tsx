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
    <header className="animate-slide-in-down sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-2xl font-bold transition-colors hover:text-blue-600"
        >
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hidden text-sm font-medium transition-colors md:inline-block',
                pathname === link.href
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600 dark:text-gray-300'
              )}
            >
              {link.label}
            </Link>
          ))}

          <button
            className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300"
            title="검색"
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </button>

          <ThemeToggle />

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
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
