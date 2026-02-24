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
      <h1 className="mb-8 text-3xl font-bold">Portfolio 관리</h1>
      <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
        }
      >
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
