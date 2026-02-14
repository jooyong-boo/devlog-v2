'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TiptapEditor } from '@/features/post/create/ui/TiptapEditor';
import { Button } from '@/shared/ui/button';
import { upsertResume } from '@/entities/resume/api/mutations';

interface ResumeEditFormProps {
  initialContent: string;
  isPublished: boolean;
}

export function ResumeEditForm({
  initialContent,
  isPublished: initialIsPublished,
}: ResumeEditFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await upsertResume(content, isPublished);

      if (result.success) {
        alert('Resume가 저장되었습니다.');
        router.refresh();
      } else {
        alert(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TiptapEditor content={content} onChange={setContent} />

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">발행 (공개 페이지에 표시)</span>
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={loading}>
          저장하기
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
