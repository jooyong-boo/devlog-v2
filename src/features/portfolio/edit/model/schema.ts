import { z } from 'zod';

export const portfolioEditSchema = z.object({
  content: z.string().min(1, '내용을 입력하세요'),
  isPublished: z.boolean(),
});

export type PortfolioEditFormData = z.infer<typeof portfolioEditSchema>;
