'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { Select } from '@/shared/ui/select';

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

  return (
    <div className="flex gap-4 items-center justify-between flex-wrap">
      <div className="flex gap-4">
        <Select
          value={searchParams.get('project') || ''}
          onChange={(e) => handleFilterChange('project', e.target.value)}
        >
          <option value="">전체 프로젝트</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id.toString()}>
              {project.name}
            </option>
          ))}
        </Select>
      </div>

      <Select
        value={searchParams.get('sort') || 'latest'}
        onChange={(e) => handleFilterChange('sort', e.target.value)}
      >
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </Select>
    </div>
  );
}
