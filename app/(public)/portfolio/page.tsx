import { getPublishedPortfolio } from '@/entities/portfolio/api/queries';

export default async function PortfolioPage() {
  const portfolio = await getPublishedPortfolio();

  return (
    <div className="animate-fade-in container mx-auto px-4 py-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8 border-b pb-4">
          <h1 className="animate-slide-in-up text-4xl font-bold">Portfolio</h1>
          {portfolio && (
            <p className="mt-2 text-sm text-gray-500">
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
          <p className="py-12 text-center text-gray-500">
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
