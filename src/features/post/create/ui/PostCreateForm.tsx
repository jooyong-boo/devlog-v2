'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { createPost, updatePost } from '../api/actions';
import { postFormSchema, type PostFormData } from '../model/schema';
import { TiptapEditor } from './TiptapEditor';

interface PostCreateFormProps {
  projects: Array<{ id: number; name: string }>;
  series: Array<{ id: number; title: string }>;
  mode?: 'create' | 'edit';
  initialData?: Partial<PostFormData>;
  postId?: string;
}

export function PostCreateForm({
  projects,
  series,
  mode = 'create',
  initialData,
  postId,
}: PostCreateFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      status: 'published',
      content: '',
      tags: '',
      thumbnail: '',
      ...initialData,
    },
  });

  const content = watch('content');

  const onSubmit = async (data: Record<string, unknown>) => {
    const formValues = data as PostFormData;
    try {
      const formData = new FormData();
      formData.set('title', formValues.title);
      formData.set('content', formValues.content);
      if (formValues.thumbnail) formData.set('thumbnail', formValues.thumbnail);
      formData.set('projectId', formValues.projectId.toString());
      if (formValues.seriesId)
        formData.set('seriesId', formValues.seriesId.toString());
      if (formValues.tags) formData.set('tags', formValues.tags);
      formData.set('status', formValues.status);

      const result =
        mode === 'edit' && postId
          ? await updatePost(postId, formData)
          : await createPost(formData);

      if (result.success) {
        router.push('/admin/posts');
      } else {
        alert(result.error);
      }
    } catch {
      alert(
        mode === 'edit'
          ? '게시글 수정 중 오류가 발생했습니다.'
          : '게시글 작성 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 기본 정보 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">기본 정보</h3>
        <Input
          {...register('title')}
          label="제목"
          placeholder="게시글 제목을 입력하세요"
          error={errors.title?.message}
          required
        />
        <Input
          {...register('thumbnail')}
          label="썸네일 URL"
          placeholder="https://example.com/image.jpg"
          type="url"
          error={errors.thumbnail?.message}
          helperText="게시글 목록에 표시될 썸네일 이미지 URL"
        />
      </div>

      {/* 분류 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">분류</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            {...register('projectId', { valueAsNumber: true })}
            label="프로젝트"
            error={errors.projectId?.message}
            required
          >
            <option value="">프로젝트 선택</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </Select>

          <Select
            {...register('seriesId', {
              setValueAs: (v: string) => (v === '' ? undefined : Number(v)),
            })}
            label="시리즈 (선택)"
          >
            <option value="">시리즈 선택 (선택사항)</option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* 내용 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">내용</h3>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            본문 <span className="text-red-500">*</span>
          </label>
          <TiptapEditor
            content={content}
            onChange={(html) =>
              setValue('content', html, { shouldValidate: true })
            }
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      {/* 메타 정보 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">메타 정보</h3>
        <Input
          {...register('tags')}
          label="태그"
          placeholder="React, TypeScript, Next.js"
          helperText="쉼표로 구분하여 입력하세요"
          error={errors.tags?.message}
        />
        <Select {...register('status')} label="상태">
          <option value="draft">초안</option>
          <option value="published">발행</option>
        </Select>
      </div>

      {/* 제출 */}
      <div className="flex gap-4 pt-6 border-t">
        <Button type="submit" loading={isSubmitting}>
          {mode === 'edit' ? '수정하기' : '작성하기'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
