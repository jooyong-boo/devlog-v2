import { z } from 'zod';

export const resumeEditSchema = z.object({
  content: z.string().min(1, '내용을 입력하세요'),
  isPublished: z.boolean(),
});

export type ResumeEditFormData = z.infer<typeof resumeEditSchema>;
