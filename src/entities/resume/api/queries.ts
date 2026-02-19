import { cacheTag, cacheLife } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';

export async function getPublishedResume() {
  'use cache';
  cacheTag('resume');
  cacheLife({ revalidate: 300 });

  return prisma.resume.findFirst({
    where: { isPublished: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getResumeForEdit() {
  return prisma.resume.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
}
