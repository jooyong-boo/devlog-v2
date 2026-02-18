import { format, type Locale } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * Format a date to YYYY.MM.DD format
 */
export function formatDate(
  date: Date,
  formatStr: string = 'yyyy.MM.dd'
): string {
  return format(date, formatStr);
}

/**
 * Format a date as relative time (e.g., "2시간 전")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 방금 전 (1분 이내)
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  // N분 전 (1시간 이내)
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  }

  // N시간 전 (24시간 이내)
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  }

  // 24시간 이상은 날짜 형식
  return formatDate(date);
}

/**
 * Format date with locale support
 */
export function formatDateWithLocale(
  date: Date,
  formatStr: string = 'PPP',
  locale: Locale = ko
): string {
  return format(date, formatStr, { locale });
}
