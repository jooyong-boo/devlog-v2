import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostContent } from '../PostContent';

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
  title: 'Test Post',
  content: '<p>This is <strong>test</strong> content</p>',
  createdAt: new Date('2024-01-01'),
  readingTime: 3,
  viewCount: 50,
  user: {
    nickname: 'Author',
    profile: 'https://example.com/avatar.jpg',
  },
  project: {
    name: 'Project A',
  },
  tags: [{ name: 'Tag1' }],
};

describe('<PostContent />', () => {
  it('게시글 제목을 h1으로 렌더링해야 한다', () => {
    render(<PostContent post={mockPost} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Post');
  });

  it('HTML 콘텐츠를 렌더링해야 한다', () => {
    render(<PostContent post={mockPost} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('메타 정보를 표시해야 한다', () => {
    render(<PostContent post={mockPost} />);
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('3분 읽기')).toBeInTheDocument();
    expect(screen.getByText('조회 50')).toBeInTheDocument();
  });

  it('태그 목록을 footer에 표시해야 한다', () => {
    render(<PostContent post={mockPost} />);
    expect(screen.getByText('#Tag1')).toBeInTheDocument();
  });

  it('프로젝트 이름을 Badge로 표시해야 한다', () => {
    render(<PostContent post={mockPost} />);
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });
});
