'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TiptapEditor } from '@/features/post/create/ui/TiptapEditor';
import { Button } from '@/shared/ui/button';
import { upsertPortfolio } from '@/entities/portfolio/api/mutations';
import {
  portfolioEditSchema,
  type PortfolioEditFormData,
} from '@/features/portfolio/edit/model/schema';

interface PortfolioEditFormProps {
  initialContent: string;
  isPublished: boolean;
}

export function PortfolioEditForm({
  initialContent,
  isPublished: initialIsPublished,
}: PortfolioEditFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PortfolioEditFormData>({
    resolver: zodResolver(portfolioEditSchema),
    defaultValues: {
      content: initialContent,
      isPublished: initialIsPublished,
    },
  });

  const onSubmit = async (data: PortfolioEditFormData) => {
    const result = await upsertPortfolio(data.content, data.isPublished);

    if (result.success) {
      alert('Portfolio가 저장되었습니다.');
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <TiptapEditor
          content={initialContent}
          onChange={(html) =>
            setValue('content', html, { shouldValidate: true })
          }
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            {...register('isPublished')}
            type="checkbox"
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">발행 (공개 페이지에 표시)</span>
        </label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={isSubmitting}>
          저장하기
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
