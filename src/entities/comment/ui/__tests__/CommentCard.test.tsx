import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentCard } from '../CommentCard';

const mockComment = {
  id: 1,
  content: 'This is a test comment',
  createdAt: new Date('2024-01-01'),
  user: {
    id: 'user-1',
    nickname: 'Commenter',
    profile: 'https://example.com/avatar.jpg',
  },
  replies: [],
};

describe('<CommentCard />', () => {
  describe('렌더링', () => {
    it('댓글 내용을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} />);
      expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    });

    it('작성자 닉네임을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} />);
      expect(screen.getByText('Commenter')).toBeInTheDocument();
    });

    it('작성일을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} />);
      expect(screen.getByText(/2024/)).toBeInTheDocument();
    });
  });

  describe('중첩 댓글', () => {
    it('대댓글을 렌더링해야 한다', () => {
      const commentWithReplies = {
        ...mockComment,
        replies: [
          {
            id: 2,
            content: 'Reply comment',
            createdAt: new Date('2024-01-02'),
            user: { id: 'user-2', nickname: 'Replier', profile: '' },
          },
        ],
      };

      render(<CommentCard comment={commentWithReplies} />);
      expect(screen.getByText('Reply comment')).toBeInTheDocument();
      expect(screen.getByText('Replier')).toBeInTheDocument();
    });

    it('depth 3 미만에서 답글 버튼을 표시해야 한다', () => {
      const onReply = vi.fn();
      render(<CommentCard comment={mockComment} onReply={onReply} depth={2} />);
      expect(screen.getByText('답글')).toBeInTheDocument();
    });

    it('depth 3 이상에서는 답글 버튼을 숨겨야 한다', () => {
      const onReply = vi.fn();
      render(<CommentCard comment={mockComment} onReply={onReply} depth={3} />);
      expect(screen.queryByText('답글')).not.toBeInTheDocument();
    });
  });

  describe('권한 관리', () => {
    it('본인 댓글일 때 삭제 버튼을 표시해야 한다', () => {
      const onDelete = vi.fn();
      render(
        <CommentCard
          comment={mockComment}
          currentUserId="user-1"
          onDelete={onDelete}
        />
      );
      expect(screen.getByText('삭제')).toBeInTheDocument();
    });

    it('타인 댓글일 때 삭제 버튼을 숨겨야 한다', () => {
      const onDelete = vi.fn();
      render(
        <CommentCard
          comment={mockComment}
          currentUserId="user-other"
          onDelete={onDelete}
        />
      );
      expect(screen.queryByText('삭제')).not.toBeInTheDocument();
    });

    it('답글 버튼 클릭 시 onReply가 호출되어야 한다', () => {
      const onReply = vi.fn();
      render(<CommentCard comment={mockComment} onReply={onReply} />);

      fireEvent.click(screen.getByText('답글'));
      expect(onReply).toHaveBeenCalledWith(mockComment.id);
    });
  });
});
