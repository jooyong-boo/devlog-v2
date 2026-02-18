'use server';

import { prisma } from '@/shared/lib/prisma';

export async function getPublishedResume() {
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
