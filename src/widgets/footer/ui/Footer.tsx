'use client';

import { Github } from 'lucide-react';
import { siteConfig } from '@/shared/config/site';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2"
            title="GitHub"
          >
            <Github className="w-6 h-6" />
            <span className="text-sm">GitHub</span>
          </a>

          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="text-xs mt-2">
              Built with Next.js, React 19, and Tailwind CSS v4
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
