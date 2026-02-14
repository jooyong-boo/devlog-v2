import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn() 유틸리티', () => {
  it('단일 클래스 이름을 반환해야 한다', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('여러 클래스 이름을 병합해야 한다', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('조건부 클래스를 처리해야 한다', () => {
    const condition = false;
    expect(cn('foo', condition && 'bar', 'baz')).toBe('foo baz');
  });

  it('중복 Tailwind 클래스를 병합해야 한다', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('undefined와 null을 무시해야 한다', () => {
    expect(cn('foo', undefined, 'bar', null)).toBe('foo bar');
  });

  it('객체 형태의 조건부 클래스를 처리해야 한다', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo');
  });

  it('배열 형태의 클래스를 처리해야 한다', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });
});
