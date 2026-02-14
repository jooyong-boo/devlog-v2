'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function upsertPortfolio(content: string, isPublished: boolean) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const existing = await prisma.portfolio.findFirst();

    if (existing) {
      await prisma.portfolio.update({
        where: { id: existing.id },
        data: {
          content,
          isPublished,
          updateUser: session.user.id,
        },
      });
    } else {
      await prisma.portfolio.create({
        data: {
          content,
          isPublished,
          createUser: session.user.id,
          updateUser: session.user.id,
        },
      });
    }

    revalidatePath('/portfolio');
    revalidatePath('/admin/portfolio');

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to save portfolio' };
  }
}
