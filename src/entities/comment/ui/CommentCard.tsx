'use client';

import { Avatar } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { formatDate } from '@/shared/lib/date';
import { useState } from 'react';

interface CommentCardProps {
  comment: {
    id: number;
    content: string;
    createdAt: Date;
    user: {
      id?: string;
      nickname: string;
      profile: string;
    };
    replies?: Array<{
      id: number;
      content: string;
      createdAt: Date;
      user: {
        id?: string;
        nickname: string;
        profile: string;
      };
    }>;
  };
  currentUserId?: string;
  onReply?: (commentId: number) => void;
  onDelete?: (commentId: number) => void;
  depth?: number;
}

export function CommentCard({
  comment,
  currentUserId,
  onReply,
  onDelete,
  depth = 0,
}: CommentCardProps) {
  const [showReplies] = useState(true);
  const canDelete = currentUserId != null && currentUserId === comment.user.id;

  return (
    <div
      className={
        depth > 0
          ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4'
          : ''
      }
    >
      <div className="flex gap-3 mb-4">
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

            {canDelete && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(comment.id)}
              >
                삭제
              </Button>
            )}
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onReply={onReply}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
