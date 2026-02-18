'use server';

import { prisma } from '@/shared/lib/prisma';

export async function getPublishedPortfolio() {
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
