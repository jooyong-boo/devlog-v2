import { unstable_cache } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';

export const getPublishedPortfolio = unstable_cache(
  async () => {
    return prisma.portfolio.findFirst({
      where: { isPublished: true },
      orderBy: { updatedAt: 'desc' },
    });
  },
  ['published-portfolio'],
  { revalidate: 300, tags: ['portfolio'] }
);

export async function getPortfolioForEdit() {
  return prisma.portfolio.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
}
