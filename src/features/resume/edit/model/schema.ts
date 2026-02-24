import { z } from 'zod';

export const resumeEditSchema = z.object({
  content: z.string().refine(
    (val) =>
      val
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#160;/g, ' ')
        .replace(/&[#\w]+;/g, '')
        .trim().length > 0,
    '내용을 입력하세요'
  ),
  isPublished: z.boolean(),
});

export type ResumeEditFormData = z.infer<typeof resumeEditSchema>;
