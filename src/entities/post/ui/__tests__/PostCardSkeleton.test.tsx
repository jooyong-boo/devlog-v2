import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PostCardSkeleton } from '../PostCardSkeleton';

describe('<PostCardSkeleton />', () => {
  it('카드 스켈레톤 레이아웃을 렌더링해야 한다', () => {
    const { container } = render(<PostCardSkeleton />);

    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('rounded-lg');
    expect(root.className).toContain('border');
  });

  it('필요한 개수의 스켈레톤 블록을 렌더링해야 한다', () => {
    const { container } = render(<PostCardSkeleton />);

    const skeletonBlocks = container.querySelectorAll('.animate-pulse');
    expect(skeletonBlocks).toHaveLength(9);
  });

  it('대표 이미지 영역 스켈레톤 높이를 유지해야 한다', () => {
    const { container } = render(<PostCardSkeleton />);

    const skeletonBlocks = container.querySelectorAll('.animate-pulse');
    expect((skeletonBlocks[0] as HTMLElement).style.height).toBe('192px');
  });
});
