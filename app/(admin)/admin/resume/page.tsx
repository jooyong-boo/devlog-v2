import { getResumeForEdit } from '@/entities/resume/api/queries';
import { ResumeEditForm } from '@/features/resume/edit/ui/ResumeEditForm';

export default async function AdminResumePage() {
  const resume = await getResumeForEdit();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Resume 관리</h1>
      <ResumeEditForm
        initialContent={resume?.content || ''}
        isPublished={resume?.isPublished || false}
      />
    </div>
  );
}
