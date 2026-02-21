'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
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
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소 입력"
            required
            className="w-full px-3 py-2 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold text-sm py-2 rounded hover:bg-blue-50 transition-colors"
          >
            구독하기
          </button>
        </form>
      )}
    </div>
  );
}
