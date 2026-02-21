'use client';

import { Github, Mail, Rss } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  글
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  시리즈
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  포트폴리오
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  이력서
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  이메일
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Rss className="w-4 h-4" />
                  RSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
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
