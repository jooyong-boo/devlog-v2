import { getPublishedResume } from '@/entities/resume/api/queries';

export const dynamic = 'force-dynamic';

export default async function ResumePage() {
  const resume = await getPublishedResume();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold animate-slide-in-up">Resume</h1>
          {resume && (
            <p className="text-sm text-gray-500 mt-2">
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
          <p className="text-gray-500 text-center py-12">
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
