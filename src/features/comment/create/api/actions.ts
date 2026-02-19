'use server';

import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createComment(
  postId: string,
  content: string,
  parentId?: number
) {
  const session = await auth();

  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: session.user.id,
        content,
        parentId,
        createUser: session.user.id,
        updateUser: session.user.id,
      },
      include: {
        user: {
          select: { id: true, nickname: true, profile: true },
        },
      },
    });

    revalidatePath(`/posts/${postId}`);

    return { success: true, comment };
  } catch {
    return { success: false, error: 'Failed to create comment' };
  }
}
