'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function upsertResume(content: string, isPublished: boolean) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const existingResume = await prisma.resume.findFirst();

    if (existingResume) {
      await prisma.resume.update({
        where: { id: existingResume.id },
        data: {
          content,
          isPublished,
          updateUser: session.user.id,
        },
      });
    } else {
      await prisma.resume.create({
        data: {
          content,
          isPublished,
          createUser: session.user.id,
          updateUser: session.user.id,
        },
      });
    }

    revalidatePath('/resume');
    revalidatePath('/admin/resume');
    revalidateTag('resume', 'max');

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to save resume' };
  }
}
