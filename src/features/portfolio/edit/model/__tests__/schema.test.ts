import { describe, it, expect } from 'vitest';
import { portfolioEditSchema } from '../schema';

describe('portfolioEditSchema', () => {
  it('유효한 데이터를 통과시켜야 한다', () => {
    const result = portfolioEditSchema.safeParse({
      content: '<p>포트폴리오 내용</p>',
      isPublished: false,
    });
    expect(result.success).toBe(true);
  });

  it('isPublished가 true여도 통과해야 한다', () => {
    const result = portfolioEditSchema.safeParse({
      content: '<p>포트폴리오 내용</p>',
      isPublished: true,
    });
    expect(result.success).toBe(true);
  });

  it('내용이 비어있으면 실패해야 한다', () => {
    const result = portfolioEditSchema.safeParse({
      content: '',
      isPublished: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('내용을 입력하세요');
    }
  });

  it('isPublished가 없으면 실패해야 한다', () => {
    const result = portfolioEditSchema.safeParse({ content: '<p>내용</p>' });
    expect(result.success).toBe(false);
  });

  it('content가 없으면 실패해야 한다', () => {
    const result = portfolioEditSchema.safeParse({ isPublished: false });
    expect(result.success).toBe(false);
  });

  it('공백만 있는 내용은 실패해야 한다', () => {
    const result = portfolioEditSchema.safeParse({
      content: '   ',
      isPublished: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('내용을 입력하세요');
    }
  });
});
