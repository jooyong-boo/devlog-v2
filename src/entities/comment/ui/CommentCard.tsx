'use client';

import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDate } from '@/shared/lib/date';
import { useState } from 'react';
import { DeleteCommentButton } from '@/features/comment/delete/ui/DeleteCommentButton';

interface CommentCardProps {
  comment: {
    id: number;
    content: string;
    createdAt: Date;
    deletedAt?: Date | null;
    user: {
      id?: string;
      nickname: string;
      profile: string;
    };
    replies?: Array<{
      id: number;
      content: string;
      createdAt: Date;
      deletedAt?: Date | null;
      user: {
        id?: string;
        nickname: string;
        profile: string;
      };
    }>;
  };
  postId: string;
  currentUserId?: string;
  isAdmin?: boolean;
  onReply?: (commentId: number) => void;
  depth?: number;
}

export function CommentCard({
  comment,
  postId,
  currentUserId,
  isAdmin,
  onReply,
  depth = 0,
}: CommentCardProps) {
  const [showReplies] = useState(true);

  const isDeleted = comment.deletedAt != null;
  const hasReplies = comment.replies && comment.replies.length > 0;

  // 삭제된 댓글이고 대댓글도 없으면 렌더링 생략
  if (isDeleted && !hasReplies) return null;

  const canDelete =
    !isDeleted &&
    currentUserId != null &&
    (currentUserId === comment.user.id || isAdmin);

  return (
    <div
      className={
        depth > 0
          ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4'
          : ''
      }
    >
      <div className="flex gap-3 mb-4">
        {/* 삭제된 댓글: 아바타 자리 유지하되 내용 대체 */}
        {isDeleted ? (
          <div className="flex-1 py-2">
            <p className="text-sm text-gray-400 dark:text-gray-600 italic">
              삭제된 댓글입니다.
            </p>
          </div>
        ) : (
          <>
            <Avatar
              src={comment.user.profile}
              alt={comment.user.nickname}
              size="md"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">
                  {comment.user.nickname}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(new Date(comment.createdAt))}
                </span>
              </div>

              <p className="text-gray-800 dark:text-gray-200 mb-2 text-sm">
                {comment.content}
              </p>

              <div className="flex gap-2">
                {onReply && depth < 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReply(comment.id)}
                  >
                    답글
                  </Button>
                )}

                {canDelete && (
                  <DeleteCommentButton commentId={comment.id} postId={postId} />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {hasReplies && showReplies && (
        <div className="mt-2">
          {comment.replies!.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              postId={postId}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
