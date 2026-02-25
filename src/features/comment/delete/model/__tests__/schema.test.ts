import { describe, it, expect } from 'vitest';
import { deleteCommentSchema } from '../schema';

describe('deleteCommentSchema', () => {
  it('양의 정수 commentId를 통과시켜야 한다', () => {
    const result = deleteCommentSchema.safeParse({ commentId: 1 });
    expect(result.success).toBe(true);
  });

  it('0 이하 숫자는 거부해야 한다', () => {
    const result = deleteCommentSchema.safeParse({ commentId: 0 });
    expect(result.success).toBe(false);
  });

  it('정수가 아닌 숫자는 거부해야 한다', () => {
    const result = deleteCommentSchema.safeParse({ commentId: 1.5 });
    expect(result.success).toBe(false);
  });
});
