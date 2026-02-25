'use client';

import type { ComponentProps } from 'react';
import { CommentCard } from '@/entities/comment/ui/CommentCard';
import { DeleteCommentButton } from '../delete/ui/DeleteCommentButton';

type CommentCardWithDeleteProps = Omit<
  ComponentProps<typeof CommentCard>,
  'deleteSlot'
>;

export function CommentCardWithDelete(props: CommentCardWithDeleteProps) {
  return (
    <CommentCard
      {...props}
      deleteSlot={(commentId) => <DeleteCommentButton commentId={commentId} />}
    />
  );
}
