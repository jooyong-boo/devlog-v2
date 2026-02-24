'use client';

import { Github, Mail, Rss } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Platform */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  글
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  시리즈
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  이력서
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  <Mail className="h-4 w-4" />
                  이메일
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400"
                >
                  <Rss className="h-4 w-4" />
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-gray-200 pt-6 md:flex-row dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with Next.js, React 19, and Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}
