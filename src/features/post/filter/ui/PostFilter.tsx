'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Select } from '@/shared/ui/select';
import { PostSortTabs } from './PostSortTabs';

interface PostFilterProps {
  projects?: Array<{ id: number; name: string }>;
}

export function PostFilter({ projects = [] }: PostFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // 필터 변경 시 페이지를 1로 리셋
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };

  const projectOptions = [
    { value: 'all', label: '전체 프로젝트' },
    ...projects.map((project) => ({
      value: project.id.toString(),
      label: project.name,
    })),
  ];

  return (
    <div className="flex gap-4 items-center justify-between flex-wrap">
      <PostSortTabs />

      <div className="flex gap-4">
        <Select
          options={projectOptions}
          value={searchParams.get('project') || 'all'}
          onValueChange={(value) =>
            handleFilterChange('project', value === 'all' ? '' : value)
          }
          placeholder="전체 프로젝트"
        />
      </div>
    </div>
  );
}
