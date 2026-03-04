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

    const mediaSkeleton = container.querySelector(
      '.rounded[style*="height: 192px"]'
    );
    const titleSkeleton = container.querySelector(
      '.h-4.rounded[style*="height: 28px"]'
    );
    const subtitleSkeleton = container.querySelector(
      '.h-4.rounded[style*="width: 60%"]'
    );
    const authorAvatarSkeleton = container.querySelector(
      '.rounded-full[style*="width: 32px"][style*="height: 32px"]'
    );
    const authorNameSkeleton = container.querySelector(
      '.h-4.rounded[style*="width: 100px"]'
    );

    expect(mediaSkeleton).toBeInTheDocument();
    expect(titleSkeleton).toBeInTheDocument();
    expect(subtitleSkeleton).toBeInTheDocument();
    expect(authorAvatarSkeleton).toBeInTheDocument();
    expect(authorNameSkeleton).toBeInTheDocument();
  });

  it('대표 이미지 영역 스켈레톤 높이를 유지해야 한다', () => {
    const { container } = render(<PostCardSkeleton />);

    const mediaSkeleton = container.querySelector(
      '.rounded[style*="height: 192px"]'
    ) as HTMLElement | null;

    expect(mediaSkeleton).toBeInTheDocument();
    expect(mediaSkeleton?.style.height).toBe('192px');
  });
});
