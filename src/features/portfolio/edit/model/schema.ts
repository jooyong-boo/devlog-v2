import { z } from 'zod';

export const portfolioEditSchema = z.object({
  content: z.string().trim().min(1, { error: '내용을 입력하세요' }),
  isPublished: z.boolean(),
});

export type PortfolioEditFormData = z.infer<typeof portfolioEditSchema>;
