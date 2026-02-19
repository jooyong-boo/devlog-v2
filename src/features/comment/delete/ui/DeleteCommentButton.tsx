'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { deleteComment } from '../api/actions';

interface DeleteCommentButtonProps {
  commentId: number;
}

export function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    setIsLoading(true);
    try {
      const result = await deleteComment(commentId);
      if (!result.success) {
        alert(result.error);
      }
    } catch {
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      loading={isLoading}
    >
      삭제
    </Button>
  );
}
