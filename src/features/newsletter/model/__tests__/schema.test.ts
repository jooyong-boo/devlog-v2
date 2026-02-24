import { describe, it, expect } from 'vitest';
import { newsletterSchema } from '../schema';

describe('newsletterSchema', () => {
  it('유효한 이메일을 통과시켜야 한다', () => {
    const result = newsletterSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('이메일이 비어있으면 실패해야 한다', () => {
    const result = newsletterSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이메일을 입력해주세요.');
    }
  });

  it('올바르지 않은 이메일 형식이면 실패해야 한다', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        '올바른 이메일 형식을 입력해주세요.'
      );
    }
  });

  it('이메일 필드가 없으면 실패해야 한다', () => {
    const result = newsletterSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
