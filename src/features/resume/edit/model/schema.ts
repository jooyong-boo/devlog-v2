import { z } from 'zod';

export const resumeEditSchema = z.object({
  content: z
    .string()
    .refine(
      (val) => val.replace(/<[^>]*>/g, '').trim().length > 0,
      '내용을 입력하세요'
    ),
  isPublished: z.boolean(),
});

export type ResumeEditFormData = z.infer<typeof resumeEditSchema>;
