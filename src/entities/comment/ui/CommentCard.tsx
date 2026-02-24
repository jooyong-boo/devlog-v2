'use client';

import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDate } from '@/shared/lib/date';
import { useState, type ReactNode } from 'react';

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
  currentUserId?: string;
  isAdmin?: boolean;
  onReply?: (commentId: number) => void;
  deleteSlot?: (commentId: number) => ReactNode;
  depth?: number;
}

export function CommentCard({
  comment,
  currentUserId,
  isAdmin,
  onReply,
  deleteSlot,
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
          ? 'ml-8 border-l-2 border-gray-200 pl-4 dark:border-gray-700'
          : ''
      }
    >
      <div className="mb-4 flex gap-3">
        {/* 삭제된 댓글: 아바타 자리 유지하되 내용 대체 */}
        {isDeleted ? (
          <div className="flex-1 py-2">
            <p className="text-sm text-gray-400 italic dark:text-gray-600">
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
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {comment.user.nickname}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(new Date(comment.createdAt))}
                </span>
              </div>

              <p className="mb-2 text-sm text-gray-800 dark:text-gray-200">
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

                {canDelete && deleteSlot?.(comment.id)}
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
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              onReply={onReply}
              deleteSlot={deleteSlot}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
