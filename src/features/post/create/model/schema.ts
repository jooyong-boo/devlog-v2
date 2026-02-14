import { z } from 'zod';

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력하세요')
    .max(100, '제목은 100자 이내로 입력하세요'),
  content: z.string().min(1, '내용을 입력하세요'),
  thumbnail: z
    .string()
    .url('올바른 URL을 입력하세요')
    .or(z.literal(''))
    .optional(),
  projectId: z.coerce
    .number({ message: '프로젝트를 선택하세요' })
    .positive('프로젝트를 선택하세요'),
  seriesId: z.coerce.number().optional(),
  tags: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export const createPostServerSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  thumbnail: z.string().optional().default(''),
  projectId: z.coerce.number(),
  seriesId: z.coerce.number().optional(),
  tags: z.string().optional().default(''),
  status: z.enum(['draft', 'published']),
});
