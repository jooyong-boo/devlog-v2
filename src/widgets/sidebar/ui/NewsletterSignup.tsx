'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterFormData } from '../model/schema';

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (_data: NewsletterFormData) => {
    // API 미구현 — 추후 실제 엔드포인트로 교체
    await new Promise((resolve) => setTimeout(resolve, 0));
    setSubmitted(true);
  };

  return (
    <div className="rounded-lg p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <h3 className="text-lg font-bold mb-1">뉴스레터 구독</h3>
      <p className="text-blue-100 text-sm mb-4">
        새 글이 올라올 때 이메일로 알림을 받아보세요.
      </p>

      {submitted ? (
        <p className="text-sm text-blue-100 font-medium">
          구독해 주셔서 감사합니다!
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="이메일 주소 입력"
              disabled={isSubmitting}
              className="w-full px-3 py-2 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
            />
            {errors.email && (
              <p className="text-xs text-blue-100 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-blue-600 font-semibold text-sm py-2 rounded hover:bg-blue-50 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? '처리 중...' : '구독하기'}
          </button>
        </form>
      )}
    </div>
  );
}
