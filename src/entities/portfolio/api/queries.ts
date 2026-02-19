import { cacheTag, cacheLife } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';

export async function getPublishedPortfolio() {
  'use cache';
  cacheTag('portfolio');
  cacheLife({ revalidate: 300 });

  return prisma.portfolio.findFirst({
    where: { isPublished: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getPortfolioForEdit() {
  return prisma.portfolio.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
}
