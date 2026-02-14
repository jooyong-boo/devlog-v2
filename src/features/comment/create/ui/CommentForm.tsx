'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { createComment } from '../api/actions';
import { useSession } from 'next-auth/react';
import { commentFormSchema, type CommentFormData } from '../model/schema';

interface CommentFormProps {
  postId: string;
  parentId?: number;
  onSuccess?: () => void;
}

export function CommentForm({ postId, parentId, onSuccess }: CommentFormProps) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
    },
  });

  if (!session) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        댓글을 작성하려면 로그인이 필요합니다.
      </div>
    );
  }

  const onSubmit = async (data: CommentFormData) => {
    try {
      const result = await createComment(postId, data.content, parentId);

      if (result.success) {
        reset();
        onSuccess?.();
      } else {
        alert(result.error);
      }
    } catch {
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        {...register('content')}
        placeholder="댓글을 입력하세요..."
        rows={4}
        error={errors.content?.message}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          댓글 작성
        </Button>
      </div>
    </form>
  );
}
