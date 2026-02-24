import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식을 입력해주세요.'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
