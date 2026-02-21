import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '../PostCard';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockPost = {
  id: '1',
  title: 'Test Post Title',
  content: '<p>This is the post content with some text to display.</p>',
  thumbnail: 'https://example.com/image.jpg',
  readingTime: 5,
  viewCount: 100,
  createdAt: new Date('2024-01-01'),
  user: {
    nickname: 'Test User',
    profile: 'https://example.com/avatar.jpg',
  },
  project: {
    name: 'Test Project',
  },
  tags: [{ name: 'React' }, { name: 'TypeScript' }],
};

describe('<PostCard />', () => {
  describe('렌더링', () => {
    it('게시글 제목을 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    });

    it('프로젝트 이름을 Badge로 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('작성자 닉네임을 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('읽기 시간을 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('5분 읽기')).toBeInTheDocument();
    });

    it('조회수를 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('조회 100')).toBeInTheDocument();
    });

    it('태그를 표시해야 한다', () => {
      render(<PostCard post={mockPost} />);
      expect(screen.getByText('#React')).toBeInTheDocument();
      expect(screen.getByText('#TypeScript')).toBeInTheDocument();
    });
  });

  describe('레이아웃', () => {
    it('grid 레이아웃을 적용해야 한다', () => {
      const { container } = render(<PostCard post={mockPost} layout="grid" />);
      const article = container.querySelector('article');
      expect(article?.className).toContain('flex-col');
    });

    it('list 레이아웃을 적용해야 한다', () => {
      const { container } = render(<PostCard post={mockPost} layout="list" />);
      const article = container.querySelector('article');
      expect(article?.className).toContain('flex-row');
    });
  });

  describe('링크', () => {
    it('게시글 상세 페이지로 연결되는 링크를 포함해야 한다', () => {
      render(<PostCard post={mockPost} />);
      const links = screen.getAllByRole('link');
      expect(
        links.some((link) => link.getAttribute('href') === '/posts/1')
      ).toBe(true);
    });

    it('태그 링크가 올바른 경로를 가져야 한다', () => {
      render(<PostCard post={mockPost} />);
      const tagLinks = screen.getAllByRole('link');
      expect(
        tagLinks.some((link) => link.getAttribute('href') === '/tags/React')
      ).toBe(true);
    });
  });

  describe('excerpt', () => {
    it('grid 레이아웃에서 content HTML 태그를 제거한 본문 발췌를 표시해야 한다', () => {
      render(<PostCard post={mockPost} layout="grid" />);
      expect(
        screen.getByText('This is the post content with some text to display.')
      ).toBeInTheDocument();
    });

    it('grid 레이아웃에서 150자 초과 content는 말줄임(...) 처리해야 한다', () => {
      const longContent = `<p>${'가'.repeat(200)}</p>`;
      render(
        <PostCard post={{ ...mockPost, content: longContent }} layout="grid" />
      );
      const excerpt = screen.getByText(/\.\.\.$/);
      expect(excerpt.textContent?.length).toBeLessThanOrEqual(153); // 150자 + '...'
    });

    it('list 레이아웃에서는 excerpt를 표시하지 않아야 한다', () => {
      render(<PostCard post={mockPost} layout="list" />);
      expect(
        screen.queryByText(
          'This is the post content with some text to display.'
        )
      ).not.toBeInTheDocument();
    });

    it('grid 레이아웃에서 "Read more" 링크를 표시해야 한다', () => {
      render(<PostCard post={mockPost} layout="grid" />);
      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink.getAttribute('href')).toBe('/posts/1');
    });

    it('list 레이아웃에서는 "Read more" 링크를 표시하지 않아야 한다', () => {
      render(<PostCard post={mockPost} layout="list" />);
      expect(
        screen.queryByRole('link', { name: /read more/i })
      ).not.toBeInTheDocument();
    });
  });
});
