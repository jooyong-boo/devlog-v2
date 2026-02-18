import { getPortfolioForEdit } from '@/entities/portfolio/api/queries';
import { PortfolioEditForm } from '@/features/portfolio/edit/ui/PortfolioEditForm';

export default async function AdminPortfolioPage() {
  const portfolio = await getPortfolioForEdit();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Portfolio 관리</h1>
      <PortfolioEditForm
        initialContent={portfolio?.content || ''}
        isPublished={portfolio?.isPublished || false}
      />
    </div>
  );
}
