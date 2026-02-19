import { unstable_cache } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';

export const getPublishedResume = unstable_cache(
  async () => {
    return prisma.resume.findFirst({
      where: { isPublished: true },
      orderBy: { updatedAt: 'desc' },
    });
  },
  ['published-resume'],
  { revalidate: 300, tags: ['resume'] }
);

export async function getResumeForEdit() {
  return prisma.resume.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
}
