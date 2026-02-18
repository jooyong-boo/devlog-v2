import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatDate, formatRelativeTime } from '../date';

describe('formatDate()', () => {
  it('날짜를 YYYY.MM.DD 형식으로 포맷해야 한다', () => {
    const date = new Date('2024-01-15T00:00:00.000Z');
    expect(formatDate(date)).toMatch(/2024\.01\.15/);
  });

  it('사용자 지정 형식을 지원해야 한다', () => {
    const date = new Date('2024-01-15T00:00:00.000Z');
    const formatted = formatDate(date, 'yyyy-MM-dd');
    expect(formatted).toMatch(/2024-01-15/);
  });

  it('월과 일이 한 자리 수일 때 0을 패딩해야 한다', () => {
    const date = new Date('2024-03-05T00:00:00.000Z');
    expect(formatDate(date)).toMatch(/2024\.03\.05/);
  });
});

describe('formatRelativeTime()', () => {
  beforeEach(() => {
    // Mock current time to 2024-01-15 12:00:00
    vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
  });

  it('1분 이내는 "방금 전"을 반환해야 한다', () => {
    const now = new Date('2024-01-15T12:00:00.000Z');
    const justNow = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(formatRelativeTime(justNow)).toBe('방금 전');
  });

  it('1시간 이내는 "N분 전"을 반환해야 한다', () => {
    const now = new Date('2024-01-15T12:00:00.000Z');
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // 10 minutes ago
    expect(formatRelativeTime(tenMinutesAgo)).toBe('10분 전');
  });

  it('24시간 이내는 "N시간 전"을 반환해야 한다', () => {
    const now = new Date('2024-01-15T12:00:00.000Z');
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    expect(formatRelativeTime(twoHoursAgo)).toBe('2시간 전');
  });

  it('24시간 이상은 날짜 형식을 반환해야 한다', () => {
    const twoDaysAgo = new Date('2024-01-13T12:00:00.000Z');
    expect(formatRelativeTime(twoDaysAgo)).toMatch(/2024\.01\.13/);
  });

  it('1분 정확히는 "1분 전"을 반환해야 한다', () => {
    const now = new Date('2024-01-15T12:00:00.000Z');
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    expect(formatRelativeTime(oneMinuteAgo)).toBe('1분 전');
  });

  it('1시간 정확히는 "1시간 전"을 반환해야 한다', () => {
    const now = new Date('2024-01-15T12:00:00.000Z');
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    expect(formatRelativeTime(oneHourAgo)).toBe('1시간 전');
  });
});
