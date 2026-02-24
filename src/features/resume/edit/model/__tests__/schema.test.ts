import { describe, it, expect } from 'vitest';
import { resumeEditSchema } from '../schema';

describe('resumeEditSchema', () => {
  it('유효한 데이터를 통과시켜야 한다', () => {
    const result = resumeEditSchema.safeParse({
      content: '<p>이력서 내용</p>',
      isPublished: false,
    });
    expect(result.success).toBe(true);
  });

  it('isPublished가 true여도 통과해야 한다', () => {
    const result = resumeEditSchema.safeParse({
      content: '<p>이력서 내용</p>',
      isPublished: true,
    });
    expect(result.success).toBe(true);
  });

  it('내용이 비어있으면 실패해야 한다', () => {
    const result = resumeEditSchema.safeParse({
      content: '',
      isPublished: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('내용을 입력하세요');
    }
  });

  it('isPublished가 없으면 실패해야 한다', () => {
    const result = resumeEditSchema.safeParse({ content: '<p>내용</p>' });
    expect(result.success).toBe(false);
  });

  it('content가 없으면 실패해야 한다', () => {
    const result = resumeEditSchema.safeParse({ isPublished: false });
    expect(result.success).toBe(false);
  });

  it('TipTap 빈 에디터 HTML은 실패해야 한다', () => {
    const result = resumeEditSchema.safeParse({
      content: '<p></p>',
      isPublished: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('내용을 입력하세요');
    }
  });
});
