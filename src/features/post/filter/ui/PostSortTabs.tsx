'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/shared/lib/utils';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신' },
  { value: 'popular', label: '인기' },
] as const;

export function PostSortTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'latest';

  const handleSortChange = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', sort);
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex gap-2">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSortChange(option.value)}
          aria-pressed={currentSort === option.value}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            currentSort === option.value
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
