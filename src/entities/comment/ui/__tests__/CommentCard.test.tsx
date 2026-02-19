import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentCard } from '../CommentCard';

vi.mock('@/features/comment/delete/ui/DeleteCommentButton', () => ({
  DeleteCommentButton: ({ commentId }: { commentId: number }) => (
    <button data-testid={`delete-${commentId}`}>삭제</button>
  ),
}));

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

const POST_ID = 'post-abc';

describe('<CommentCard />', () => {
  describe('렌더링', () => {
    it('댓글 내용을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} postId={POST_ID} />);
      expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    });

    it('작성자 닉네임을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} postId={POST_ID} />);
      expect(screen.getByText('Commenter')).toBeInTheDocument();
    });

    it('작성일을 표시해야 한다', () => {
      render(<CommentCard comment={mockComment} postId={POST_ID} />);
      expect(screen.getByText(/2024/)).toBeInTheDocument();
    });
  });

  describe('삭제된 댓글', () => {
    it('대댓글 없는 삭제 댓글은 렌더링하지 않아야 한다', () => {
      const deletedComment = {
        ...mockComment,
        deletedAt: new Date(),
        replies: [],
      };
      const { container } = render(
        <CommentCard comment={deletedComment} postId={POST_ID} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('대댓글 있는 삭제 댓글은 "삭제된 댓글입니다."를 표시해야 한다', () => {
      const deletedCommentWithReplies = {
        ...mockComment,
        deletedAt: new Date(),
        replies: [
          {
            id: 2,
            content: 'Reply comment',
            createdAt: new Date('2024-01-02'),
            user: { id: 'user-2', nickname: 'Replier', profile: '' },
          },
        ],
      };
      render(
        <CommentCard comment={deletedCommentWithReplies} postId={POST_ID} />
      );
      expect(screen.getByText('삭제된 댓글입니다.')).toBeInTheDocument();
      expect(
        screen.queryByText('This is a test comment')
      ).not.toBeInTheDocument();
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

      render(<CommentCard comment={commentWithReplies} postId={POST_ID} />);
      expect(screen.getByText('Reply comment')).toBeInTheDocument();
      expect(screen.getByText('Replier')).toBeInTheDocument();
    });

    it('depth 3 미만에서 답글 버튼을 표시해야 한다', () => {
      const onReply = vi.fn();
      render(
        <CommentCard
          comment={mockComment}
          postId={POST_ID}
          onReply={onReply}
          depth={2}
        />
      );
      expect(screen.getByText('답글')).toBeInTheDocument();
    });

    it('depth 3 이상에서는 답글 버튼을 숨겨야 한다', () => {
      const onReply = vi.fn();
      render(
        <CommentCard
          comment={mockComment}
          postId={POST_ID}
          onReply={onReply}
          depth={3}
        />
      );
      expect(screen.queryByText('답글')).not.toBeInTheDocument();
    });
  });

  describe('권한 관리', () => {
    it('본인 댓글일 때 삭제 버튼을 표시해야 한다', () => {
      render(
        <CommentCard
          comment={mockComment}
          postId={POST_ID}
          currentUserId="user-1"
        />
      );
      expect(screen.getByText('삭제')).toBeInTheDocument();
    });

    it('타인 댓글일 때 삭제 버튼을 숨겨야 한다', () => {
      render(
        <CommentCard
          comment={mockComment}
          postId={POST_ID}
          currentUserId="user-other"
        />
      );
      expect(screen.queryByText('삭제')).not.toBeInTheDocument();
    });

    it('admin은 타인 댓글도 삭제 버튼을 표시해야 한다', () => {
      render(
        <CommentCard
          comment={mockComment}
          postId={POST_ID}
          currentUserId="admin-user"
          isAdmin
        />
      );
      expect(screen.getByText('삭제')).toBeInTheDocument();
    });

    it('답글 버튼 클릭 시 onReply가 호출되어야 한다', () => {
      const onReply = vi.fn();
      render(
        <CommentCard comment={mockComment} postId={POST_ID} onReply={onReply} />
      );

      fireEvent.click(screen.getByText('답글'));
      expect(onReply).toHaveBeenCalledWith(mockComment.id);
    });
  });
});
