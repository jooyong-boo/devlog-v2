import { getPublishedResume } from '@/entities/resume/api/queries';

export default async function ResumePage() {
  const resume = await getPublishedResume();

  return (
    <div className="animate-fade-in container mx-auto px-4 py-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8 border-b pb-4">
          <h1 className="animate-slide-in-up text-4xl font-bold">Resume</h1>
          {resume && (
            <p className="mt-2 text-sm text-gray-500">
              Last updated:{' '}
              {new Date(resume.updatedAt).toLocaleDateString('ko-KR')}
            </p>
          )}
        </header>

        {resume ? (
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: resume.content }}
          />
        ) : (
          <p className="py-12 text-center text-gray-500">
            아직 이력서가 등록되지 않았습니다.
          </p>
        )}
      </article>
    </div>
  );
}

export const metadata = {
  title: 'Resume | Jooyong DevLog',
  description: 'My professional resume and career history',
};
