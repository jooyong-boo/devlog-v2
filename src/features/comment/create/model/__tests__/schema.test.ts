import { describe, it, expect } from 'vitest';
import { commentFormSchema } from '../schema';

describe('commentFormSchema', () => {
  it('유효한 댓글 내용을 통과시켜야 한다', () => {
    const result = commentFormSchema.safeParse({
      content: '좋은 글 감사합니다.',
    });
    expect(result.success).toBe(true);
  });

  it('빈 댓글은 거부해야 한다', () => {
    const result = commentFormSchema.safeParse({ content: '' });
    expect(result.success).toBe(false);
  });

  it('1000자를 초과한 댓글은 거부해야 한다', () => {
    const result = commentFormSchema.safeParse({ content: 'a'.repeat(1001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        '댓글은 1000자 이내로 입력하세요'
      );
    }
  });

  it('1000자 댓글은 허용해야 한다', () => {
    const result = commentFormSchema.safeParse({ content: 'a'.repeat(1000) });
    expect(result.success).toBe(true);
  });
});
