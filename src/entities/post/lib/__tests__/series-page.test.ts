import { describe, it, expect } from 'vitest';
import {
  buildSeriesMetadata,
  normalizeSeriesWithPosts,
  parseSeriesId,
} from '@/entities/post/lib/series-page';

describe('series-page helpers', () => {
  describe('parseSeriesId', () => {
    it('숫자 문자열을 정수로 변환해야 한다', () => {
      expect(parseSeriesId('12')).toBe(12);
    });

    it('숫자가 아닌 값은 null을 반환해야 한다', () => {
      expect(parseSeriesId('abc')).toBeNull();
    });

    it('숫자 접두어가 있는 문자열은 null을 반환해야 한다', () => {
      expect(parseSeriesId('12abc')).toBeNull();
    });

    it('소수 문자열은 null을 반환해야 한다', () => {
      expect(parseSeriesId('12.3')).toBeNull();
    });
  });

  describe('normalizeSeriesWithPosts', () => {
    it('닉네임/프로필 fallback과 tags 변환을 수행해야 한다', () => {
      const normalized = normalizeSeriesWithPosts({
        id: 1,
        title: '시리즈',
        description: null,
        posts: [
          {
            id: 'post-1',
            title: '제목',
            content: '<p>content</p>',
            thumbnail: '',
            readingTime: 3,
            viewCount: 10,
            createdAt: new Date(),
            user: {
              id: 'user-1',
              name: 'Name',
              nickname: null,
              profile: null,
              image: null,
            },
            project: { id: 1, name: '개발' },
            postTags: [{ tag: { id: 1, name: 'tag-1' } }],
          },
        ],
      });

      expect(normalized.posts[0].user.nickname).toBe('Name');
      expect(normalized.posts[0].user.profile).toBe('');
      expect(normalized.posts[0].tags).toEqual([{ id: 1, name: 'tag-1' }]);
    });
  });

  describe('buildSeriesMetadata', () => {
    it('series가 없으면 빈 객체를 반환해야 한다', () => {
      expect(buildSeriesMetadata(null)).toEqual({});
    });

    it('설명 fallback을 적용한 메타데이터를 반환해야 한다', () => {
      expect(
        buildSeriesMetadata({ title: 'React', description: null })
      ).toEqual({
        title: 'React | Jooyong DevLog',
        description: 'React 시리즈',
      });
    });
  });
});
