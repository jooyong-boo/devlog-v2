import { getPublishedPortfolio } from '@/entities/portfolio/api/queries';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const portfolio = await getPublishedPortfolio();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold animate-slide-in-up">Portfolio</h1>
          {portfolio && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated:{' '}
              {new Date(portfolio.updatedAt).toLocaleDateString('ko-KR')}
            </p>
          )}
        </header>

        {portfolio ? (
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: portfolio.content }}
          />
        ) : (
          <p className="text-gray-500 text-center py-12">
            아직 포트폴리오가 등록되지 않았습니다.
          </p>
        )}
      </article>
    </div>
  );
}

export const metadata = {
  title: 'Portfolio | Jooyong DevLog',
  description: 'My portfolio and projects showcase',
};
