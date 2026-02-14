import { z } from 'zod';

export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, '댓글 내용을 입력하세요')
    .max(1000, '댓글은 1000자 이내로 입력하세요'),
});

export type CommentFormData = z.infer<typeof commentFormSchema>;
