import { describe, it, expect } from 'vitest';
import { postFormSchema } from '../schema';

describe('postFormSchema', () => {
  it('유효한 데이터를 통과시켜야 한다', () => {
    const validData = {
      title: 'Test Post',
      content: '<p>Test content</p>',
      projectId: 1,
      status: 'published' as const,
    };

    const result = postFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('제목이 없으면 실패해야 한다', () => {
    const invalidData = {
      title: '',
      content: 'Test',
      projectId: 1,
      status: 'published' as const,
    };

    const result = postFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('제목이 100자를 초과하면 실패해야 한다', () => {
    const invalidData = {
      title: 'a'.repeat(101),
      content: 'Test',
      projectId: 1,
      status: 'published' as const,
    };

    const result = postFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('내용이 없으면 실패해야 한다', () => {
    const invalidData = {
      title: 'Test',
      content: '',
      projectId: 1,
      status: 'published' as const,
    };

    const result = postFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('프로젝트가 없으면 실패해야 한다', () => {
    const invalidData = {
      title: 'Test',
      content: 'Test content',
      projectId: 0,
      status: 'published' as const,
    };

    const result = postFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('잘못된 status 값을 거부해야 한다', () => {
    const invalidData = {
      title: 'Test',
      content: 'Test',
      projectId: 1,
      status: 'invalid',
    };

    const result = postFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('선택적 필드가 비어있어도 통과해야 한다', () => {
    const validData = {
      title: 'Test Post',
      content: 'Content',
      projectId: 1,
      status: 'draft' as const,
      thumbnail: '',
      tags: '',
    };

    const result = postFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
