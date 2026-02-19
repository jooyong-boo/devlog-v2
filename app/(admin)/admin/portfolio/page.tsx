import { Suspense } from 'react';
import { getPortfolioForEdit } from '@/entities/portfolio/api/queries';
import { PortfolioEditForm } from '@/features/portfolio/edit/ui/PortfolioEditForm';

async function PortfolioContent() {
  const portfolio = await getPortfolioForEdit();

  return (
    <PortfolioEditForm
      initialContent={portfolio?.content || ''}
      isPublished={portfolio?.isPublished || false}
    />
  );
}

export default function AdminPortfolioPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Portfolio 관리</h1>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />
        }
      >
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
