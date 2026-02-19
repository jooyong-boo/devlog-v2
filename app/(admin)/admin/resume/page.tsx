import { Suspense } from 'react';
import { getResumeForEdit } from '@/entities/resume/api/queries';
import { ResumeEditForm } from '@/features/resume/edit/ui/ResumeEditForm';

async function ResumeContent() {
  const resume = await getResumeForEdit();

  return (
    <ResumeEditForm
      initialContent={resume?.content || ''}
      isPublished={resume?.isPublished || false}
    />
  );
}

export default function AdminResumePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Resume 관리</h1>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />
        }
      >
        <ResumeContent />
      </Suspense>
    </div>
  );
}
